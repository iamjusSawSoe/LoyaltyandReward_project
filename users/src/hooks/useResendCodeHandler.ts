import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useResetResendCode } from "../api/features/resetPin/resetPin";
import type { RootState } from "../store";
import { formatTime } from "../utils/formatTime";

const useResendCodeHandler = () => {
  const [seconds, setSeconds] = useState(180);
  const [showResendLink, setshowResendLink] = useState(false);
  const formattedTime = formatTime(seconds);

  const phoneNumber = useSelector((state: RootState) => state.register.phoneNumber);

  const useResend = useResetResendCode(phoneNumber);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(intervalId);
          setshowResendLink(true);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  const resendCode = () => {
    setshowResendLink(false);
    setSeconds(180);
    useResend.refetch();
  };

  return { showResendLink, resendCode, formattedTime };
};

export default useResendCodeHandler;
