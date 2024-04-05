import axiosInstance from "@/api/config/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import * as MerchantType from "./merchant.type";

const postUpdateMerchant = async (
  merchantInfo: MerchantType.UpdateMerchantInfo
): Promise<MerchantType.UpdateMerchantResponse> => {
  const updateMerchantData = {
    username: merchantInfo.username,
    email: merchantInfo.email,
  };

  const res = await axiosInstance.put(
    `/merchant/${merchantInfo.merchantName}`,
    updateMerchantData
  );
  return res.data;
};

export const usePostUpdateMerchant = () => {
  return useMutation<
    MerchantType.UpdateMerchantResponse,
    AxiosError,
    MerchantType.UpdateMerchantInfo
  >({
    mutationFn: postUpdateMerchant,
  });
};
