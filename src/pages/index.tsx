import axios from "axios";
import { GetServerSideProps } from "next";
import classNames from "classnames";

import Layout from "../components/layout";
import { validateSessionAndFetch } from "../helpers/session";
import { absoluteUrl } from "../helpers/absolute-url";
import { Movie } from "../components/Movie";
import { DEFAULT_TAB, TABS, useMovies } from "../hooks/useMovies";
import { useState } from "react";

export default function IndexPage({ movies: initialMovies }) {
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB);
  const movies = useMovies({
    initialMovies,
    activeTab,
  });
  return (
    <Layout searchHeader>
      <ul className="h-[56px] rounded-[26px] border-2 border-brand-border mb-6 flex items-center p-2">
        {TABS.map((tab) => (
          <li
            key={tab.key}
            className={classNames(
              "flex-grow h-full flex items-center  rounded-[20px] px-4 text-white text-opacity-50 ",
              activeTab === tab.key &&
                "bg-brand-red text-white text-opacity-100 "
            )}
          >
            <button
              onClick={() => setActiveTab(tab.key)}
              className="font-semibold text-center w-full"
            >
              {tab.name}
            </button>
          </li>
        ))}
      </ul>
      <ul
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
        className="grid gap-x-4 gap-y-8"
      >
        {(movies?.results || []).map((m) => (
          <Movie key={m.id} {...m} />
        ))}
      </ul>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return validateSessionAndFetch(context, async (session) => {
    const { origin } = absoluteUrl(context.req);
    const { data: movies } = await axios(origin + "/api/movies/popular");
    return {
      props: { session, movies },
    };
  });
};
