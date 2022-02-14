import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FullMovie } from "../constants/types";

export const useMovieWatchlistToggle = ({ id }: { id: string }) => {
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
export const useLikeMovieToggled = ({ id }: { id: string }) => {
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

export const useDislikeMovieToggled = ({ id }: { id: string }) => {
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
