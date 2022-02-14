import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Layout from "../components/layout";
import { Input, Label } from "../components/Form";
import Logo from "../components/Logo";
import { useSignIn } from "../stores/useSignin";
import { GetServerSideProps } from "next";
import { Button } from "../components/Button";
import { XCircleIcon } from "@heroicons/react/outline";

function SignIn() {
  const { isFilledIn, setPassword, setEmail, error, signIn, signingIn } =
    useSignIn();
  const router = useRouter();

  return (
    <Layout>
      <Logo className="h-5 m-auto mb-12" />
      <form
        onSubmit={(e) => signIn(e, router)}
        className="max-w-[500px] m-auto p-15"
      >
        <h2 className="text-center pb-8 font-bold text-3xl">Sign In</h2>
        <div className="mb-6">
          <Label htmlFor="email">Your Email</Label>
          <Input
            type="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-12">
          <Label htmlFor="password">Your Password</Label>
          <Input
            type="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div className="rounded-md bg-red-50 p-4 my-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}
        </div>

        <Button disabled={!isFilledIn()} type="submit" loading={signingIn}>
          Login
        </Button>
      </form>
    </Layout>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default SignIn;
