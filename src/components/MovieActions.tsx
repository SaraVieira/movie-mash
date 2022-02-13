import classNames from "classnames";
import {
  useDislikeMovieToggled,
  useLikeMovieToggled,
  useMovieWatchlistToggle,
} from "../hooks/useMovie";
import {
  ClockIcon,
  ThumbDownIcon,
  ThumbUpIcon,
} from "@heroicons/react/outline";
import Tippy from "@tippyjs/react";

export const MovieActions = (movie) => {
  const mutation = useMovieWatchlistToggle({
    id: movie.id,
  });
  const likeMovie = useLikeMovieToggled({ id: movie.id });
  const dislikeMovie = useDislikeMovieToggled({ id: movie.id });
  return (
    <section className="flex items-center justify-center my-4">
      <Tippy
        content={movie.watchlist ? "Remove from Watch later" : "Watch later"}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            mutation.mutateAsync(!movie.watchlist);
          }}
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
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            likeMovie.mutateAsync(!movie.liked);
          }}
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
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dislikeMovie.mutateAsync(!movie.disliked);
          }}
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
  );
};
