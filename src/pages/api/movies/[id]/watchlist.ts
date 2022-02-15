import { NewSession } from "@/src/constants/types";
import { getGenresToCreate } from "@/src/helpers/movies";
import prisma from "@/src/helpers/prisma";
import { isAuthenticatedAPIRoute } from "@/src/helpers/session";
import { omit } from "lodash-es";

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const Watchlist = async (req: NextApiRequest, res: NextApiResponse) => {
  isAuthenticatedAPIRoute(req, res);
  const session: NewSession = await getSession({
    req,
  });
  if (req.method !== "POST") {
    return;
  }
  const { id }: { id?: string } = req.query;
  const movie = req.body;

  try {
    const data = await prisma.movies.findFirst({
      where: { tmdbId: id.toString(), userId: session.user.id },
    });

    if (!data) {
      const genresToCreate = await getGenresToCreate(movie, prisma);

      await prisma.movies.create({
        // @ts-ignore
        data: {
          ...omit(movie, "id"),
          userId: session.user.id,
          tmdbId: id.toString(),
          backdrops: {
            create: movie.backdrops,
          },
          posters: {
            create: movie.posters,
          },
          genres: {
            createMany: {
              data: genresToCreate,
            },
          },
        },
      });
    } else {
      await prisma.movies.update({
        where: {
          id: data.id.toString(),
        },
        data: {
          watchlist: movie.watchlist,
        },
      });
    }
    res.json({ id, movie });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json(e);
  }
};

export default Watchlist;
