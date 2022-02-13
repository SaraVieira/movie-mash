import prisma from "@/src/helpers/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return;
  }
  const { id }: { id?: string } = req.query;
  const { disliked } = req.body;

  try {
    const data = await prisma.movies.findUnique({ where: { id } });

    if (!data) {
      await prisma.movies.create({
        data: {
          id,
          disliked,
        },
      });
    } else {
      await prisma.movies.update({
        where: {
          id,
        },
        data: {
          disliked,
        },
      });
    }
    res.json({ id, disliked });
  } catch (e) {
    res.status(500).json(e);
  }
};
