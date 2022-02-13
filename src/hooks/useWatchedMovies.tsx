import axios from "axios";
import { useQuery } from "react-query";

export const useWatchedMovies = ({ initialMovies, status }) => {
  const { data } = useQuery(
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
    ...data,
    results,
  };
};
