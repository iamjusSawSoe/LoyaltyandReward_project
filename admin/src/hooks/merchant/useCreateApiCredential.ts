import { MerchantApiCredentialData } from "@/api/features/merchant/merchant.type";
import { usePostCreateApiCredential } from "@/api/features/merchant/postCreateApiCredential";
import { setToast } from "@/store/toastSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  refetch: () => void;
};

const useCreateApiCredential = (props: Props) => {
  const createApiCredentialMutation = usePostCreateApiCredential();
  const dispatch = useDispatch();

  const handleCreateApiCredential = (values: MerchantApiCredentialData) => {
    createApiCredentialMutation.mutateAsync({
      api_key: values.api_key,
      channel: values.channel,
      username: props.username,
    });
  };

  useEffect(() => {
    if (createApiCredentialMutation.data) {
      props.refetch();
      props.setIsModalOpen(false);
      dispatch(
        setToast({
          toastContent: "Api Credential created successfully!",
          toastType: "success",
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createApiCredentialMutation.data]);

  return {
    handleCreateApiCredential,
    isLoading: createApiCredentialMutation.isPending,
    isSuccess: createApiCredentialMutation.isSuccess,
  };
};

export default useCreateApiCredential;
