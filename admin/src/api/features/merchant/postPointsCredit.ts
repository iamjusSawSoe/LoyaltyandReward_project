import axiosInstance from "@/api/config/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import * as MerchantType from "./merchant.type";

const postPointsCredit = async (
  pointsCreditDebitInfo: MerchantType.PointCreditDebitRequest
): Promise<MerchantType.PointCreditDebitResponse> => {
  const res = await axiosInstance.post(
    `/merchant/${pointsCreditDebitInfo.merchantName}/point-collection/credit`,
    { point_qty: pointsCreditDebitInfo.point_qty }
  );
  return res.data;
};

export const usePostPointsCredit = () => {
  return useMutation<
    MerchantType.PointCreditDebitResponse,
    AxiosError,
    MerchantType.PointCreditDebitRequest
  >({
    mutationFn: postPointsCredit,
  });
};
