import { StarIcon } from "@heroicons/react/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";
import axios from "axios";
import { GetServerSideProps } from "next";
import Tippy from "@tippyjs/react";
import { isInteger } from "lodash-es";
import Link from "next/link";
import { validateSessionAndFetch } from "@/src/helpers/session";
import { absoluteUrl } from "@/src/helpers/absolute-url";
import Layout from "@/src/components/layout";

const getStars = (value) => {
  const divided = Math.round((value / 2) * 2) / 2;

  return {
    value: isInteger(divided) ? divided : divided - 0.5,
    withHalf: isInteger(divided),
  };
};

function timeConvert(n: number) {
  const num = n;
  const hours = num / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return `${rhours}hr ${rminutes}m`;
}

export default function IndexPage({ movie }) {
  const [year, month, day] = movie.releaseDate.split("-");
  const date = `${day}-${month}-${year}`;
  const starsFull = Array.from(Array(getStars(movie.voteAverage).value).keys());
  const starsEmpty = Array.from(
    Array(5 - getStars(movie.voteAverage).value).keys()
  );
  console.log(movie);
  return (
    <Layout searchHeader>
      <div
        className="w-screen h-[350px] absolute left-0 top-0 z-0 blur-[1px] bg-cover bg-center md:h-[450px] lg:h-[550px]"
        style={{
          backgroundImage: `url(${movie.backdrops.w1280})`,
        }}
      />
      <section className="relative z-10 top-[150px] lg:top-[250px]">
        <img
          className="rounded-md mb-2 shadow-md m-auto max-w-[250px]"
          src={movie.posters.w342}
          alt={movie.title}
        />
      </section>
      <section className="mt-[160px] lg:mt-[260px]">
        <h2 className="font-semibold text-center text-2xl mt-6 mb-4">
          {movie.title}
        </h2>
        <div className="flex text-xs text-white text-opacity-50 justify-center items-center">
          <span>{date}</span>
          <span className="mx-4">|</span>
          {timeConvert(movie.runtime)}
        </div>
        <span className="w-full block mt-2 text-opacity-50 justify-between items-center text-white text-xs text-center">
          {movie.genres.map((genre) => genre.name).join(" | ")}
        </span>

        <div className=" flex items-center justify-center my-4">
          <span className="text-2xl pr-4">{movie.voteAverage} / 10</span>
          <span>
            {starsFull.map((i) => (
              <StarIcon
                key={i}
                className="text-brand-yellow w-8 inline-block"
              />
            ))}
            {starsEmpty.map((i) => (
              <StarIconOutline
                key={i}
                className="text-brand-yellow w-[30px] inline-block"
              />
            ))}
          </span>
        </div>
        <h3 className="text-lg">Synopsis</h3>
        <p className="text-base pt-3 text-white text-opacity-50">
          {movie.overview}
        </p>
        <h3 className="text-lg mt-6">Cast</h3>
        <ul className="mb-6">
          {movie.cast.map((actor) => (
            <li className="mt-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div
                    className="h-[70px] bg-cover bg-center rounded-full w-[70px]"
                    style={{
                      backgroundImage: `url(${actor.profilePath})`,
                    }}
                  />
                  {actor.name}
                </div>
                <span className="text-white text-opacity-50">
                  {actor.character}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return validateSessionAndFetch(context, async (session) => {
    const { origin } = absoluteUrl(context.req);
    const { id } = context.query;
    const { data: movie } = await axios(origin + "/api/movies/" + id);
    return {
      props: { session, movie },
    };
  });
};
