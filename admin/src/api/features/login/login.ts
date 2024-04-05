import axiosInstance from "@/api/config/axios";
import { useMutation } from "@tanstack/react-query";

export type LoginInfo = {
  username: string;
  password: string;
};

export type LoginInfoData = {
  admin_info: {
    username: string;
    token: string;
    expires_at: string;
    refresh_token: string;
  };
};

export type LoginFieldType = {
  username: string;
  password: string;
  remember: boolean;
};

export type RefreshTokenInfoData = {
  refreshToken_info: {
    username: string;
    token: string;
    expires_at: string;
    refresh_token: string;
  };
};

export type RefreshTokenResponse = {
  data: RefreshTokenInfoData;
};

export type RefreshTokenInfo = {
  token: string;
};

const doLogin = async (
  claimPointsReqData: LoginInfo
): Promise<LoginInfoData> => {
  const res = await axiosInstance.post("/auth/admin/login", claimPointsReqData);

  return res.data;
};

export const useDoLogin = () => {
  return useMutation({
    mutationFn: doLogin,
  });
};

export const doRefreshToken = async ({
  token,
}: RefreshTokenInfo): Promise<RefreshTokenInfoData> => {
  const res = await axiosInstance.post("/auth/refresh-token", token);

  return res.data;
};

export const useDoRefreshToken = () => {
  return useMutation({
    mutationFn: doRefreshToken,
  });
};
