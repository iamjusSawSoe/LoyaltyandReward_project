import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

type ConfirmCode = {
  phone_number: string;
  token: string;
};

type ChangePassword = {
  password: string;
  confirm_password: string;
};

const register = async (phoneNumber: string) => {
  const res = await axios.post("/customer/register/account", { phone_number: phoneNumber });
  return res;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

const confirmCode = async (confirmCodeReqData: ConfirmCode) => {
  const res = await axios.post("/customer/register/confirm-code", confirmCodeReqData);
  return res;
};

export const useConfirmCode = ({ phone_number, token }: ConfirmCode) => {
  const query = useQuery({
    queryKey: ["confrimCode", phone_number, token],
    queryFn: () => confirmCode({ phone_number, token }),
    enabled: false,
  });
  return query;
};

const changePassword = async (data: ChangePassword) => {
  const req = {
    password: data.password,
    confirm_password: data.confirm_password,
  };
  const res = await axios.post("/customer/change-password", req);
  return res;
};

export const usePasswordChangeMutation = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};
