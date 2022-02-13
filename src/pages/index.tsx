import axios from "axios";
import { GetServerSideProps } from "next";
import classNames from "classnames";

import Layout from "../components/layout";
import { validateSessionAndFetch } from "../helpers/session";
import { absoluteUrl } from "../helpers/absolute-url";
import { Movie } from "../components/Movie";
import { DEFAULT_TAB, TABS, useMovies } from "../hooks/useMovies";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function IndexPage({ movies: initialMovies }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(router.query.tab || DEFAULT_TAB);
  const [page, setPage] = useState(1);

  const movies = useMovies({
    initialMovies,
    activeTab,
    page,
  });
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [page]);

  const changeTab = (tab) => {
    setActiveTab(tab);
    router.push({
      pathname: "/",
      query: { tab },
    });
  };
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
              onClick={() => changeTab(tab.key)}
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
        className="grid gap-x-4 gap-y-8 mb-12"
      >
        {(movies?.results || []).map((m) => (
          <Movie key={m.id} {...m} />
        ))}
      </ul>
      {movies?.results && (
        <nav
          className="mb-12 py-3 flex items-center justify-between"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm text-white">
              Showing{" "}
              <span className="font-medium">{(movies.page - 1) * 20}</span> to{" "}
              <span className="font-medium">{(movies.page - 1) * 20 + 20}</span>{" "}
              of <span className="font-medium">{movies.totalResults}</span>{" "}
              results
            </p>
          </div>
          <div className="flex-1 flex justify-between sm:justify-end">
            <button
              onClick={() => setPage(page - 1)}
              className="relative inline-flex items-center px-4 py-2  text-sm font-medium rounded-md text-white bg-brand-inputBg disabled:opacity-50"
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              onClick={() => setPage(page + 1)}
              className="ml-3 relative inline-flex items-center px-4 py-2  text-sm font-medium rounded-md text-white bg-brand-inputBg"
            >
              Next
            </button>
          </div>
        </nav>
      )}
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
