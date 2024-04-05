import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useConfirmCode } from "../api/features/register/register";
import { useResetConfirmCode } from "../api/features/resetPin/resetPin";
import type { OtpNo } from "../pages/ActivateOTP";
import type { RootState } from "../store";
import { setErrorMessage, setIsErrorModal } from "../store/errorSlice";
import { setToken, setType } from "../store/registerSlice";


const useOtpHandling = (apiType: "reset" | "register") => {
  const [otpNo, setOtpNo] = useState<OtpNo>({
    number1: "",
    number2: "",
    number3: "",
    number4: "",
    number5: "",
    number6: "",
  });
  const [otp, setOtp] = useState("");
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const phoneNumber = useSelector((state: RootState) => state.register.phoneNumber);

  const resetApi = useResetConfirmCode({
    phone_number: phoneNumber,
    token: otp,
  });

  const registerApi = useConfirmCode({
    phone_number: phoneNumber,
    token: otp,
  });

  const api = apiType === "reset" ? resetApi : registerApi;

  const getEnteredOtp = () => {
    return Object.values(otpNo).join("");
  };

  const handleActivateBtn = async () => {
    const enteredOtp = getEnteredOtp();

    if (enteredOtp === "") {
      dispatch(setIsErrorModal(true));
      dispatch(
        setErrorMessage({
          headerText: "Form Empty",
          labelText: "Please enter OTP Code.",
        })
      );
    }

    if (enteredOtp.length === 6) {
      setIsBtnClicked(true);
      await setOtp(enteredOtp);
      api.refetch();
    }
  };

  useEffect(() => {
    if (api.isSuccess) {
      dispatch(setType(apiType));
      const token = api.data.data.user_info.token;
      dispatch(setToken(token));
      navigate("/reset-pin"); // or navigate to the appropriate route
    }
    if (api.isError) {
      setIsBtnClicked(false);
    }
  }, [api.isSuccess, api.isError, dispatch, api.data?.data.user_info.token, navigate, apiType]);

  
  useEffect(() => {
    const pwd = Object.values(otpNo).join("");

    if (pwd.length === 6) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [otpNo]);

  return {
    otpNo,
    setOtpNo,
    isBtnClicked,
    handleActivateBtn,
    setIsBtnClicked,
    btnDisabled
  };
};

export default useOtpHandling;
