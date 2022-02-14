import axios from "axios";
import { useQuery } from "react-query";
import { MoviesResponse } from "../constants/types";

export const useSearchMovies = ({
  initialMovies,
  query,
}: {
  initialMovies: MoviesResponse;
  query: string;
}): {
  movies: MoviesResponse;
  loading: boolean;
} => {
  const { data, isLoading } = useQuery(
    ["movies", "search", query],
    async () => {
      const { data: movies } = await axios(`/api/movies/search?query=${query}`);

      return movies;
    },
    {
      initialData: initialMovies,
    }
  );

  return {
    loading: isLoading,
    movies: data,
  };
};
