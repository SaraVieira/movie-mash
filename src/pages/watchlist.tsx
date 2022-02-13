import axios from "axios";
import { GetServerSideProps } from "next";

import Layout from "../components/layout";
import { validateSessionAndFetch } from "../helpers/session";
import { absoluteUrl } from "../helpers/absolute-url";
import { Movie } from "../components/Movie";
import { useWatchListMovies } from "../hooks/useWatchListMovies";

export default function IndexPage({ movies: initialMovies }) {
  const movies = useWatchListMovies({
    initialMovies,
  });
  return (
    <Layout searchHeader>
      <h2 className="pb-8 font-bold text-3xl">Watchlist</h2>
      <ul
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
        className="grid gap-x-4 gap-y-8"
      >
        {(movies?.results || []).map((m) => (
          <Movie key={m.id} {...m} />
        ))}
      </ul>
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
