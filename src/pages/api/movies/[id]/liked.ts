import { getGenresToCreate } from "@/src/helpers/movies";
import prisma from "@/src/helpers/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

const Liked = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return;
  }
  const { id }: { id?: string } = req.query;
  const movie = req.body;

  try {
    const data = await prisma.movies.findUnique({ where: { id } });

    if (!data) {
      const genresToCreate = await getGenresToCreate(movie, prisma);

      await prisma.movies.create({
        data: {
          ...movie,
          id: id.toString(),
          backdrops: {
            create: movie.backdrops,
          },
          posters: {
            create: movie.posters,
          },
          genres: {
            createMany: {
              data: genresToCreate,
            },
          },
        },
      });
    } else {
      await prisma.movies.update({
        where: {
          id,
        },
        data: {
          liked: movie.liked,
          watchlist: false,
        },
      });
    }
    res.json({ id });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json(e);
  }
};

export default Liked;
