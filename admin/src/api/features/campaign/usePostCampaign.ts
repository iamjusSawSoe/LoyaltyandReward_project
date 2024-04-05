import axiosInstance from "@/api/config/axios";
import { useMutation } from "@tanstack/react-query";
import * as CampaignTypes from "./campaign.types";

const postCampaign = async (
  campaignData: CampaignTypes.CampaignFieldType
): Promise<CampaignTypes.CampaignData> => {
  const { username, ...reqBody } = campaignData;

  const res = await axiosInstance.post(`/campaign/${username}`, reqBody);

  return res.data;
};

export const usePostCampaign = () => {
  return useMutation({
    mutationFn: postCampaign,
  });
};
