import { RouteObject } from "react-router-dom";
import { publicRoutes } from "./PublicRoutes";
import { privateRoutes } from "./PrivateRoutes";
import PrivateRoute from "./PrivateRoute";

export const appRoutes: RouteObject[] = [
  ...publicRoutes,
  {
    element: <PrivateRoute />,
    children: privateRoutes,
  },
];
