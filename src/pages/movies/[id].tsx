import { StarIcon } from "@heroicons/react/solid";
import {
  ClockIcon,
  StarIcon as StarIconOutline,
  ThumbDownIcon,
  ThumbUpIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import { GetServerSideProps } from "next";
import Tippy from "@tippyjs/react";
import { validateSessionAndFetch } from "@/src/helpers/session";
import { absoluteUrl } from "@/src/helpers/absolute-url";
import Layout from "@/src/components/layout";
import classNames from "classnames";
import {
  useDislikeMovieToggled,
  useLikeMovieToggled,
  useMovie,
  useMovieWatchlistToggle,
} from "@/src/hooks/useMovie";
import { getStars } from "@/src/helpers/movies";
import { formattedDate, minutesToHoursAndMinutes } from "@/src/helpers/dates";

export default function IndexPage({ movie: initialMovie }) {
  const movie = useMovie({ initialMovie });
  const mutation = useMovieWatchlistToggle({
    id: movie.id,
  });
  const likeMovie = useLikeMovieToggled({ id: movie.id });
  const dislikeMovie = useDislikeMovieToggled({ id: movie.id });
  const date = formattedDate(movie.releaseDate);
  const { starsEmpty, starsFull } = getStars(movie.voteAverage);

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
        <section className="flex items-center justify-center my-4">
          <Tippy
            content={
              movie.watchlist ? "Remove from Watch later" : "Watch later"
            }
          >
            <button
              onClick={() => mutation.mutateAsync(!movie.watchlist)}
              disabled={mutation.isLoading}
              className={classNames(
                "p-4 bg-brand-inputBg hover:bg-brand-blue rounded-l-md text-opacity-80 text-white hover:text-brand-yellow",
                "disabled:hover:text-white disabled:hover:text-opacity-80 disabled:hover:bg-brand-inputBg disabled:opacity-70",
                movie.watchlist && "text-brand-yellow"
              )}
            >
              <ClockIcon className="w-5 h-5 " />
            </button>
          </Tippy>
          <Tippy content="Liked it">
            <button
              onClick={() => likeMovie.mutateAsync(!movie.liked)}
              disabled={likeMovie.isLoading || movie.disliked}
              className={classNames(
                "p-4 bg-brand-inputBg hover:bg-brand-blue text-opacity-80 text-white hover:text-brand-green",
                "disabled:hover:text-white disabled:hover:text-opacity-80 disabled:hover:bg-brand-inputBg disabled:opacity-70",
                movie.liked && "text-brand-green"
              )}
            >
              <ThumbUpIcon className="w-5 h-5 " />
            </button>
          </Tippy>
          <Tippy content="Disliked it">
            <button
              onClick={() => dislikeMovie.mutateAsync(!movie.disliked)}
              disabled={dislikeMovie.isLoading || movie.liked}
              className={classNames(
                "p-4 bg-brand-inputBg rounded-r-md hover:bg-brand-blue text-opacity-80 text-white hover:text-brand-red",
                "disabled:hover:text-white disabled:hover:text-opacity-80 disabled:hover:bg-brand-inputBg disabled:opacity-70",
                movie.disliked && "text-brand-red"
              )}
            >
              <ThumbDownIcon className="w-5 h-5 " />
            </button>
          </Tippy>
        </section>
        <h2 className="font-semibold text-center text-2xl mt-6 mb-4">
          {movie.title}
        </h2>
        <div className="flex text-xs text-white text-opacity-50 justify-center items-center">
          <span>{date}</span>
          <span className="mx-4">|</span>
          {minutesToHoursAndMinutes(movie.runtime)}
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
