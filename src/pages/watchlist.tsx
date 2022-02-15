import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import Layout from "../components/layout";
import { createAuthHeaders, validateSessionAndFetch } from "../helpers/session";
import { absoluteUrl } from "../helpers/absolute-url";
import { useWatchListMovies } from "../hooks/useWatchListMovies";
import { MovieList } from "../components/MovieList";
import { MoviesResponse } from "../constants/types";

export default function IndexPage({
  movies: initialMovies,
}: {
  movies: MoviesResponse;
}) {
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return validateSessionAndFetch(context, async (session) => {
    const { origin } = absoluteUrl(context.req);
    const authOptions = await createAuthHeaders(context);
    const { data: movies }: { data: MoviesResponse } = await axios(
      origin + "/api/movies/watchlist",
      authOptions
    );
    return {
      props: { session, movies },
    };
  });
};
