import axiosInstance from "@/api/config/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import * as MerchantType from "./merchant.type";

const postCreateApiCredential = async (
  merchantInfo: MerchantType.MerchantApiCredentialFormFields
): Promise<MerchantType.MerchantApiCredentialResponse> => {
  const res = await axiosInstance.post(
    `/merchant/${merchantInfo.username}/api-credential`,
    { api_key: merchantInfo.api_key, channel: merchantInfo.channel }
  );
  return res.data;
};

export const usePostCreateApiCredential = () => {
  return useMutation<
    MerchantType.MerchantApiCredentialResponse,
    AxiosError,
    MerchantType.MerchantApiCredentialFormFields
  >({
    mutationFn: postCreateApiCredential,
  });
};
