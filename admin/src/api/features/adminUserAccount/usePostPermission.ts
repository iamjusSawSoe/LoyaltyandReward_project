import axiosInstance from "@/api/config/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  PostPermissionListRequest,
  PostPermissionListResponse,
} from "./adminUser.type";

const postPermission = async (
  requestData: PostPermissionListRequest
): Promise<PostPermissionListResponse> => {
  const requestBodyData = { permissions: [...requestData.permissions] };

  const res = await axiosInstance.post(
    `/admin/${requestData.username}/permission`,
    requestBodyData
  );
  return res.data;
};

export const usePostPermission = () => {
  return useMutation<
    PostPermissionListResponse,
    AxiosError,
    PostPermissionListRequest
  >({
    mutationFn: postPermission,
  });
};
