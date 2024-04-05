import { Pagination, RouteParams } from "@/types/common.types";

export type MerchantRouteParams = {
  username?: string;
  email?: string;
  point_collection?: string;
} & RouteParams;

export type MerchantResponse = {
  merchant: {
    data: MerchantData[];
  } & Pagination;
};

export type MerchantData = {
  username: string;
  email: string;
  point_collection: number;
};

export type CreateMerchantFieldType = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  pointQty: number | string;
};

export type CreateMerchantResponse = {
  merchant: CreateMerchantFieldType;
};

export type UpdateMerchantData = {
  username: string;
  email: string;
};

export type UpdateMerchantInfo = { merchantName: string } & UpdateMerchantData;

export type UpdateMerchantResponse = {
  merchant: UpdateMerchantData;
};

// * points credit and debit types
export type PointCreditDebitRequest = {
  merchantName: string;
  point_qty: number;
};

export type PointCreditDebitResponse = {
  merchant: {
    id: number;
    createdDate: string;
    updatedDate: string;
    totalPoint: number;
  };
};

// * for merchant api credential
export type MerchantApiCredentialResponse = {
  api_credential: MerchantApiCredentialData;
};

export type MerchantApiCredentialData = {
  api_key: string;
  channel: string;
};

export type MerchantApiCredentialFormFields = {
  username: string;
} & MerchantApiCredentialData;

// * for earn-config
export type EarnConfigResponse = {
  earn_config: EarnConfigData;
};

export type EarnConfigData = {
  id: number;
  createdDate: string;
  updatedDate: string;
  active: boolean;
} & EarnConfigFormFields;

export type EarnConfigFormFields = {
  name: string;
  earnPercent: number | string;
};

export type EarnConfigRequest = {
  username: string;
} & EarnConfigFormFields;

export type PasswordVisibilityState = {
  password: boolean;
  confirm_password: boolean;
};
