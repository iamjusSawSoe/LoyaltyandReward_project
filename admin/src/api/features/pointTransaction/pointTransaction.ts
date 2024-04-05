import axiosInstance from "@/api/config/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ArrayRouteParams } from "../../../utils/ArrayRouteParams";
import {
  PointTransactionDetailResponse,
  PointTransactionResponse,
  PointTransactionRouteParams,
} from "./IPointTransaction";

// * for Point Transaction Listing
const getPointTransaction = async ({
  pointQty,
  pointCode,
  itemName,
  transactionDate,
  transactionType,
  channel,
  phoneNumber,
  username,
  initiatorType,
  page,
  pageSize,
}: PointTransactionRouteParams): Promise<PointTransactionResponse> => {
  const filter = () => {
    const params = [];

    if (typeof phoneNumber !== "undefined" && phoneNumber !== "")
      params.push({ key: "customer.phoneNumber", value: `${phoneNumber}` });

    if (typeof username !== "undefined" && username !== "")
      params.push({ key: "merchant.username", value: `${username}` });

    if (typeof pointQty !== "undefined" && pointQty !== "")
      params.push({ key: "pointQty", value: `${Number(pointQty)}` });

    if (typeof pointCode !== "undefined" && pointCode !== "")
      params.push({ key: "pointCode", value: `${pointCode}` });

    if (typeof itemName !== "undefined" && itemName !== "")
      params.push({ key: "itemName", value: `${itemName}` });

    if (typeof transactionDate !== "undefined" && transactionDate !== "")
      params.push({ key: "transactionDate", value: `${transactionDate}` });

    if (typeof transactionType !== "undefined" && transactionType !== "")
      params.push({ key: "transactionType", value: `${transactionType}` });

    if (typeof channel !== "undefined" && channel !== "")
      params.push({ key: "channel", value: `${channel}` });

    if (typeof initiatorType !== "undefined" && initiatorType !== "")
      params.push({ key: "initiatorType", value: `${initiatorType}` });

    return ArrayRouteParams(params);
  };

  const res = await axiosInstance.get(
    "/point-transaction" +
      `?filter=${filter()}` +
      `&page=${page}` +
      `&page_size=${pageSize}`
  );

  return res.data;
};

export const useGetPointTransaction = (
  RequestParams: PointTransactionRouteParams
) => {
  const query = useQuery<PointTransactionResponse, AxiosError>({
    queryKey: ["getPointTransaction", { ...RequestParams }],
    queryFn: () => getPointTransaction(RequestParams),
    placeholderData: keepPreviousData,
  });

  return query;
};

// * for Point Transaction Detail
const getPointTransactionDetail = async (
  id: number
): Promise<PointTransactionDetailResponse> => {
  const res = await axiosInstance.get(`/point-transaction/${id}`);

  return res.data;
};

export const useGetPointTransactionDetail = (RequestParams: number) => {
  const query = useQuery<PointTransactionDetailResponse, AxiosError>({
    queryKey: ["getPointTransaction", RequestParams],
    queryFn: () => getPointTransactionDetail(RequestParams),
    enabled: !!RequestParams,
    placeholderData: keepPreviousData,
  });

  return query;
};
