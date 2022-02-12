import { hashPassword } from "@/src/helpers/password";
import prisma from "@/src/helpers/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { email, password } = data;

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    return;
  }

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  res.status(201).json({ message: "Created user!", ok: true });
};
