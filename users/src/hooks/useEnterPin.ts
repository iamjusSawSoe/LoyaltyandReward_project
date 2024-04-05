import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogin } from "../api/features/login/login";
import type { OtpNo } from "../pages/ActivateOTP";
import type { RootState } from "../store";
import { setRoute, updateLoading, updatePause } from "../store/loadingSlice";
import { setToken } from "../store/registerSlice";

const useEnterPin = () => {
  const [otpNo, setOtpNo] = useState<OtpNo>({
    number1: "",
    number2: "",
    number3: "",
    number4: "",
    number5: "",
    number6: "",
  });
  const [password, setPassword] = useState<string>("");
  const [btnDisabled, setBtnDisabled] = useState(true);

  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loading.loading);
  const phoneNumber = useSelector((state: RootState) => state.register.phoneNumber);

  const { isSuccess, data, refetch, isFetching } = useLogin({
    username: phoneNumber,
    password: password,
  });

  const onHandleContinue = async () => {
    const pwd = Object.values(otpNo).join("");

    if (pwd.length === 6) {
      await setPassword(pwd);
      refetch();
    }
  };

  useEffect(() => {
    if (isFetching) {
      dispatch(updateLoading(true));
    }

    if (isSuccess) {
      dispatch(updatePause(true));
      dispatch(setToken(data.data.user_info.token));
      dispatch(setRoute("/my-points"));
    }
  }, [isSuccess, isFetching, dispatch, data?.data.user_info.token]);

  useEffect(() => {
    const pwd = Object.values(otpNo).join("");

    if (pwd.length === 6) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [otpNo]);

  return { otpNo, setOtpNo, isLoading, onHandleContinue, btnDisabled };
};

export default useEnterPin;
