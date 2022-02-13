import { StarIcon } from "@heroicons/react/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";
import Link from "next/link";
import { formattedDate } from "../helpers/dates";
import { getStars } from "../helpers/movies";
import Tippy from "@tippyjs/react";

export const Movie = (movie) => {
  const date = formattedDate(movie.releaseDate);
  const { starsEmpty, starsFull } = getStars(movie.voteAverage);
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

          <span className="font-semibold mt-2 block">{movie.title}</span>
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
};
