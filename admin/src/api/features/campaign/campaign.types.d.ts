import { Pagination, RouteParams } from "@/types/common.types";

export type CampaignValidType = {
  valid?: {
    from: string;
    to: string;
    is_date_range_limit: boolean;
  };
};

export type CampaignFormatType = {
  format?: {
    prefix: string;
    postfix: string;
    char_only: boolean;
    number_only: boolean;
    mix_char_num: boolean;
    length: number | string;
  };
};

export type CampaignData = {
  title: string;
  point: number | string;
  total_coupons: number | string;
} & CampaignValidType &
  CampaignFormatType;

export type CampaignFieldType = {
  username: string;
  type?: string | null;
  dateRange?: string[];
} & CampaignData;

export type CampaignReqData = RouteParams;

export type CampaignResponseType = {
  campaigns: { data: FetchCampaignData[] } & Pagination;
};

export type FetchCampaignData = {
  title: string;
  point_qty: number;
  total_coupon: number;
  created_coupon: number;
  claimed_coupon: number;
  unclaimed_coupon: number;
  creation_status: string;
  merchant_name: string;
} & CampaignValidType &
  CampaignFormatType;

export type CampaignTableColumn = {
  title: string;
  point_qty: number;
  total_coupon: number;
  created_coupon: number;
  claimed_coupon: number;
  unclaimed_coupon: number;
  creation_status: string;
  merchant_name: string;
  from: string;
  to: string;
  is_date_range_limit: boolean;
  prefix: string;
  postfix: string;
  char_only: boolean;
  number_only: boolean;
  mix_char_num: boolean;
  length: number | string;
};
