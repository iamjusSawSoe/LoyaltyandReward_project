import { useDeleteAdmin } from "@/api/features/adminUserAccount/useDeleteAdmin";
import { setToast } from "@/store/toastSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const useDeleteAdminUserAccount = (props: Props) => {
  const deleteAdminMutation = useDeleteAdmin();
  const dispatch = useDispatch();

  const handleCreateCampaign = (values: string) => {
    console.log(values);
    deleteAdminMutation.mutateAsync(values);
  };

  useEffect(() => {
    if (deleteAdminMutation.data) {
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
  }, [deleteAdminMutation.data]);

  return {
    handleCreateCampaign,
    isLoading: deleteAdminMutation.isPending,
    isSuccess: deleteAdminMutation.isSuccess,
  };
};

export default useDeleteAdminUserAccount;
