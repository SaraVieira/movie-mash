import { PrismaClient } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient();

async function main() {
  const { TMDB_KEY } = process.env;
  const {
    data: { genres },
  } = await axios(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_KEY}&language=en-US`
  );
  await prisma.genre.createMany({
    data: genres,
  });
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
