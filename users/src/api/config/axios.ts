import type { InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { getToken } from "./authToken";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (config.headers) config.headers.Accept = "application/json";
  return config;
}

axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.timeout = 5000;
axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
