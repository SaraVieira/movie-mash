import { cleanMovie } from "@/src/helpers/movies";
import prisma from "@/src/helpers/prisma";

import axios from "axios";
import camelcaseKeys from "camelcase-keys";

import type { NextApiRequest, NextApiResponse } from "next";

const New = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return;
  }
  const { TMDB_KEY } = process.env;

  try {
    const ourMovies = await prisma.movies.findMany({
      where: {
        OR: [
          {
            liked: {
              not: null,
            },
          },
          {
            disliked: {
              not: null,
            },
          },
        ],
        NOT: {
          liked: false,
          disliked: false,
        },
      },
    });

    var results = await Promise.all(
      ourMovies.map(async (savedMovie) => {
        const { data: movie } = await axios(
          `https://api.themoviedb.org/3/movie/${savedMovie.id}?api_key=${TMDB_KEY}&language=en-US`
        );
        return {
          ...cleanMovie(movie),
          ...savedMovie,
        };
      })
    );

    res.json(camelcaseKeys({ results }, { deep: true }));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json(e);
  }
};

export default New;
