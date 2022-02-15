import { hashPassword } from "@/src/helpers/password";
import prisma from "@/src/helpers/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

const SignUp = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { email, password } = data;
  const users = await prisma.user.count();
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
      role: users ? "VIEWER" : "ADMIN",
    },
  });

  res.status(201).json({ message: "Created user!", ok: true });
};

export default SignUp;
