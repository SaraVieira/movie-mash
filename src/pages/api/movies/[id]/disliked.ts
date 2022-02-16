import { NewSession } from "@/src/constants/types";
import { prepareDataForMovieSave } from "@/src/helpers/movies";
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
    const data = await prisma.movies.findFirst({
      where: { tmdbId: id.toString(), userId: session.user.id },
    });

    const createData = await prepareDataForMovieSave({
      movie,
      session,
      id,
      prisma,
    });
    if (!data) {
      // @ts-ignore

      await prisma.movies.create(createData);
    } else {
      await prisma.movies.update({
        where: {
          id: data.id.toString(),
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
