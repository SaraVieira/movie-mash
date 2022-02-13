import { ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/outline";
import axios from "axios";
import { GetServerSideProps } from "next";

import Layout from "../components/layout";
import { validateSessionAndFetch } from "../helpers/session";
import { absoluteUrl } from "../helpers/absolute-url";
import { Movie } from "../components/Movie";
import { useWatchedMovies } from "../hooks/useWatchedMovies";
import classNames from "classnames";
import Tippy from "@tippyjs/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { PlayIcon } from "@heroicons/react/solid";
import { Loader } from "../components/Loader";

type Status = "NONE" | "LIKED" | "DISLIKED";

const buttonClasses =
  "p-4 bg-brand-inputBg hover:bg-brand-blue text-opacity-80 text-white disabled:hover:text-white disabled:hover:text-opacity-80 disabled:hover:bg-brand-inputBg disabled:opacity-70 text-brand-green";

export default function IndexPage({ movies: initialMovies }) {
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
      {loading ? (
        <div className="h-[60vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
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
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return validateSessionAndFetch(context, async (session) => {
    const { origin } = absoluteUrl(context.req);
    const { data: movies } = await axios(origin + "/api/movies/watched");
    return {
      props: { session, movies },
    };
  });
};
