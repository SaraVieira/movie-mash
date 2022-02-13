import axios from "axios";
import { GetServerSideProps } from "next";

import Layout from "../components/layout";
import { validateSessionAndFetch } from "../helpers/session";
import { absoluteUrl } from "../helpers/absolute-url";
import { signOut } from "next-auth/react";
import Alert from "../components/Alert";
import { useState } from "react";

export default function IndexPage({ stats, session }) {
  const { watched, watchlist } = stats;
  const [showAlert, setShowAlert] = useState(false);

  const wipeData = async () => {
    await axios.post("/api/movies/wipe");
    setShowAlert(false);
    window.location.reload();
  };

  return (
    <Layout searchHeader>
      <Alert
        primaryButtonText="Wipe"
        open={showAlert}
        title="Wipe all data"
        description="Are you sure you want to delete all the data? This action can not be reversed"
        onSubmit={wipeData}
        onClose={() => setShowAlert(false)}
      />
      <h2 className="text-center pb-8 font-bold text-3xl">Hello</h2>
      <div className="flex items-center justify-center mb-4">
        <svg
          className="w-24 text-brand-inputBg  rounded-full h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          fill="none"
          x="0px"
          y="0px"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M82.04 88.387C93.017 79.216 100 65.423 100 50c0-27.614-22.386-50-50-50S0 22.386 0 50c0 15.604 7.148 29.538 18.348 38.708C22.922 75.49 35.478 66 50.25 66c14.653 0 27.125 9.338 31.79 22.387zm-7.778 5.342C71.573 82.97 61.843 75 50.25 75c-11.68 0-21.47 8.09-24.072 18.971C33.26 97.816 41.375 100 50 100c8.804 0 17.077-2.276 24.263-6.27zM68.75 40.625c0 10.355-8.395 18.75-18.75 18.75s-18.75-8.395-18.75-18.75 8.395-18.75 18.75-18.75 18.75 8.395 18.75 18.75zm-8.75 0c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z"
            fill="currentColor"
          />
        </svg>
      </div>
      <span className="text-sm text-white text-opacity-50 text-center block mb-8">
        {session.user.email}
      </span>
      <div className="grid grid-cols-2 mb-24">
        <div className="text-center border-r-[1px] border-brand-inputBg">
          <span className="text-3xl font-bold block">{watched}</span>
          <span className="text-sm text-white text-opacity-50 uppercase">
            movies watched
          </span>
        </div>
        <div className="text-center">
          <span className="text-3xl font-bold block">{watchlist}</span>
          <span className="text-sm text-white text-opacity-50 uppercase">
            movies in watchlist
          </span>
        </div>
      </div>

      <button
        onClick={() => setShowAlert(true)}
        className="w-full mb-14 text-brand-red rounded-md h-[48px] disabled:opacity-50"
      >
        Wipe Data
      </button>
      <button
        onClick={() => signOut()}
        className="w-full bg-brand-red rounded-md h-[48px] disabled:opacity-50"
      >
        Sign Out
      </button>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return validateSessionAndFetch(context, async (session) => {
    const { origin } = absoluteUrl(context.req);
    const { data: stats } = await axios(origin + "/api/stats");
    return {
      props: { session, ...stats },
    };
  });
};