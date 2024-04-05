import { CampaignFieldType } from "@/api/features/campaign/campaign.types";
import { usePostCampaign } from "@/api/features/campaign/usePostCampaign";
import { setToast } from "@/store/toastSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const useCreateCampaign = (props: Props) => {
  const campaignMutation = usePostCampaign();
  const dispatch = useDispatch();

  const handleCreateCampaign = (values: CampaignFieldType) => {
    campaignMutation.mutateAsync(values);
  };

  useEffect(() => {
    if (campaignMutation.data) {
      props.refetch();
      props.setIsModalOpen(false);
      dispatch(
        setToast({
          toastContent: "Campaign created successfully!",
          toastType: "success",
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignMutation.data]);

  return {
    handleCreateCampaign,
    isLoading: campaignMutation.isPending,
    isSuccess: campaignMutation.isSuccess,
  };
};

export default useCreateCampaign;
