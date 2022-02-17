import prisma from "@/src/helpers/prisma";
import { isAuthenticatedAPIRoute } from "@/src/helpers/session";

import camelcaseKeys from "camelcase-keys";
import { omit } from "lodash-es";

import type { NextApiRequest, NextApiResponse } from "next";

const New = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await isAuthenticatedAPIRoute(req, res);
  const { genre, sort, search } = req.query as {
    genre: string;
    sort: string;
    search: string;
  };
  if (req.method === "POST") {
    return;
  }
  const [sortKey, sortValue] = sort.split("-");

  try {
    const ourMovies = await prisma.movies.findMany({
      orderBy: [
        {
          [sortKey]: sortValue,
        },
      ],
      where: {
        ...(genre
          ? {
              genres: {
                hasSome: parseInt(genre),
              },
            }
          : {}),
        ...(search
          ? {
              title: {
                mode: "insensitive",
                contains: search,
              },
            }
          : {}),
        userId: user.id,
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
