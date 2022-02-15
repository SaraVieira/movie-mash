import { cleanActors, cleanMovie } from "@/src/helpers/movies";
import prisma from "@/src/helpers/prisma";
import { isAuthenticatedAPIRoute } from "@/src/helpers/session";

import axios from "axios";
import camelcaseKeys from "camelcase-keys";

import type { NextApiRequest, NextApiResponse } from "next";

const Movie = async (req: NextApiRequest, res: NextApiResponse) => {
  isAuthenticatedAPIRoute(req, res);
  if (req.method === "POST") {
    return;
  }
  const { id }: { id?: string } = req.query;
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

    const { data: external_ids } = await axios(
      `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${TMDB_KEY}&language=en-US`
    );

    const prismaData = await prisma.movies.findFirst({
      where: { id },
    });

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
          external_ids,
          ...(prismaData || {}),
        },
        { deep: true }
      )
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json(e);
  }
};

export default Movie;
