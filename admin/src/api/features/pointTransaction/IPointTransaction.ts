import { Pagination, RouteParams } from "@/types/common.types";

export type PointTransactionRouteParams = RouteParams &
  PointTransactionFieldType;

export type PointTransactionFieldType = {
  pointQty: string;
  pointCode: string;
  itemName: string;
  transactionDate: string;
  transactionType: "DEBIT" | "CREDIT" | "";
  channel: "EARN" | "CLAIM" | "PREFUNDING" | "REVERSE" | "";
  phoneNumber: string;
  username: string;
  initiatorType: "CUSTOMER" | "MERCHANT" | "";
};

export type dummy = {
  transactionType: "DEBIT" | "CREDIT" | "";
  channel: "EARN" | "CLAIM" | "PREFUNDING" | "REVERSE" | "";
  initiatorType: "CUSTOMER" | "MERCHANT" | "";
  transactionDate: string;
};

export type PointTransactionResponse = {
  point_transactions: {
    data: PointTransactionData[];
  } & Pagination;
};

export type PointTransactionData = {
  id: number;
  point_qty: number;
  point_code: string;
  item_name: string;
  transaction_date: string;
  transaction_type: "DEBIT" | "CREDIT";
  channel: "EARN" | "CLAIM" | "PREFUNDING" | "REVERSE";
  customer_phone_number: string;
  merchant_username: string;
  initiator_type: "CUSTOMER" | "MERCHANT";
};

// * for Point Transaction Detail Type
export type PointTransactionDetailResponse = {
  point_transaction: PointTransactionData;
};
