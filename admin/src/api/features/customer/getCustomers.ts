import axiosInstance from "@/api/config/axios";
import { RouteParams } from "@/types/common.types";
import { ArrayRouteParams } from "@/utils/ArrayRouteParams";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Customer, CustomerFieldType } from "./interface";

const getCustomers = async ({
  phone_number,
  status,
  point_qty,
  page,
  pageSize,
}: RouteParams & CustomerFieldType): Promise<Customer> => {
  const filter = () => {
    const params = [];

    if (typeof phone_number !== "undefined" && phone_number !== "") {
      params.push({ key: "phoneNumber", value: `${phone_number}` });
    }

    if (typeof status !== "undefined" && status !== "") {
      params.push({ key: "status", value: `${status}` });
    }

    if (typeof point_qty !== "undefined" && point_qty !== "") {
      params.push({ key: "pointCollection.totalPoint", value: `${point_qty}` });
    }

    return ArrayRouteParams(params);
  };

  const res = await axiosInstance.get(
    "/customer" +
      `?filter=${filter()}` +
      `&page=${page}` +
      `&page_size=${pageSize}`
  );
  return res.data;
};

export const useGetCustomers = (
  RequestParams: RouteParams & CustomerFieldType
) => {
  const query = useQuery<Customer, AxiosError>({
    queryKey: ["getCustomer", { ...RequestParams }],
    queryFn: () => getCustomers(RequestParams),
    placeholderData: keepPreviousData,
  });

  return query;
};
