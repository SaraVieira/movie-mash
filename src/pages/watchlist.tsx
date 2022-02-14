import axios from "axios";
import { GetServerSideProps } from "next";

import Layout from "../components/layout";
import { validateSessionAndFetch } from "../helpers/session";
import { absoluteUrl } from "../helpers/absolute-url";
import { useWatchListMovies } from "../hooks/useWatchListMovies";
import { MovieList } from "../components/MovieList";

export default function IndexPage({ movies: initialMovies }) {
  const { movies, loading } = useWatchListMovies({
    initialMovies,
  });
  return (
    <Layout searchHeader>
      <h2 className="pb-8 font-bold text-3xl">Watchlist</h2>
      <MovieList movies={movies} loading={loading} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return validateSessionAndFetch(context, async (session) => {
    const { origin } = absoluteUrl(context.req);
    const { data: movies } = await axios(origin + "/api/movies/watchlist");
    return {
      props: { session, movies },
    };
  });
};
