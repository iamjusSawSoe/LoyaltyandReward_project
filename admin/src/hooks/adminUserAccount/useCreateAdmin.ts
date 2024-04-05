import { AdminCreateReqData } from "@/api/features/adminUserAccount/adminUser.type";
import { usePostAdmin } from "@/api/features/adminUserAccount/usePostAdmin";
import { setToast } from "@/store/toastSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const useCreateAdminUserAccount = (props: Props) => {
  const createAdminMutation = usePostAdmin();
  const dispatch = useDispatch();

  const handleCreateCampaign = (values: AdminCreateReqData) => {
    createAdminMutation.mutateAsync(values);
  };

  useEffect(() => {
    if (createAdminMutation.data) {
      props.refetch();
      props.setIsModalOpen(false);
      dispatch(
        setToast({
          toastContent: "Admin User created successfully!",
          toastType: "success",
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createAdminMutation.data]);

  return {
    handleCreateCampaign,
    isLoading: createAdminMutation.isPending,
    isSuccess: createAdminMutation.isSuccess,
  };
};

export default useCreateAdminUserAccount;
