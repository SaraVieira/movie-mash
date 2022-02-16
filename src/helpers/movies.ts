import axios from "axios";
import { isInteger, omit } from "lodash-es";
import { IMAGES } from "../constants/images";

const getGenres = async () => {
  const { TMDB_KEY } = process.env;
  const {
    data: { genres },
  } = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_KEY}&language=en-US`
  );

  return genres;
};

const appendGenres = async (movies) => {
  const genres = await getGenres();

  return movies
    .map((movie) => ({
      ...movie,
      genres: movie.genre_ids.map((id) => ({
        id,
        name: genres.find((g) => g.id === id).name,
      })),
    }))
    .map((m) => omit(m, "genre_ids"));
};

const appendImageUrl = (movies) =>
  movies.map((movie) => ({
    ...omit(movie, ["poster_path", "backdrop_path"]),
    posters: IMAGES.poster_sizes
      .map((size) => ({
        [size]: movie.poster_path
          ? IMAGES.secure_base_url + size + movie.poster_path
          : null,
      }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    backdrops: IMAGES.backdrop_sizes
      .map((size) => ({
        [size]: movie.backdrop_path
          ? IMAGES.secure_base_url + size + movie.backdrop_path
          : null,
      }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
  }));

export const cleanMovie = (movie) => {
  const [withImageUrl] = appendImageUrl([movie]);

  return { ...withImageUrl, tmdbId: withImageUrl.id };
};

export const cleanMovies = async (movies) => {
  const withImageUrl = appendImageUrl(movies.results);
  const withGenres = await appendGenres(withImageUrl);

  return {
    ...movies,
    results: withGenres.map((m) => ({
      ...m,
      tmdbId: m.id,
    })),
  };
};

export const cleanActors = (cast) =>
  cast.map((actor) => ({
    ...actor,
    profile_path: IMAGES.secure_base_url + "w185" + actor.profile_path,
  }));

export const getStars = (a) => {
  if (!a) return {};
  const divided = Math.round((a / 2) * 2) / 2;
  const value = isInteger(divided) ? divided : divided - 0.5;

  return {
    withHalf: isInteger(divided),
    value,
    starsFull: Array.from(Array(value).keys()),
    starsEmpty: Array.from(Array(5 - value).keys()),
  };
};

export const getGenresIDs = async (movie, prisma) => {
  const existingGenres = await prisma.genre.findMany({
    where: {
      id: {
        in: movie.genres.map((m) => m.id),
      },
    },
    select: {
      id: true,
    },
  });
  const existingGenresIDs = existingGenres.map((g) => g.id);

  return existingGenresIDs;
};

export const getGenresToCreate = async (movie, prisma) => {
  const existingIds = await getGenresIDs(movie, prisma);

  return movie.genres.filter((genre) => !existingIds.includes(genre.id));
};

export const prepareDataForMovieSave = async ({
  movie,
  session,
  id,
  prisma,
}) => {
  const genresToCreate = await getGenresToCreate(movie, prisma);

  return {
    data: {
      ...omit(movie, [
        "id",
        "externalIds",
        "cast",
        "videos",
        "revenue",
        "runtime",
        "status",
        "tagline",
        "spokenLanguages",
        "productionCountries",
        "productionCompanies",
        "belongsToCollection",
        "budget",
        "homepage",
        "imdbId",
      ]),
      User: {
        connect: {
          id: session.user.id,
        },
      },
      tmdbId: id.toString(),
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
  };
};
