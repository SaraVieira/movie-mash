import axios from "axios";
import { useQuery } from "react-query";
import { MoviesResponse, Status } from "../constants/types";

export const useWatchedMovies = ({
  initialMovies,
  status,
  genre,
  selectedSort,
  search,
}: {
  initialMovies: MoviesResponse;
  status: Status;
  genre: number;
  selectedSort: string;
  search: string;
}): {
  movies: MoviesResponse;
  loading: boolean;
} => {
  const { data, isLoading } = useQuery(
    ["movies", "watched", genre, selectedSort, search],
    async () => {
      const urlBase = `/api/movies/watched`;
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

  let results = data.results;

  if (status === "LIKED") results = data.results.filter((a) => a.liked);
  if (status === "DISLIKED") results = data.results.filter((a) => a.disliked);

  return {
    loading: isLoading,
    movies: {
      ...data,
      results,
    },
  };
};
