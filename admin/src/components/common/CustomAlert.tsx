import { RootState } from "@/store";
import { clearAlertMsg } from "@/store/alertSlice";
import { capitalizeFirstLetter } from "@/utils/CapitalizedFirstLetter";
import { Alert } from "antd";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CustomAlert = () => {
  const dispatch = useDispatch();
  const { alertMessageContent, showAlert, alertType } = useSelector(
    (state: RootState) => state.alert
  );

  const handleClose = useCallback(() => {
    dispatch(clearAlertMsg());
  }, [dispatch]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        dispatch(clearAlertMsg());
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [dispatch, showAlert]);

  return (
    <>
      {showAlert && (
        <Alert
          className="toast-container"
          message={capitalizeFirstLetter(alertType)}
          type={alertType}
          showIcon
          closable
          onClose={handleClose}
          description={alertMessageContent}
        />
      )}
    </>
  );
};

export default CustomAlert;
