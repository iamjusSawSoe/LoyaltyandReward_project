import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../api/features/register/register";
import type { RootState } from "../store";
import { setPhoneNumber } from "../store/registerSlice";
import { setIsCustomModal } from "../store/customModalSlice";

const useRegistration = (phoneNo: string) => {
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const [formEmptyErr, setFormEmptyErr] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isErrorModal = useSelector((state: RootState) => state.error.isErrorModal);

  const { mutate: register, isSuccess, data } = useRegister();

  const handleContinueBtn = (phoneNo: string) => {
    if (phoneNo === "" || phoneNo.length < 7) {
      setFormEmptyErr(true);
    } else if (phoneNo !== "" && phoneNo.length >= 7) {
      setIsBtnClicked(true);
      register(`09${phoneNo}`);
    }
  };

  useEffect(() => {
    if (data?.data.account.status === "NEW") {
      dispatch(setPhoneNumber(`09${phoneNo}`));
      dispatch(setIsCustomModal(true));
    }
    if (data?.data.account.status === "REGISTER") {
      dispatch(setPhoneNumber(`09${phoneNo}`));
      navigate("/enter-pin");
    }
    if (!isErrorModal) {
      setIsBtnClicked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isErrorModal, data?.data.account.status, navigate]);

  return {
    isBtnClicked,
    handleContinueBtn,
    formEmptyErr,
    setFormEmptyErr,
  };
};

export default useRegistration;
