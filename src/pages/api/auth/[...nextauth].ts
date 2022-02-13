import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/src/helpers/password";
import prisma from "@/src/helpers/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        if (!credentials?.password || !credentials?.email) {
          throw new Error("No user found!");
        }
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Could not log you in!");
        }
        return { email: user.email };
      },
      name: "Email & Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  pages: {
    signIn: "/auth",
    newUser: "/auth",
  },
  session: { strategy: "jwt" },
});
