import { RouteObject } from "react-router-dom";
import Login from "@pages/public-routes-pages/Login";
import SignUp from "@pages/public-routes-pages/SignUp";

export const publicRoutes: RouteObject[] = [
  { index: true, path: "/", element: <Login /> },
  { path: "/create-user", element: <SignUp /> },
];
