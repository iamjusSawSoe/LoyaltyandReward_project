import axiosInstance from "@/api/config/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import * as MerchantType from "./merchant.type";

const getEarnConfig = async (
  username: string
): Promise<MerchantType.EarnConfigResponse> => {
  const res = await axiosInstance.get(`/merchant/${username}/earn-config`);
  return res.data;
};

export const useFetchEarnConfig = (merchantName: string) => {
  const query = useQuery<MerchantType.EarnConfigResponse, AxiosError>({
    queryKey: ["getEarnConfig", merchantName],
    queryFn: () => getEarnConfig(merchantName),
    enabled: !!merchantName,
  });

  return query;
};
