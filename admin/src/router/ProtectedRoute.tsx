import { PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { token, tokenExpireTime, refreshToken } = useSelector(
    (state: RootState) => state.token
  );
  const dispatch = useDispatch();

  const tokenLocalStorage = localStorage.getItem("persist:token");

  const date = new Date(tokenExpireTime);
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  console.log(timeString);

  if (!tokenLocalStorage || !token || !tokenExpireTime) {
    return <Navigate to="/login" />;
  }

  // if (tokenLocalStorage && token && tokenExpireTime) {
  //   if (new Date(tokenExpireTime) <= new Date()) {
  //     refreshTokenMutation.mutate({ token: refreshToken });
  //     if (refreshTokenMutation.data)
  //       dispatch(
  //         updateToken({
  //           refreshToken: refreshTokenMutation.data.admin_info.refresh_token,
  //           token: refreshTokenMutation.data.admin_info.token,
  //           tokenExpireTime: refreshTokenMutation.data.admin_info.expires_at,
  //         })
  //       );
  //     return children;
  //   }
  // }

  return children;
};
