import { encode, getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { ERROR_MESSAGES } from "../constants/erorrs";
import prisma from "@/src/helpers/prisma";

const signInRedirect = {
  redirect: {
    destination: "/signin",
    permanent: false,
  },
};

function validateSession({ session, redirectCondition }) {
  if (redirectCondition) {
    return signInRedirect;
  }

  return { props: { session } };
}

/**
 * Usually necessary for sign in pages.
 */
export const redirectIfAuthenticated = async (context) => {
  const session = await getSession(context);
  return validateSession({ session, redirectCondition: session });
};

/**
 * No need to fetch anything else server side, validate if the user is authenticated or redirect to
 * the homepage.
 * @returns session or the redirect object for getServerSideProps or getStaticProps
 */
export const validateUserSession = async (context) => {
  const session = await getSession(context);
  return validateSession({
    session,
    redirectCondition: !session,
  });
};

/**
 * When we need to fetch more information inside getServerSideProps or getStaticProps but also
 * verifying the session, this helper will do just that.
 *
 * @param {*} context
 * @param {*} fetcherFn all the fetch logic specific to each page
 * @returns redirect object or the return object of the fetcherFn function
 */
export async function validateSessionAndFetch(context, fetcherFn) {
  const session = await getSession(context);
  if (!session) {
    return signInRedirect;
  }
  return fetcherFn(session);
}

export async function isAuthenticatedAPIRoute(req, res) {
  const token = await getToken({ req });
  if (isAuthenticated(token?.email)) {
    const user = await prisma.user.findFirst({
      where: { email: token.email },
    });

    return user;
  } else {
    res.status(401).json({
      error: ERROR_MESSAGES.LOGIN_REQUIRED,
    });
    return;
  }
}

export function isAuthenticated(session) {
  return Boolean(session);
}

export const adminOnlyAPIRoute = async (req, res) => {
  const user = await isAuthenticatedAPIRoute(req, res);

  if (user.role !== "ADMIN") {
    res.status(401).json({
      error: ERROR_MESSAGES.ADMIN_REQUIRED,
    });

    return;
  }

  return user;
};

export function isAdmin(session) {
  return session?.user?.admin || null;
}

export async function createAuthHeaders(context) {
  const token = await getToken({ req: context.req });
  const encodedToken = await encode({
    token: token,
    secret: process.env.NEXTAUTH_SECRET,
  });
  return {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${encodedToken}`,
    },
  };
}
