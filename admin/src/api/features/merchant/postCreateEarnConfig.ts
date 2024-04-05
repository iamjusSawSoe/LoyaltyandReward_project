import axiosInstance from "@/api/config/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import * as MerchantType from "./merchant.type";

const postCreateEarnConfig = async (
  earnConfigInfo: MerchantType.EarnConfigRequest
): Promise<MerchantType.EarnConfigResponse> => {
  const res = await axiosInstance.post(
    `/merchant/${earnConfigInfo.username}/earn-config`,
    {
      name: earnConfigInfo.name,
      earn_percent: earnConfigInfo.earnPercent,
    }
  );
  return res.data;
};

export const usePostCreateEarnConfig = () => {
  return useMutation<
    MerchantType.EarnConfigResponse,
    AxiosError,
    MerchantType.EarnConfigRequest
  >({
    mutationFn: postCreateEarnConfig,
  });
};
