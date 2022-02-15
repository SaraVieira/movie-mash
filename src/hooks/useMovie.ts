import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FullMovie, MovieSmall } from "../constants/types";

export const useMovieWatchlistToggle = (movie: MovieSmall) => {
  const queryClient = useQueryClient();

  const onMovieWatchlistToggle = useMutation(
    (watchlist: boolean) =>
      axios.post(`/api/movies/${movie.id}/watchlist`, {
        ...movie,
        watchlist,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["movie", movie.id]);
        queryClient.invalidateQueries("movies");
      },
    }
  );

  return onMovieWatchlistToggle;
};
export const useLikeMovieToggled = (movie: MovieSmall) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked: boolean) =>
      axios.post(`/api/movies/${movie.id}/liked`, {
        ...movie,
        liked,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["movie", movie.id]);
        queryClient.invalidateQueries("movies");
      },
    }
  );

  return mutation;
};

export const useDislikeMovieToggled = (movie: MovieSmall) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (disliked: boolean) =>
      axios.post(`/api/movies/${movie.id}/disliked`, {
        ...movie,
        disliked,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["movie", movie.id]);
        queryClient.invalidateQueries("movies");
      },
    }
  );

  return mutation;
};

export const useMovie = ({
  initialMovie,
}: {
  initialMovie: FullMovie;
}): FullMovie => {
  const { data: movie } = useQuery(
    ["movie", initialMovie.id],
    async () => {
      const { data } = await axios(`/api/movies/${initialMovie.id}`);

      return data;
    },
    {
      initialData: initialMovie,
    }
  );

  return movie;
};
