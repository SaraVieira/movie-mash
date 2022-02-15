import prisma from "@/src/helpers/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

const Liked = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return;
  }
  const { id }: { id?: string } = req.query;
  const { liked } = req.body;

  try {
    const data = await prisma.movies.findUnique({ where: { id } });

    if (!data) {
      await prisma.movies.create({
        data: {
          id,
          liked,
          watchlist: false,
        },
      });
    } else {
      await prisma.movies.update({
        where: {
          id,
        },
        data: {
          liked,
          watchlist: false,
        },
      });
    }
    res.json({ id, liked });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json(e);
  }
};

export default Liked;
