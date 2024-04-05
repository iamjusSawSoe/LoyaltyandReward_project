import axiosInstance from "@/api/config/axios";
import { RouteParams } from "@/types/common.types";
import { ArrayRouteParams } from "@/utils/ArrayRouteParams";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { LoyaltyItemData, LoyaltyItemRes } from "./interface";

const getLoyaltyItem = async ({
  point_code,
  point_qty,
  item_name,
  claimed,
  merchant_username,
  page,
  pageSize,
}: RouteParams & LoyaltyItemData): Promise<LoyaltyItemRes> => {
  const filter = () => {
    const params = [];

    if (point_code) {
      params.push({ key: "pointCode", value: `${point_code}` });
    }

    if (point_qty) {
      params.push({ key: "pointQty", value: `${point_qty}` });
    }

    if (item_name) {
      params.push({ key: "itemName", value: `${item_name}` });
    }

    if (claimed) {
      params.push({ key: "claimed", value: `${claimed}` });
    }

    if (merchant_username) {
      params.push({ key: "merchant.username", value: `${merchant_username}` });
    }

    return ArrayRouteParams(params);
  };

  const res = await axiosInstance.get(
    "/loyalty-item" +
      `?filter=${filter()}` +
      `&page=${page}` +
      `&page_size=${pageSize}`
  );
  return res.data;
};

export const useGetLoyaltyItem = (
  RequestParams: RouteParams & LoyaltyItemData
) => {
  const query = useQuery<LoyaltyItemRes, AxiosError>({
    queryKey: ["getLoyaltyItem", { ...RequestParams }],
    queryFn: () => getLoyaltyItem(RequestParams),
  });

  return query;
};
