import { Pagination, RouteParams } from "@/types/common.types";

export type Customer = {
  customers: {
    data: [CustomerData];
  } & Pagination;
};

export type CustomerData = {
  phone_number: string;
  status: string;
  point_qty: number;
  enable: boolean;
};

export type CustomerFieldType = {
  phone_number: string;
  status: string;
  point_qty: string;
};

export type CustomerRequestParams = RouteParams & CustomerFieldType;

export type CustomerPointTransactionParams = {
  phone_number: string;
} & RouteParams;

export type CustomerPointTransactionData = {
  item_name: string;
  point_qty: number;
  transaction_type: string;
  transaction_date: string;
};

export type CustomerPointTransaction = {
  customer: {
    data: CustomerPointTransactionData[];
  } & Pagination;
};

export type CustomerPointTransactionFieldType = {
  phone_number: string;
};

// * for use post disable/enable customer
