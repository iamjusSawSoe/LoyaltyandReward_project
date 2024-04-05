import { useDisableCustomer } from "@/api/features/customer/useDisableCustomer";

const useDisableCustomerHooks = (phoneNo: string) => {
  const { mutateAsync, data } = useDisableCustomer();

  const disableCustomer = async () => {
    mutateAsync(phoneNo);
  };

  return { disableCustomer, data };
};

export default useDisableCustomerHooks;
