import { Navigate, RouteObject } from "react-router-dom";
import Login from "../../app/Login";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <div>Home Page</div>,
    errorElement: <>Hello this is error</>,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <>Hello this is error</>,
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
];
