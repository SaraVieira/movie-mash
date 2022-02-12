import { cleanActors, cleanMovie, cleanMovies } from "@/src/helpers/movies";

import axios from "axios";
import camelcaseKeys from "camelcase-keys";

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return;
  }
  const { id } = req.query;
  const { TMDB_KEY } = process.env;

  try {
    const { data: movie } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_KEY}&language=en-US`
    );
    const { data: videos } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_KEY}&language=en-US`
    );

    const {
      data: { cast },
    } = await axios(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_KEY}&language=en-US`
    );

    const officialVideos = videos.results.filter(
      (video) => video.site === "YouTube" && video.official
    );

    const videosToReturn = [
      ...officialVideos.filter((v) => v.type === "Trailer"),
      ...officialVideos.filter((v) => v.type === "Teaser"),
      ...officialVideos.filter(
        (v) => v.type !== "Teaser" && v.type !== "Trailer"
      ),
    ];

    res.json(
      camelcaseKeys(
        {
          ...cleanMovie(movie),
          videos: videosToReturn,
          cast: cleanActors(cast.slice(0, 6)),
        },
        { deep: true }
      )
    );
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};
