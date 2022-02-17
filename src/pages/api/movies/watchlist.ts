import prisma from "@/src/helpers/prisma";
import { isAuthenticatedAPIRoute } from "@/src/helpers/session";

import camelcaseKeys from "camelcase-keys";
import { omit } from "lodash-es";

import type { NextApiRequest, NextApiResponse } from "next";

const New = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await isAuthenticatedAPIRoute(req, res);
  if (req.method === "POST") {
    return;
  }

  try {
    const watchlistMovies = await prisma.movies.findMany({
      where: {
        watchlist: true,
        userId: user.id,
      },
      include: {
        posters: true,
      },
    });

    res.json(
      camelcaseKeys(
        {
          results: watchlistMovies.map((movie) => ({
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
