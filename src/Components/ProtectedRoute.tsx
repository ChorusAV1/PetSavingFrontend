import React from "react";
import { Navigate } from "react-router-dom";

//If the user hasn't logged in yet, it redirects them to /login
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
