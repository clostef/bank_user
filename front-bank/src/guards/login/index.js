import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GuardLogin = () => {
  const isAuthenticated = useSelector((state) => !!state.user.token);

  return isAuthenticated ? <Navigate to="/user" /> : <Outlet />;
};

export default GuardLogin;
