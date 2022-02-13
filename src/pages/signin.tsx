import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Layout from "../components/layout";
import { Input, Label } from "../components/Form";
import Logo from "../components/Logo";
import { useSignIn } from "../stores/useSignin";
import { GetServerSideProps } from "next";

function SignIn() {
  const { isFilledIn, setPassword, setEmail, signIn } = useSignIn();
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
        </div>
        <button
          disabled={!isFilledIn()}
          type="submit"
          className="w-full bg-brand-red rounded-md h-[48px] disabled:opacity-50"
        >
          Login
        </button>
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
