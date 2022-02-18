import axios from "axios";
import { useQuery } from "react-query";
import { MoviesResponse } from "../constants/types";

export const useWatchListMovies = ({
  initialMovies,
  search,
  selectedSort,
  genre,
}: {
  initialMovies: MoviesResponse;
  genre: number;
  selectedSort: string;
  search: string;
}): {
  movies: MoviesResponse;
  loading: boolean;
} => {
  const { data, isLoading } = useQuery(
    ["movies", "watchlist", search, selectedSort, genre],
    async () => {
      const urlBase = `/api/movies/watchlist`;
      const params = new URLSearchParams([["sort", selectedSort]]);
      if (genre) {
        params.append("genre", genre.toString());
      }

      if (search) {
        params.append("search", search);
      }

      const { data: fetchedMovies } = await axios(`${urlBase}`, { params });

      return fetchedMovies;
    },
    {
      initialData: initialMovies,
    }
  );

  return { movies: data, loading: isLoading };
};
