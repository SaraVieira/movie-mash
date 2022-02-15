import prisma from "@/src/helpers/prisma";

import camelcaseKeys from "camelcase-keys";
import { omit } from "lodash-es";

import type { NextApiRequest, NextApiResponse } from "next";

const New = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return;
  }

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
      include: {
        posters: true,
        genres: true,
      },
    });

    res.json(
      camelcaseKeys(
        {
          results: ourMovies.map((movie) => ({
            ...movie,
            posters: omit(movie.posters[0], "id"),
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
