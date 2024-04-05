import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import type { RootState } from "../store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProtectedRoute = ({ children }: any) => {
  const location = useLocation();
  const routeName = location.pathname;
  const { phoneNumber, token } = useSelector((state: RootState) => state.register);
  const points = useSelector((state: RootState) => state.earnPoints.points);
  const successMessage = useSelector((state: RootState) => state.success.successMessage);
  const expierTime = new Date().getTime();

  const restrictWithPhone = ["/enter-pin", "/activation", "/forgot-pin"];
  const restrictWithToken = ["/reset-pin", "/my-points", "/view-all-history"];

  if (restrictWithPhone.includes(routeName) && phoneNumber === "") return <Navigate to="/" />;
  if (restrictWithToken.includes(routeName) && token.expire < expierTime)
    return <Navigate to="/" />;

  if (routeName === "/claimed-points" && points === 0) return <Navigate to="/" />;
  if (routeName === "/success" && (token.expire < expierTime || successMessage.headerText === ""))
    return <Navigate to="/" />;

  return children;
};
