import { StarIcon } from "@heroicons/react/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";
import Link from "next/link";
import { formattedDate } from "../helpers/dates";
import { getStars } from "../helpers/movies";
import Tippy from "@tippyjs/react";
import { useState } from "react";
import { MovieActions } from "./MovieActions";
import { languages } from "../constants/languages";
import { getFlagEmoji } from "../helpers/languages";
import { MovieSmall } from "../constants/types";
import { getGenre } from "../constants/genres";

export const Movie = (movie: MovieSmall) => {
  const [showActions, setShowActions] = useState(false);
  const date = formattedDate(movie.releaseDate || "");
  const { starsEmpty = [], starsFull = [] } = getStars(movie.voteAverage);

  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <Link href={`/movies/${movie.tmdbId}`}>
        <a>
          <div className="relative">
            {showActions && (
              <div className="absolute inset-0 z-20 bg-brand-darkBlue bg-opacity-40 flex items-center justify-center">
                <MovieActions {...movie} />
              </div>
            )}
            <img
              className="rounded-md mb-2 shadow-md"
              src={movie.posters.w342 || "/no-image.png"}
              alt={movie.title}
            />
          </div>
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
            {movie.originalLanguage !== "en" && (
              <Tippy
                content={`Movie is in ${languages[movie.originalLanguage]}`}
              >
                <button>
                  <span className="ml-2">
                    {getFlagEmoji(movie.originalLanguage)}
                  </span>
                </button>
              </Tippy>
            )}
          </span>
          <div className="flex text-xs text-white text-opacity-50 justify-between items-center">
            <span className="max-w-[70%]">
              {movie.genres.map((id) => getGenre(id).name).join(" | ")}
            </span>
            {date}
          </div>
        </a>
      </Link>
    </li>
  );
};
