import { prepareDataForMovieSave } from "@/src/helpers/movies";
import prisma from "@/src/helpers/prisma";
import { isAuthenticatedAPIRoute } from "@/src/helpers/session";

import type { NextApiRequest, NextApiResponse } from "next";

const Disliked = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await isAuthenticatedAPIRoute(req, res);
  if (req.method !== "POST") {
    return;
  }
  const { id }: { id?: string } = req.query;
  const movie = req.body;

  try {
    const data = await prisma.movies.findFirst({
      where: { tmdbId: id.toString(), userId: user.id },
    });

    const createData = await prepareDataForMovieSave({
      movie,
      user,
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
