import { RootState } from "@/store";
import { clearToast } from "@/store/toastSlice";
import { message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CustomMessage = () => {
  const dispatch = useDispatch();
  const { toastContent, showToast, toastType } = useSelector(
    (state: RootState) => state.toast
  );

  useEffect(() => {
    if (showToast) {
      switch (toastType) {
        case "info":
          message.info(toastContent, 3, () => {
            dispatch(clearToast());
          });
          break;
        case "success":
          message.success(toastContent, 3, () => {
            dispatch(clearToast());
          });
          break;
        case "error":
          message.error(toastContent, 3, () => {
            dispatch(clearToast());
          });
          break;
        case "warning":
          message.warning(toastContent, 3, () => {
            dispatch(clearToast());
          });
          break;

        default:
          break;
      }
    }
  }, [showToast, toastContent, dispatch, toastType]);

  return <></>;
};

export default CustomMessage;
