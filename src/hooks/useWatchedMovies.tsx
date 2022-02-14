import axios from "axios";
import { useQuery } from "react-query";
import { MoviesResponse, Status } from "../constants/types";

export const useWatchedMovies = ({
  initialMovies,
  status,
}: {
  initialMovies: MoviesResponse;
  status: Status;
}): {
  movies: MoviesResponse;
  loading: boolean;
} => {
  const { data, isLoading } = useQuery(
    ["movies", "watched"],
    async () => {
      const { data: fetchedMovies } = await axios(`/api/movies/watched`);

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
