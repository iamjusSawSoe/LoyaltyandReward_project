import { CreateMerchantFieldType } from "@/api/features/merchant/merchant.type";
import { usePostMerchant } from "@/api/features/merchant/postMerchant";
import { setToast } from "@/store/toastSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const useCreateMerchant = (props: Props) => {
  const createMerchantMutation = usePostMerchant();
  const dispatch = useDispatch();

  const handleCreateMerchant = (values: CreateMerchantFieldType) => {
    createMerchantMutation.mutateAsync({
      username: values.username,
      email: values.email,
      confirm_password: values.confirm_password,
      password: values.password,
      pointQty: Number(values.pointQty),
    });
  };

  useEffect(() => {
    if (createMerchantMutation.data) {
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
  }, [createMerchantMutation.data]);

  return {
    handleCreateMerchant,
    isLoading: createMerchantMutation.isPending,
  };
};

export default useCreateMerchant;
