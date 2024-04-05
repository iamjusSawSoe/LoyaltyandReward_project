import axiosInstance from "@/api/config/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PermissionList } from "./adminUser.type";

const getPermissionList = async (): Promise<PermissionList> => {
  const res = await axiosInstance.get("/permission");
  return res.data;
};

export const useFetchPermission = () => {
  const query = useQuery<PermissionList, AxiosError>({
    queryKey: ["getPermissionList"],
    queryFn: () => getPermissionList(),
  });

  return query;
};
