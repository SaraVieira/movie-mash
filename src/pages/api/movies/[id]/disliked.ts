import { NewSession } from "@/src/constants/types";
import { getGenresToCreate } from "@/src/helpers/movies";
import prisma from "@/src/helpers/prisma";
import { isAuthenticatedAPIRoute } from "@/src/helpers/session";

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const Disliked = async (req: NextApiRequest, res: NextApiResponse) => {
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
    const data = await prisma.movies.findUnique({
      where: { id },
    });

    if (!data) {
      const genresToCreate = await getGenresToCreate(movie, prisma);

      await prisma.movies.create({
        data: {
          ...movie,
          userId: session.user.id,
          id: id.toString(),
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
          id,
        },
        data: {
          disliked: movie.disliked,
          watchlist: false,
        },
      });
    }
    res.json({ id });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json(e);
  }
};

export default Disliked;
