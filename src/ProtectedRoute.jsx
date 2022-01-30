import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useAuth = (userInfo) => {
  if (Object.keys(userInfo).length === 0) {
    return false;
  }
  return true;
};

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.user);
  const isAuth = useAuth(userInfo);

  return isAuth ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
