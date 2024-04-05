import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useResetPin } from "../api/features/resetPin/resetPin";
import type { RootState } from "../store";

const useForgotPin = () => {
  const phoneNumber = useSelector((state: RootState) => state.register.phoneNumber);

  const navigate = useNavigate();

  const resetPin = useResetPin(phoneNumber);

  const forgotPin = () => {
    resetPin.refetch();
    navigate("/forgot-pin");
  };

  return { forgotPin };
};

export default useForgotPin;
