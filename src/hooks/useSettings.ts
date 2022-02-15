import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Settings } from "../constants/types";

export const useSettings = (
  initialSettings: Settings
): {
  settings: Settings;
  loading: boolean;
} => {
  const { data: settings, isLoading } = useQuery(
    "settings",
    async () => {
      const { data: settings } = await axios(`/api/settings`);

      return settings;
    },
    { initialData: initialSettings }
  );

  return { settings, loading: isLoading };
};

export const useToggleSettings = (settings: Settings) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (allowRegistration: boolean) =>
      axios.post(`/api/settings`, {
        ...settings,
        allowRegistration,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("settings");
      },
    }
  );

  return mutation;
};
