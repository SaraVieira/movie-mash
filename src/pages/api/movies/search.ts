import { cleanMovies } from "@/src/helpers/movies";

import axios from "axios";
import camelcaseKeys from "camelcase-keys";

import type { NextApiRequest, NextApiResponse } from "next";

const Search = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return;
  }
  const { page = 1, query } = req.query;
  const { TMDB_KEY } = process.env;

  try {
    const { data: searchMovies } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`
    );

    const newData = await cleanMovies(searchMovies);

    res.json(camelcaseKeys(newData, { deep: true }));
  } catch (e) {
    res.status(500).json(e);
  }
};

export default Search;