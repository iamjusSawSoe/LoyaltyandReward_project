import axiosInstance from "@/api/config/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AdminCreateReqData, AdminCreateResData } from "./adminUser.type";

const postAdmin = async (
  campaignData: AdminCreateReqData
): Promise<AdminCreateResData> => {
  const res = await axiosInstance.post(`/admin`, campaignData);
  return res.data;
};

export const usePostAdmin = () => {
  return useMutation<AdminCreateResData, AxiosError, AdminCreateReqData>({
    mutationFn: postAdmin,
  });
};
