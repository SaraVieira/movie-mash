import { StarIcon } from "@heroicons/react/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import {
  createAuthHeaders,
  validateSessionAndFetch,
} from "@/src/helpers/session";
import { absoluteUrl } from "@/src/helpers/absolute-url";
import Layout from "@/src/components/layout";

import { useMovie } from "@/src/hooks/useMovie";
import { getStars } from "@/src/helpers/movies";
import { formattedDate, minutesToHoursAndMinutes } from "@/src/helpers/dates";
import { MovieActions } from "@/src/components/MovieActions";
import { Social } from "@/src/components/Social";
import { languages } from "@/src/constants/languages";
import { getFlagEmoji } from "@/src/helpers/languages";
import Tippy from "@tippyjs/react";
import { FullMovie } from "@/src/constants/types";

export default function IndexPage({
  movie: initialMovie,
}: {
  movie: FullMovie;
}) {
  const movie = useMovie({ initialMovie });
  const hasExternalIds = Object.values(movie.externalIds).find((a) => a);
  const date = formattedDate(movie.releaseDate);
  const { starsEmpty, starsFull } = getStars(movie.voteAverage);
  return (
    <Layout searchHeader>
      {movie.backdrops.w1280 && (
        <div
          className="w-screen h-[350px] absolute left-0 top-0 z-0 blur-[1px] bg-cover bg-center md:h-[450px] lg:h-[550px]"
          style={{
            backgroundImage: `url(${movie.backdrops.w1280})`,
          }}
        />
      )}
      <section className="relative z-10 top-[150px] lg:top-[250px]">
        <img
          className="rounded-md mb-2 shadow-md m-auto max-w-[250px]"
          src={movie.posters.w342 || "/no-image.png"}
          alt={movie.title}
        />
      </section>
      <section className="mt-[160px] lg:mt-[260px] pb-24">
        <MovieActions {...movie} />
        <h2 className="font-semibold text-center text-2xl mt-6 mb-4">
          {movie.title}
          {movie.originalLanguage !== "en" && (
            <Tippy content={`Movie is in ${languages[movie.originalLanguage]}`}>
              <button>
                <span className="ml-2">
                  {getFlagEmoji(movie.originalLanguage)}
                </span>
              </button>
            </Tippy>
          )}
        </h2>

        <div className="flex text-xs text-white text-opacity-50 justify-center items-center">
          <span>{date}</span>
          <span className="mx-4">|</span>
          {minutesToHoursAndMinutes(movie.runtime)}
        </div>
        <span className="w-full block mt-2 text-opacity-50 justify-between items-center text-white text-xs text-center">
          {movie.genres.map((genre) => genre.name).join(" | ")}
        </span>
        {!!movie.voteAverage && (
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
        )}
        {hasExternalIds && <Social externalIds={movie.externalIds} />}
        <h3 className="text-lg">Synopsis</h3>
        <p className="text-base pt-3 text-white text-opacity-50">
          {movie.overview}
        </p>
        {movie.cast.length ? (
          <>
            <h3 className="text-lg mt-6">Cast</h3>
            <ul className="mb-6">
              {movie.cast.map((actor) => (
                <li className="mt-4" key={actor.id}>
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
          </>
        ) : null}
        {movie.videos.length ? (
          <>
            <h3 className="text-lg mt-6">Videos</h3>
            <section className="block lg:grid grid-cols-2 gap-4">
              {movie.videos.map((video) => (
                <div key={video.id}>
                  <h4 className="text-base pt-3 text-white text-opacity-50 pb-4">
                    {video.name}
                  </h4>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      className="border-0 w-full"
                      src={`https://www.youtube-nocookie.com/embed/${video.key}`}
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                </div>
              ))}
            </section>
          </>
        ) : null}
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return validateSessionAndFetch(context, async (session) => {
    const { origin } = absoluteUrl(context.req);
    const authOptions = await createAuthHeaders(context);
    const { id } = context.query;
    const { data: movie }: { data: FullMovie } = await axios(
      origin + "/api/movies/" + id,
      authOptions
    );
    return {
      props: { session, movie },
    };
  });
};
