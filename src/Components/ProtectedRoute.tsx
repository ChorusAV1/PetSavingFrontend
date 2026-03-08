import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

//If the user hasn't logged in yet and tries to enter to a specific page, it redirects them to /login
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useContext(AuthContext);
  return auth?.isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};


export default ProtectedRoute;
