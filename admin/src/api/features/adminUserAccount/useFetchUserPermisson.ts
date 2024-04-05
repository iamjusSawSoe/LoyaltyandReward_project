import axiosInstance from "@/api/config/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetUserPermissionResponse } from "./adminUser.type";

const getUserPermission = async (
  username: string
): Promise<GetUserPermissionResponse> => {
  const res = await axiosInstance.get(`/admin/${username}/permission`);
  return res.data;
};

export const useFetchUserPermission = (username: string) => {
  const query = useQuery<GetUserPermissionResponse, AxiosError>({
    queryKey: ["getUserPermission", username],
    queryFn: () => getUserPermission(username),
    enabled: !!username,
  });

  return query;
};
