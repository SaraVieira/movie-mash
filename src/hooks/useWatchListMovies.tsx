import axios from "axios";
import { useQuery } from "react-query";

export const useWatchListMovies = ({ initialMovies }) => {
  const { data } = useQuery(
    ["movies", "watchlist"],
    async () => {
      const { data: fetchedMovies } = await axios(`/api/movies/watchlist`);

      return fetchedMovies;
    },
    {
      initialData: initialMovies,
    }
  );

  return data;
};
