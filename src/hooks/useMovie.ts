import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useMovieWatchlistToggle = ({ id }) => {
  const queryClient = useQueryClient();

  const onMovieWatchlistToggle = useMutation(
    (watchlist: boolean) =>
      axios.post(`/api/movies/${id}/watchlist`, {
        watchlist,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["movie", id]);
        queryClient.invalidateQueries("movies");
      },
    }
  );

  return onMovieWatchlistToggle;
};
export const useLikeMovieToggled = ({ id }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked: boolean) =>
      axios.post(`/api/movies/${id}/liked`, {
        liked,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["movie", id]);
        queryClient.invalidateQueries("movies");
      },
    }
  );

  return mutation;
};

export const useDislikeMovieToggled = ({ id }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (disliked: boolean) =>
      axios.post(`/api/movies/${id}/disliked`, {
        disliked,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["movie", id]);
        queryClient.invalidateQueries("movies");
      },
    }
  );

  return mutation;
};

export const useMovie = ({ initialMovie }) => {
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
