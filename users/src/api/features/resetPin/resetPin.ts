import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ResetConfirmCode = {
  phone_number: string;
  token: string;
};

const resetPinAPI = async (phoneNumber: string) => {
  const res = await axios.post("/customer/reset-password", {
    phone_number: phoneNumber,
  });
  return res;
};

export const useResetPin = (phone_number: string) => {
  const query = useQuery({
    queryKey: ["resetPin", phone_number],
    queryFn: () => resetPinAPI(phone_number),
    enabled: false,
  });
  return query;
};

const resetConfirmCode = async (confirmCodeReqData: ResetConfirmCode) => {
  const res = await axios.post("/customer/reset-password/confirm-code", confirmCodeReqData);
  return res;
};

export const useResetConfirmCode = ({ phone_number, token }: ResetConfirmCode) => {
  const query = useQuery({
    queryKey: ["resetConfirmCode", phone_number, token],
    queryFn: () => resetConfirmCode({ phone_number, token }),
    enabled: false,
  });
  return query;
};

const resetResendAPI = async (phoneNumber: string) => {
  const res = await axios.post("/customer/reset-password/resend-code", {
    phone_number: phoneNumber,
  });
  return res;
};

export const useResetResendCode = (phone_number: string) => {
  const query = useQuery({
    queryKey: ["resetResend", phone_number],
    queryFn: () => resetResendAPI(phone_number),
    enabled: false,
  });
  return query;
};
