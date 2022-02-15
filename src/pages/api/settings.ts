import prisma from "@/src/helpers/prisma";
import { adminOnlyAPIRoute } from "@/src/helpers/session";

import type { NextApiRequest, NextApiResponse } from "next";

const New = async (req: NextApiRequest, res: NextApiResponse) => {
  adminOnlyAPIRoute(req, res);
  const existingSetting = await prisma.settings.findFirst();
  if (req.method !== "POST") {
    res.json(existingSetting || {});
    return;
  }

  try {
    const settings = req.body;

    if (existingSetting) {
      await prisma.settings.update({
        where: {
          id: existingSetting.id,
        },
        data: settings,
      });
    } else {
      await prisma.settings.create({
        data: settings,
      });
    }

    res.json({ ok: true });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json(e);
  }
};

export default New;
