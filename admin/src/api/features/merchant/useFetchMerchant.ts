import axiosInstance from "@/api/config/axios";
import { ArrayRouteParams } from "@/utils/ArrayRouteParams";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MerchantResponse, MerchantRouteParams } from "./merchant.type";

const getMerchant = async ({
  username,
  email,
  point_collection,
  page = 0,
  pageSize = 10,
}: MerchantRouteParams): Promise<MerchantResponse> => {
  const filter = () => {
    const params = [];

    if (username) {
      params.push({ key: "username", value: `${username}` });
    }

    if (email) {
      params.push({ key: "email", value: `${email}` });
    }

    if (point_collection) {
      params.push({ key: "itemName", value: `${point_collection}` });
    }

    return ArrayRouteParams(params);
  };

  const res = await axiosInstance.get(
    "/merchant" +
      `?filter=${filter()}` +
      `&page=${page}` +
      `&page_size=${pageSize}`
  );
  return res.data;
};

export const useFetchMerchant = (RequestParams: MerchantRouteParams) => {
  const isAnyParamProvided =
    RequestParams.username ||
    RequestParams.email ||
    RequestParams.point_collection ||
    RequestParams.page ||
    RequestParams.pageSize;

  const query = useQuery<MerchantResponse, AxiosError>({
    queryKey: ["getMerchant", { ...RequestParams }],
    queryFn: () => getMerchant(RequestParams),
    enabled: !!isAnyParamProvided,
  });

  return query;
};
