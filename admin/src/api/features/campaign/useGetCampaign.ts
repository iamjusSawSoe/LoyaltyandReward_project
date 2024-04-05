import axiosInstance from "@/api/config/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CampaignReqData, CampaignResponseType } from "./campaign.types";

const getCampaign = async ({
  page,
  pageSize,
}: CampaignReqData): Promise<CampaignResponseType> => {
  const res = await axiosInstance.get(
    "/campaign" + `?filter=` + `&page=${page}` + `&page_size=${pageSize}`
  );
  return res.data;
};

export const useGetCampaign = (RequestParams: CampaignReqData) => {
  const query = useQuery<CampaignResponseType, AxiosError>({
    queryKey: ["getCampaign", { ...RequestParams }],
    queryFn: () => getCampaign(RequestParams),
    enabled: !!RequestParams,
    placeholderData: keepPreviousData,
  });

  return query;
};
