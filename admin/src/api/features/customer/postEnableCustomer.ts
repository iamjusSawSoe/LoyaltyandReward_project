import axiosInstance from "@/api/config/axios";
import { useMutation } from "@tanstack/react-query";

const enableCustomer = async (phoneNumber: string) => {
  const res = await axiosInstance.post(`/customer/${phoneNumber}/enable`);
  return res;
};

export const useEnableCustomer = () => {
  return useMutation({
    mutationFn: enableCustomer,
  });
};
