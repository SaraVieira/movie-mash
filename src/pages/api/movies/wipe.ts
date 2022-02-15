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
  if (req.method !== "POST") {
    return;
  }

  try {
    await prisma.movies.deleteMany({
      where: {
        userId: session.user.id,
      },
    });

    res.json({ ok: true });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json(e);
  }
};

export default New;
