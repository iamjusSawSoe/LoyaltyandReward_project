import axiosInstance from "@/api/config/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import * as MerchantType from "./merchant.type";

const getMerchantApiCredential = async (
  merchantName: string
): Promise<MerchantType.MerchantApiCredentialResponse> => {
  const res = await axiosInstance.get(
    `/merchant/${merchantName}/api-credential`
  );
  return res.data;
};

export const useFetchMerchantApiCredential = (merchantName: string) => {
  const query = useQuery<
    MerchantType.MerchantApiCredentialResponse,
    AxiosError
  >({
    queryKey: ["getMerchantApiCredential", merchantName],
    queryFn: () => getMerchantApiCredential(merchantName),
    enabled: !!merchantName,
  });

  return query;
};
