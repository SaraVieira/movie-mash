import axios from "axios";
import { omit } from "lodash-es";
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
      genres: movie.genre_ids
        .map((id) => ({
          [id]: genres.find((g) => g.id === id).name,
        }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    }))
    .map((m) => omit(m, "genre_ids"));
};

const appendImageUrl = (movies) =>
  movies.map((movie) => ({
    ...omit(movie, ["poster_path", "backdrop_path"]),
    posters: IMAGES.poster_sizes
      .map((size) => ({
        [size]: IMAGES.secure_base_url + size + movie.poster_path,
      }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    backdrops: IMAGES.backdrop_sizes
      .map((size) => ({
        [size]: IMAGES.secure_base_url + size + movie.backdrop_path,
      }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
  }));

export const cleanMovie = (movie) => {
  const [withImageUrl] = appendImageUrl([movie]);

  return withImageUrl;
};

export const cleanMovies = async (movies) => {
  const withImageUrl = appendImageUrl(movies.results);
  const withGenres = await appendGenres(withImageUrl);

  return {
    ...movies,
    results: withGenres,
  };
};

export const cleanActors = (cast) =>
  cast.map((actor) => ({
    ...actor,
    profile_path: IMAGES.secure_base_url + "w185" + actor.profile_path,
  }));
