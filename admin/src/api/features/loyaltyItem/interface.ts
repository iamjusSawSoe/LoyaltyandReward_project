import { Pagination, RouteParams } from "@/types/common.types";

export type LoyaltyItemData = {
  point_code: string;
  point_qty: number | null;
  item_name: string;
  claimed: boolean | null;
  merchant_username: string;
};

export type LoyaltyItemRouteParams = LoyaltyItemData & RouteParams;

export type LoyaltyItemRes = {
  loyalty_items: {
    data: [LoyaltyItemData];
  } & Pagination;
};
