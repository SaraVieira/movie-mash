import axios from "axios";
import { useQuery } from "react-query";

export const useSearchMovies = ({ initialMovies, query }) => {
  const { data } = useQuery(
    ["movies", "search", query],
    async () => {
      const { data: movies } = await axios(`/api/movies/search?query=${query}`);

      return movies;
    },
    {
      initialData: initialMovies,
    }
  );

  return data;
};