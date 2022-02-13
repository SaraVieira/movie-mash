import axios from "axios";
import { GetServerSideProps } from "next";

import Layout from "../components/layout";
import { validateSessionAndFetch } from "../helpers/session";
import { absoluteUrl } from "../helpers/absolute-url";
import { Movie } from "../components/Movie";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { useRouter } from "next/router";
import { Session } from "next-auth";

export default function SearchPage(props) {
  const {
    query: { query },
  } = useRouter();
  const movies = useSearchMovies({ initialMovies: props.movies, query });

  return (
    <Layout searchHeader open value={query.toString()}>
      <ul
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
        className="grid gap-x-4 gap-y-8"
      >
        {(movies?.results || []).map(Movie)}
      </ul>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return validateSessionAndFetch(context, async (session: Session) => {
    const { origin } = absoluteUrl(context.req);
    const { query } = context.query;
    const { data: movies } = await axios(
      origin + "/api/movies/search?query=" + query
    );
    return {
      props: { session, movies },
    };
  });
};
