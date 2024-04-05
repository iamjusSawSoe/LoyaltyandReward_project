import { useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootState } from "../store";
import { authenticatedRoutes } from "./routes/AunthenticatedRoutes";
import { publicRoutes } from "./routes/PublicRoutes";

const Routes = () => {
  const token = useSelector((state: RootState) => state.token.token);

  const router = createBrowserRouter([
    ...(!token ? publicRoutes : []),
    ...authenticatedRoutes,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
