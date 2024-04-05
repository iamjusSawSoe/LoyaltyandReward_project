import { store } from "@/store";
import { updateLoading } from "@/store/loadingSlice";
import { updateToken } from "@/store/tokenSlice";
import axios, { InternalAxiosRequestConfig } from "axios";
import { RefreshTokenResponse } from "../features/login/login";
import { getToken } from "./authToken";

const isTokenExpired = () => {
  return new Date(store.getState().token.tokenExpireTime) <= new Date();
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

const combinedAuthInterceptor = async (config: InternalAxiosRequestConfig) => {
  const tokenInfo = getToken();

  config.headers.Accept = "application/json";

  if (tokenInfo && config.headers) {
    config.headers.Authorization = `Bearer ${tokenInfo.token}`;
  }

  if (isTokenExpired()) {
    store.dispatch(updateLoading(true));
    try {
      const response = await axios.post<RefreshTokenResponse>(
        `${import.meta.env.VITE_API_URL as string}/auth/refresh-token`,
        {
          refresh_token: tokenInfo.refreshToken,
        }
      );

      config.headers.Authorization = `Bearer ${response.data.data.refreshToken_info.token}`;

      store.dispatch(
        updateToken({
          refreshToken: response.data.data.refreshToken_info.refresh_token,
          token: response.data.data.refreshToken_info.token,
          tokenExpireTime: response.data.data.refreshToken_info.expires_at,
        })
      );

      if (response.data.data) {
        store.dispatch(updateLoading(false));
      }
    } catch (error) {
      store.dispatch(updateLoading(false));
      console.error("Token refresh failed:", error);
    }
  }

  return config;
};

axiosInstance.interceptors.request.use(combinedAuthInterceptor);
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
