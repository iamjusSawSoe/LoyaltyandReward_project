import { UpdateMerchantInfo } from "@/api/features/merchant/merchant.type";
import { usePostUpdateMerchant } from "@/api/features/merchant/postUpdateMerchant";
import { setToast } from "@/store/toastSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const useUpdateMerchant = (props: Props) => {
  const updateMerchantMutation = usePostUpdateMerchant();
  const dispatch = useDispatch();

  const handleUpdateMerchant = (values: UpdateMerchantInfo) => {
    updateMerchantMutation.mutateAsync({
      merchantName: values.merchantName,
      username: values.username,
      email: values.email,
    });
  };

  useEffect(() => {
    if (updateMerchantMutation.data) {
      props.refetch();
      props.setIsModalOpen(false);
      dispatch(
        setToast({
          toastContent: "Merchant created successfully!",
          toastType: "success",
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMerchantMutation.data]);

  return { handleUpdateMerchant, isLoading: updateMerchantMutation.isPending };
};

export default useUpdateMerchant;
