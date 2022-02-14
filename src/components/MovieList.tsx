import { MoviesResponse } from "../constants/types";
import { Loader } from "./Loader";
import { Movie } from "./Movie";

export const MovieList = ({
  movies,
  loading,
}: {
  movies: MoviesResponse;
  loading: boolean;
}) => {
  if (movies?.results.length === 0 && !loading) {
    return (
      <div className="flex w-full h-[80vh] items-center justify-center flex-col">
        <h2 className="font-semibold text-2xl pb-8">No movies were found</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-32 w-32 text-white opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    );
  }

  return loading ? (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader />
    </div>
  ) : (
    <ul
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 342px))",
      }}
      className="grid gap-x-4 gap-y-8 justify-center"
    >
      {(movies?.results || []).map((movie) => (
        <Movie key={movie.id} {...movie} />
      ))}
    </ul>
  );
};
