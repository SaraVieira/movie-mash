import axios from "axios";
import { GetServerSideProps } from "next";

import Layout from "../components/layout";
import { createAuthHeaders, validateSessionAndFetch } from "../helpers/session";
import { absoluteUrl } from "../helpers/absolute-url";
import { signOut } from "next-auth/react";
import Alert from "../components/Alert";
import { useState } from "react";
import { Button } from "../components/Button";
import { NewSession, Settings, Stats } from "../constants/types";
import { useSettings, useToggleSettings } from "../hooks/useSettings";

export default function IndexPage({
  stats,
  session,
  settings: initialSettings = { allowRegistration: false },
}: {
  settings: Settings;
  stats: Stats;
  session: NewSession;
}) {
  const { settings } = useSettings(initialSettings, session);
  const mutation = useToggleSettings(settings);
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

      {session.user.admin && (
        <div className="flex justify-center">
          <label
            htmlFor="toggle-example-checked"
            className="flex relative items-center mb-4 cursor-pointer"
          >
            <input
              type="checkbox"
              id="toggle-example-checked"
              className="sr-only"
              checked={settings.allowRegistration}
              onChange={() => mutation.mutateAsync(!settings.allowRegistration)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full border border-gray-200 toggle-bg dark:bg-gray-700 dark:border-gray-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-white">
              Allow Registrations
            </span>
          </label>
        </div>
      )}
      <Button
        className="mb-14"
        variant="secondary"
        onClick={() => setShowAlert(true)}
      >
        Wipe Data
      </Button>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return validateSessionAndFetch(context, async (session) => {
    const { origin } = absoluteUrl(context.req);
    const authOptions = await createAuthHeaders(context);
    const { data: stats }: { data: Stats } = await axios(
      origin + "/api/stats",
      authOptions
    );

    if (session?.user.admin) {
      const { data: settings } = await axios(
        origin + "/api/settings",
        authOptions
      );
      return {
        props: {
          settings,
          session,
          ...stats,
        },
      };
    }
    return {
      props: {
        settings: {},
        session,
        ...stats,
      },
    };
  });
};
