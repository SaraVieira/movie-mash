import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NewSession, Settings } from "../constants/types";

export const useSettings = (
  initialSettings: Settings,
  session: NewSession
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
    { initialData: initialSettings, enabled: session?.user?.admin }
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
