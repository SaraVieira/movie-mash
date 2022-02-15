import { NewSession } from "@/src/constants/types";
import { cleanMovies } from "@/src/helpers/movies";
import prisma from "@/src/helpers/prisma";
import { isAuthenticatedAPIRoute } from "@/src/helpers/session";

import axios from "axios";
import camelcaseKeys from "camelcase-keys";

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const New = async (req: NextApiRequest, res: NextApiResponse) => {
  isAuthenticatedAPIRoute(req, res);
  const session: NewSession = await getSession({
    req,
  });
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
        userId: session.user.id,
        id: {
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
            ...(ourMovies.find((mov) => parseInt(mov.id) === parseInt(m.id)) ||
              {}),
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
