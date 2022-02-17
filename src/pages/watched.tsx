import { ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/outline";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import Layout from "../components/layout";
import { createAuthHeaders, validateSessionAndFetch } from "../helpers/session";
import { absoluteUrl } from "../helpers/absolute-url";

import { useWatchedMovies } from "../hooks/useWatchedMovies";
import classNames from "classnames";
import Tippy from "@tippyjs/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { PlayIcon } from "@heroicons/react/solid";

import { MovieList } from "../components/MovieList";
import { MoviesResponse, Status } from "../constants/types";
import { genres } from "../constants/genres";
import { SearchHeader } from "../components/SearchHeader";
import { sortBy } from "../constants/filters";

const buttonClasses =
  "p-4 bg-brand-inputBg hover:bg-brand-blue text-opacity-80 text-white disabled:hover:text-white disabled:hover:text-opacity-80 disabled:hover:bg-brand-inputBg disabled:opacity-70 text-brand-green";

export default function IndexPage({
  movies: initialMovies,
}: {
  movies: MoviesResponse;
}) {
  const { query, push } = useRouter();
  const [genre, setGenre] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [selectedSort, setSelectedSort] = useState<string>(sortBy[0].value);
  const [status, setStatus] = useState<Status>(
    (query.status as Status) || "NONE"
  );
  const { movies, loading } = useWatchedMovies({
    initialMovies,
    status,
    genre,
    selectedSort,
    search,
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
      <div className="flex justify-between items-center pb-4">
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
      <div className="flex flex-wrap mb-7 gap-6 justify-between">
        <div>
          <select
            id="genres"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 min-w-[300px]"
            onChange={(e) => setGenre(parseInt(e.target.value))}
            value={genre}
          >
            <option>Filter by genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <SearchHeader
          onSearch={setSearch}
          open
          placeholder="Search in your watched movies"
          required={false}
        />
        <div>
          <select
            id="sort"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  min-w-[300px]"
            onChange={(e) => setSelectedSort(e.target.value)}
            value={selectedSort}
          >
            <option>Sort by</option>
            {sortBy.map((sortValue) => (
              <option key={sortValue.value} value={sortValue.value}>
                {sortValue.label}
              </option>
            ))}
          </select>
        </div>
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
    const authOptions = await createAuthHeaders(context);
    const { data: movies }: { data: MoviesResponse } = await axios(
      origin + "/api/movies/watched?sort=" + sortBy[0].value,
      authOptions
    );
    return {
      props: {
        session,
        movies,
      },
    };
  });
};
