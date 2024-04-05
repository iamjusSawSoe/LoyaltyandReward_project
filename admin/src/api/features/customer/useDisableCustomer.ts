import axiosInstance from "@/api/config/axios";
import { useMutation } from "@tanstack/react-query";

const disableCustomer = async (phoneNumber: string) => {
  const res = await axiosInstance.post(`/customer/${phoneNumber}/disable`);
  return res;
};

export const useDisableCustomer = () => {
  return useMutation({
    mutationFn: disableCustomer,
  });
};
