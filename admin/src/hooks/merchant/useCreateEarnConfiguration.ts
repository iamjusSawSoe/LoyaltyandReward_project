import { EarnConfigFormFields } from "@/api/features/merchant/merchant.type";
import { usePostCreateEarnConfig } from "@/api/features/merchant/postCreateEarnConfig";
import { setToast } from "@/store/toastSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  refetch: () => void;
};

const useCreateEarnConfig = (props: Props) => {
  const earnConfigMutation = usePostCreateEarnConfig();
  const dispatch = useDispatch();

  const handleCreateEarnConfig = (values: EarnConfigFormFields) => {
    earnConfigMutation.mutateAsync({
      username: props.username,
      name: values.name,
      earnPercent: values.earnPercent,
    });
  };

  useEffect(() => {
    if (earnConfigMutation.data) {
      props.refetch();
      props.setIsModalOpen(false);
      dispatch(
        setToast({
          toastContent: "Earn Configuration created successfully!",
          toastType: "success",
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [earnConfigMutation.data]);

  return {
    handleCreateEarnConfig,
    isLoading: earnConfigMutation.isPending,
    isSuccess: earnConfigMutation.isSuccess,
  };
};

export default useCreateEarnConfig;
