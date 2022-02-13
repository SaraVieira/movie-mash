import { cleanMovies } from "@/src/helpers/movies";
import prisma from "@/src/helpers/prisma";

import axios from "axios";
import camelcaseKeys from "camelcase-keys";

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return;
  }
  const { id }: { id?: string } = req.query;
  const { watchlist } = req.body;

  try {
    const data = await prisma.movies.findUnique({ where: { id } });

    if (!data) {
      await prisma.movies.create({
        data: {
          id,
          watchlist,
        },
      });
    } else {
      await prisma.movies.update({
        where: {
          id,
        },
        data: {
          watchlist,
        },
      });
    }
    res.json({ id, watchlist });
  } catch (e) {
    res.status(500).json(e);
  }
};
