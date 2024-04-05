import axiosInstance from "@/api/config/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import * as MerchantType from "./merchant.type";

const postMerchant = async (
  merchantInfo: MerchantType.CreateMerchantFieldType
): Promise<MerchantType.CreateMerchantResponse> => {
  const res = await axiosInstance.post("/merchant", merchantInfo);
  return res.data;
};

export const usePostMerchant = () => {
  return useMutation<
    MerchantType.CreateMerchantResponse,
    AxiosError,
    MerchantType.CreateMerchantFieldType
  >({
    mutationFn: postMerchant,
  });
};
