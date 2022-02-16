import prisma from "@/src/helpers/prisma";
import { isAuthenticatedAPIRoute } from "@/src/helpers/session";

import type { NextApiRequest, NextApiResponse } from "next";

const New = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await isAuthenticatedAPIRoute(req, res);

  if (req.method !== "POST") {
    return;
  }

  try {
    await prisma.movies.deleteMany({
      where: {
        userId: user.id,
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
