import { NewSession } from "@/src/constants/types";
import prisma from "@/src/helpers/prisma";
import { isAuthenticatedAPIRoute } from "@/src/helpers/session";

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const New = async (req: NextApiRequest, res: NextApiResponse) => {
  isAuthenticatedAPIRoute(req, res);
  const session: NewSession = await getSession({
    req,
  });
  if (req.method === "POST") {
    return;
  }

  try {
    const watched = await prisma.movies.count({
      where: {
        userId: session.user.id,
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
        userId: session.user.id,
        watchlist: true,
      },
    });

    res.json({ stats: { watched, watchlist } });
  } catch (e) {
    res.status(500).json(e);
  }
};

export default New;
