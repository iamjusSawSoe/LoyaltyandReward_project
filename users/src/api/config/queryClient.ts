import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { store } from "../../store";
import { setErrorMessage, setIsErrorModal } from "../../store/errorSlice";
import { updateLoading } from "../../store/loadingSlice";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      store.dispatch(updateLoading(false));
      store.dispatch(setIsErrorModal(true));

      if (error.code === "ECONNABORTED") {
        store.dispatch(
          setErrorMessage({
            headerText: "Connection Error",
            labelText: "Please check your connection.",
          })
        );
      } else {
        store.dispatch(
          setErrorMessage({
            headerText: `${error.response?.data?.title}`,
            labelText: error.response?.data?.detail,
          })
        );
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      store.dispatch(updateLoading(false));
      store.dispatch(setIsErrorModal(true));

      if (error.code === "ECONNABORTED") {
        store.dispatch(
          setErrorMessage({
            headerText: "Connection Error",
            labelText: "Please check your connection.",
          })
        );
      } else {
        store.dispatch(
          setErrorMessage({
            headerText: `${error.response?.data?.title}`,
            labelText: error.response?.data?.detail,
          })
        );
      }
    },
  }),
});

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError;
  }
}
