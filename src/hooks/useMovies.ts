import axios from "axios";
import { useQuery } from "react-query";

export const TABS = [
  {
    key: "POPULAR",
    name: "Popular",
  },
  {
    key: "NEW",
    name: "New",
  },
];
export const DEFAULT_TAB = TABS[0].key;

export const useMovies = ({ activeTab, initialMovies }) => {
  const { data } = useQuery(
    ["movies", activeTab],
    async () => {
      const { data: fetchedMovies } = await axios(
        `/api/movies/${activeTab === "POPULAR" ? "popular" : "new"}`
      );

      return fetchedMovies;
    },
    {
      initialData: activeTab === "POPULAR" ? initialMovies : null,
    }
  );

  return data;
};
