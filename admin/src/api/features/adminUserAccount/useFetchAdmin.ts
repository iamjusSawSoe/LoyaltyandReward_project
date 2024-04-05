import axiosInstance from "@/api/config/axios";
import { ArrayRouteParams } from "@/utils/ArrayRouteParams";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AdminResponse, AdminRouteParams } from "./adminUser.type";

const getAdmin = async ({
  username,
  email,
  point_collection,
  page = 0,
  pageSize = 10,
}: AdminRouteParams): Promise<AdminResponse> => {
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
    "/admin" +
      `?filter=${filter()}` +
      `&page=${page}` +
      `&page_size=${pageSize}`
  );
  return res.data;
};

export const useFetchAdmin = (RequestParams: AdminRouteParams) => {
  const isAnyParamProvided =
    RequestParams.username ||
    RequestParams.email ||
    RequestParams.point_collection ||
    RequestParams.page ||
    RequestParams.pageSize;

  const query = useQuery<AdminResponse, AxiosError>({
    queryKey: ["getAdmin", { ...RequestParams }],
    queryFn: () => getAdmin(RequestParams),
    enabled: !!isAnyParamProvided,
  });

  return query;
};
