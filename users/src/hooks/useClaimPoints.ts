import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useClaimMutation } from "../api/features/claim/claimPoints";
import type { RootState } from "../store";
import { updateEarnPoints } from "../store/earnPointsSlice";
import { setErrorMessage, setIsErrorModal } from "../store/errorSlice";
import { setRoute, updateLoading, updatePause } from "../store/loadingSlice";

const useClaimPoints = (phoneNumber: string, pointCode: string) => {
  const [phoneNoError, setPhoneNoError] = useState(false);
  const [pointCodeError, setPointCodeError] = useState(false);

  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loading.loading);

  const { mutate: claimMutation, isSuccess, data } = useClaimMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(updatePause(true));

      if (data?.message !== "Can't Claim!") {
        dispatch(updateEarnPoints(data.points));
        dispatch(setRoute("/claimed-points"));
      } else if (data?.message === "Can't Claim!") {
        dispatch(setRoute(""));
        if (isLoading === false) {
          dispatch(setIsErrorModal(true));
          dispatch(
            setErrorMessage({
              headerText: `${data?.message}`,
              labelText: "Please enter valid point code to collect point.",
            })
          );
        }
      }
    }
  }, [isSuccess, isLoading, dispatch, data?.message, data?.points]);

  const collectPoints = () => {
    if (phoneNumber === "" && pointCode === "") {
      setPhoneNoError(true);
      setPointCodeError(true);
    } else if (phoneNumber === "") {
      setPhoneNoError(true);
    } else if (phoneNumber.length < 7) {
      setPhoneNoError(true);
    } else if (pointCode === "") {
      setPointCodeError(true);
    }

    if (phoneNumber !== "" && pointCode !== "" && phoneNumber.length >= 7) {
      dispatch(updateLoading(true));
      claimMutation({
        phone_number: `09${phoneNumber}`,
        point_code: pointCode,
      });
    }
  };

  return {
    isLoading,
    collectPoints,
    phoneNoError,
    setPhoneNoError,
    pointCodeError,
    setPointCodeError,
  };
};

export default useClaimPoints;
