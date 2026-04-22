import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const isAuthenticated = false; // TODO: replace with real auth check

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRoute
