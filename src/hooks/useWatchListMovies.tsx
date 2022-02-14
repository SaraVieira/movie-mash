import axios from "axios";
import { useQuery } from "react-query";
import { MoviesResponse } from "../constants/types";

export const useWatchListMovies = ({
  initialMovies,
}: {
  initialMovies: MoviesResponse;
}): {
  movies: MoviesResponse;
  loading: boolean;
} => {
  const { data, isLoading } = useQuery(
    ["movies", "watchlist"],
    async () => {
      const { data: fetchedMovies } = await axios(`/api/movies/watchlist`);

      return fetchedMovies;
    },
    {
      initialData: initialMovies,
    }
  );

  return { movies: data, loading: isLoading };
};
