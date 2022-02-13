import axios from "axios";
import { useState } from "react";
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
const DEFAULT_TAB = TABS[0].key;

export const useMovies = (props) => {
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB);
  const { data } = useQuery(
    ["movies", activeTab],
    async () => {
      const { data: movies } = await axios(
        `/api/movies/${activeTab === "POPULAR" ? "popular" : "new"}`
      );

      return movies;
    },
    {
      initialData: activeTab === "POPULAR" ? props.movies : null,
    }
  );

  return {
    data,
    activeTab,
    setActiveTab,
  };
};
