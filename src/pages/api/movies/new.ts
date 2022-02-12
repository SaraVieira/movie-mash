import { cleanMovies } from "@/src/helpers/movies";

import axios from "axios";
import camelcaseKeys from "camelcase-keys";

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return;
  }
  const { page = 1 } = req.query;
  const { TMDB_KEY } = process.env;

  try {
    const { data: newMovies } = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_KEY}&language=en-US&page=${page}`
    );

    const newData = await cleanMovies(newMovies);

    res.json(camelcaseKeys(newData, { deep: true }));
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};
