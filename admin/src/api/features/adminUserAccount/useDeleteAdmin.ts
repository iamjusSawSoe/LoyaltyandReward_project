import axiosInstance from "@/api/config/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AdminCreateResData } from "./adminUser.type";

const deleteAdmin = async (username: string): Promise<AdminCreateResData> => {
  const res = await axiosInstance.delete(`/admin/${username}`);
  return res.data;
};

export const useDeleteAdmin = () => {
  return useMutation<AdminCreateResData, AxiosError, string>({
    mutationFn: deleteAdmin,
  });
};
