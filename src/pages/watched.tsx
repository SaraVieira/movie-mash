import { ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/outline";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import Layout from "../components/layout";
import { validateSessionAndFetch } from "../helpers/session";
import { absoluteUrl } from "../helpers/absolute-url";

import { useWatchedMovies } from "../hooks/useWatchedMovies";
import classNames from "classnames";
import Tippy from "@tippyjs/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { PlayIcon } from "@heroicons/react/solid";

import { MovieList } from "../components/MovieList";
import { MoviesResponse, Status } from "../constants/types";

const buttonClasses =
  "p-4 bg-brand-inputBg hover:bg-brand-blue text-opacity-80 text-white disabled:hover:text-white disabled:hover:text-opacity-80 disabled:hover:bg-brand-inputBg disabled:opacity-70 text-brand-green";

export default function IndexPage({
  movies: initialMovies,
}: {
  movies: MoviesResponse;
}) {
  const { query, push } = useRouter();
  const [status, setStatus] = useState<Status>(
    (query.status as Status) || "NONE"
  );
  const { movies, loading } = useWatchedMovies({
    initialMovies,
    status,
  });

  const onClick = (status: Status) => {
    push({
      pathname: "/watched",
      query: { status },
    });
    setStatus(status);
  };

  return (
    <Layout searchHeader>
      <div className="flex justify-between items-center pb-8">
        <h2 className=" font-bold text-3xl">Watched</h2>
        <ul className="flex">
          <li>
            <Tippy content="Liked">
              <button
                onClick={() => onClick("LIKED")}
                className={classNames(
                  buttonClasses,
                  "rounded-l-md",
                  status === "LIKED" && "bg-brand-blue !text-opacity-100"
                )}
              >
                <ThumbUpIcon className="w-5 h-5 " />
              </button>
            </Tippy>
          </li>
          <li>
            <Tippy content="All">
              <button
                onClick={() => onClick("NONE")}
                className={classNames(
                  buttonClasses,
                  "!text-white !text-opacity-50",
                  status === "NONE" && "bg-brand-blue !text-opacity-100"
                )}
              >
                <PlayIcon className="w-5 h-5" />
              </button>
            </Tippy>
          </li>
          <li>
            <Tippy content="Disliked">
              <button
                onClick={() => onClick("DISLIKED")}
                className={classNames(
                  buttonClasses,
                  "rounded-r-md !text-brand-red",
                  status === "DISLIKED" && "bg-brand-blue !text-opacity-100"
                )}
              >
                <ThumbDownIcon className="w-5 h-5 " />
              </button>
            </Tippy>
          </li>
        </ul>
      </div>
      <MovieList movies={movies} loading={loading} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return validateSessionAndFetch(context, async (session) => {
    const { origin } = absoluteUrl(context.req);
    const { data: movies }: { data: MoviesResponse } = await axios(
      origin + "/api/movies/watched"
    );
    return {
      props: { session, movies },
    };
  });
};
