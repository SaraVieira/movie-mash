import { cleanMovies } from "@/src/helpers/movies";
import prisma from "@/src/helpers/prisma";
import { isAuthenticatedAPIRoute } from "@/src/helpers/session";

import axios from "axios";
import camelcaseKeys from "camelcase-keys";

import type { NextApiRequest, NextApiResponse } from "next";

const New = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await isAuthenticatedAPIRoute(req, res);
  if (req.method === "POST") {
    return;
  }
  const { page = 1 } = req.query;
  const { TMDB_KEY } = process.env;

  try {
    const { data: newMovies } = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_KEY}&language=en-US&page=${page}`
    );

    const ourMovies = await prisma.movies.findMany({
      where: {
        userId: user.id,
        tmdbId: {
          in: newMovies.results.map((movie) => movie.id.toString()),
        },
      },
    });

    const newData = await cleanMovies(newMovies);
    res.json(
      camelcaseKeys(
        {
          ...newData,
          results: newData.results.map((m) => ({
            ...m,
            ...(ourMovies.find(
              (mov) => parseInt(mov.tmdbId) === parseInt(m.id)
            ) || {}),
          })),
        },
        { deep: true }
      )
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json(e);
  }
};

export default New;
