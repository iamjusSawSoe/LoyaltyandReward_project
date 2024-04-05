import { setAlertMsg } from "@/store/alertSlice";
import { setToast } from "@/store/toastSlice";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { store } from "../../store";
import { setIsErrorModal } from "../../store/errorModalSlice";
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
          setAlertMsg({
            alertType: "error",
            alertMessageContent: "Please check your connection.",
          })
        );
      } else {
        store.dispatch(
          setToast({
            toastType: "error",
            toastContent: error.response?.data?.detail,
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
          setAlertMsg({
            alertType: "error",
            alertMessageContent: "Please check your connection.",
          })
        );
      } else {
        store.dispatch(
          setToast({
            toastType: "error",
            toastContent: error.response?.data?.detail,
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
