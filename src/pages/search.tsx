import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import Layout from "../components/layout";
import { validateSessionAndFetch } from "../helpers/session";
import { absoluteUrl } from "../helpers/absolute-url";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { useRouter } from "next/router";
import { Session } from "next-auth";
import { MovieList } from "../components/MovieList";
import { MoviesResponse } from "../constants/types";

export default function SearchPage({
  movies: initialMovies,
}: {
  movies: MoviesResponse;
}) {
  const {
    query: { query },
  } = useRouter();
  const { movies, loading } = useSearchMovies({
    initialMovies,
    query: query.toString(),
  });

  return (
    <Layout searchHeader open value={query.toString()}>
      <MovieList movies={movies} loading={loading} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return validateSessionAndFetch(context, async (session: Session) => {
    const { origin } = absoluteUrl(context.req);
    const { query } = context.query;
    const { data: movies }: { data: MoviesResponse } = await axios(
      origin + "/api/movies/search?query=" + query
    );
    return {
      props: { session, movies },
    };
  });
};
