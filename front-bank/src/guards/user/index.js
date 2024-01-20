import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GuardUser = () => {
  const isAuthenticated = useSelector((state) => !!state.user.token);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default GuardUser;
