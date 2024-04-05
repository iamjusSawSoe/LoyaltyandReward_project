import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePasswordChangeMutation } from "../api/features/register/register";
import type { RootState } from "../store";
import { setErrorMessage, setIsErrorModal } from "../store/errorSlice";
import { setRoute, updateLoading, updatePause } from "../store/loadingSlice";
import { setSuccessMessage } from "../store/successSlice";

const usePasswordChange = () => {
  const [pin, setPin] = useState<string>("");
  const [confirmPin, setConfirmPin] = useState<string>("");
  const [isPinEmpty, setIsPinEmpty] = useState<boolean>(false);
  const [isConfirmPinEmpty, setIsConfirmPinEmpty] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { type } = useSelector((state: RootState) => state.register);
  const isLoading = useSelector((state: RootState) => state.loading.loading);

  const { mutate: changePassword, isSuccess } = usePasswordChangeMutation();

  const validateForm = () => {
    if (pin === "" && confirmPin === "") {
      setIsConfirmPinEmpty(true);
      setIsPinEmpty(true);
      return false;
    } else if (pin === "") {
      setIsPinEmpty(true);
      return false;
    } else if (confirmPin === "") {
      setIsConfirmPinEmpty(true);
      return false;
    } else if (
      (pin.length < 6 && confirmPin.length < 6 && pin !== confirmPin) ||
      pin.length < 6 ||
      confirmPin.length < 6 ||
      pin !== confirmPin
    ) {
      dispatch(setIsErrorModal(true));
      dispatch(
        setErrorMessage({
          headerText: "Pin Incorrect",
          labelText: "Please type at least 6 characters, and pin and confirm pin must be the same",
        })
      );
      return false;
    }
    return true;
  };

  const handleContinueBtn = () => {
    if (validateForm()) {
      dispatch(updateLoading(true));
      changePassword({
        password: pin,
        confirm_password: confirmPin,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(updatePause(true));
      dispatch(setRoute("/success"));

      const successMessageConfig =
        type === "register"
          ? {
              headerText: "Yayy!",
              labelText: "You have created your account successfully.",
              linkUrl: "/my-points",
              buttonText: "Continue",
            }
          : {
              headerText: "Success!",
              labelText: "You have reset your pin successfully.",
              spanText: "Login with your new PIN.",
              linkUrl: "/enter-phone-no",
              buttonText: "login",
            };

      dispatch(setSuccessMessage(successMessageConfig));
    }
  }, [isSuccess, dispatch, type]);

  useEffect(() => {
    if (pin !== "" && confirmPin !== "") {
      setIsConfirmPinEmpty(false);
      setIsPinEmpty(false);
    } else if (pin !== "") {
      setIsPinEmpty(false);
    } else if (confirmPin !== "") {
      setIsConfirmPinEmpty(false);
    }
  }, [pin, confirmPin]);

  const isErrorStage = () => {
    if ((isPinEmpty && isConfirmPinEmpty) || isPinEmpty || isConfirmPinEmpty) {
      return "error-stage";
    }
    return "";
  };

  return {
    pin,
    setPin,
    confirmPin,
    setConfirmPin,
    isPinEmpty,
    isConfirmPinEmpty,
    handleContinueBtn,
    isErrorStage,
    isLoading,
  };
};

export default usePasswordChange;
