import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import axiosInstance from "@/api/config/axios";
import {
  CustomerPointTransaction,
  CustomerPointTransactionParams,
} from "./interface";

const getCustomerPointTransaction = async ({
  phone_number,
  page,
  pageSize,
}: CustomerPointTransactionParams) => {
  const res = await axiosInstance.get(
    `/customer/${phone_number}/point-transaction` +
      `?page=${page}` +
      `&page_size=${pageSize}`
  );
  return res.data;
};

export const useFetchCustomerPointTransaction = (
  RequestParams: CustomerPointTransactionParams
) => {
  const query = useQuery<CustomerPointTransaction, AxiosError>({
    queryKey: ["getCustomerPointTransaction", { ...RequestParams }],
    queryFn: () => getCustomerPointTransaction(RequestParams),
    placeholderData: keepPreviousData,
    enabled: !!RequestParams.phone_number,
  });

  return query;
};
