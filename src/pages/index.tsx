import { StarIcon } from "@heroicons/react/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";
import axios from "axios";
import { GetServerSideProps } from "next";
import classNames from "classnames";
import { useState } from "react";
import Tippy from "@tippyjs/react";
import { useQuery } from "react-query";
import { isInteger } from "lodash-es";
import Link from "next/link";
import Layout from "../components/layout";
import { validateSessionAndFetch } from "../helpers/session";
import { absoluteUrl } from "../helpers/absolute-url";

const TABS = [
  {
    key: "POPULAR",
    name: "Popular",
  },
  {
    key: "NEW",
    name: "New",
  },
];
const DEFAULT_TAB = TABS[0].key;

const getStars = (value) => {
  const divided = Math.round((value / 2) * 2) / 2;

  return {
    value: isInteger(divided) ? divided : divided - 0.5,
    withHalf: isInteger(divided),
  };
};

export default function IndexPage(props) {
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB);
  const { data } = useQuery(
    ["movies", activeTab],
    async () => {
      const { data: movies } = await axios(
        `/api/movies/${activeTab === "POPULAR" ? "popular" : "new"}`
      );

      return movies;
    },
    {
      initialData: activeTab === "POPULAR" ? props.movies : null,
    }
  );

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
        {(data?.results || []).map((movie) => {
          const [year, month, day] = movie.releaseDate.split("-");
          const date = `${day}-${month}-${year}`;
          const starsFull = Array.from(
            Array(getStars(movie.voteAverage).value).keys()
          );
          const starsEmpty = Array.from(
            Array(5 - getStars(movie.voteAverage).value).keys()
          );
          return (
            <li>
              <Link href={`/movies/${movie.id}`}>
                <a>
                  <img
                    className="rounded-md mb-2 shadow-md"
                    src={movie.posters.w342}
                    alt={movie.title}
                  />

                  <div>
                    <Tippy content={movie.voteAverage}>
                      <span>
                        {starsFull.map((i) => (
                          <StarIcon
                            key={i}
                            className="text-brand-yellow w-5 inline-block"
                          />
                        ))}
                        {starsEmpty.map((i) => (
                          <StarIconOutline
                            key={i}
                            className="text-brand-yellow w-[18px] inline-block"
                          />
                        ))}
                      </span>
                    </Tippy>
                  </div>

                  <span className="font-semibold mt-2 block">
                    {movie.title}
                  </span>
                  <div className="flex text-xs text-white text-opacity-50 justify-between items-center">
                    <span className="max-w-[70%]">
                      {Object.values(movie.genres).join(" | ")}
                    </span>
                    {date}
                  </div>
                </a>
              </Link>
            </li>
          );
        })}
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
