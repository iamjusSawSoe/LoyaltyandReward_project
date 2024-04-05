import { useEnableCustomer } from "@/api/features/customer/postEnableCustomer";
import { useDisableCustomer } from "@/api/features/customer/useDisableCustomer";
import { setAlertMsg } from "@/store/alertSlice";
import { updateLoading } from "@/store/loadingSlice";
import { Switch } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface RecordWithStatusPhoneNo {
  status?: string;
  phone_number: string;
  enable?: boolean;
}

interface EnableDisableSwitchProps<T extends RecordWithStatusPhoneNo> {
  record: T;
}

export const EnableDisableSwitch = <T extends RecordWithStatusPhoneNo>({
  record,
}: EnableDisableSwitchProps<T>) => {
  const disableCustomerMutation = useDisableCustomer();
  const enableCustomerMutation = useEnableCustomer();

  const dispatch = useDispatch();

  const handleSwitchChange = (checked: boolean) => {
    dispatch(updateLoading(true));
    if (!checked) {
      disableCustomerMutation.mutateAsync(record.phone_number);
    } else {
      enableCustomerMutation.mutateAsync(record.phone_number);
    }
  };

  useEffect(() => {
    if (disableCustomerMutation.data) {
      dispatch(updateLoading(false));
      dispatch(
        setAlertMsg({
          alertMessageContent: "Customer disabled successfully",
          alertType: "success",
          showAlert: true,
        })
      );
    }
  }, [disableCustomerMutation.data, dispatch]);

  useEffect(() => {
    if (enableCustomerMutation.data) {
      dispatch(updateLoading(false));
      dispatch(
        setAlertMsg({
          alertMessageContent: "Customer enabled successfully",
          alertType: "success",
          showAlert: true,
        })
      );
    }
  }, [enableCustomerMutation.data, dispatch]);

  return (
    <Switch defaultChecked={record.enable} onChange={handleSwitchChange} />
  );
};
