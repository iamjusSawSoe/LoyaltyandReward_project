import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import axios from "axios";
import type { GetHistories, GetPoints, HistoriesResponse } from "./interface";

const getPoints = async (): Promise<GetPoints> => {
  const res = await axios.get("/customer/point");
  return res.data;
};

const getHistories = async ({ page, page_size = 5 }: GetHistories): Promise<HistoriesResponse> => {
  const res = await axios.get("/customer/point/history", {
    params: { page: page, page_size: page_size },
  });
  return res.data;
};

export const useGetPoints = () => {
  const query = useQuery<GetPoints, AxiosError>({
    queryKey: ["getPoints"],
    queryFn: getPoints,
  });

  return query;
};

export const useGetHistories = (reqData: GetHistories) => {
  return useQuery<HistoriesResponse, AxiosError>({
    queryKey: ["getHistories", reqData],
    queryFn: () => getHistories(reqData),
    placeholderData: keepPreviousData,
  });
};
