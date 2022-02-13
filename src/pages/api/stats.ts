import prisma from "@/src/helpers/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

const New = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return;
  }

  try {
    const watched = await prisma.movies.count({
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
    });
    const watchlist = await prisma.movies.count({
      where: {
        watchlist: true,
      },
    });

    res.json({ stats: { watched, watchlist } });
  } catch (e) {
    res.status(500).json(e);
  }
};

export default New;
