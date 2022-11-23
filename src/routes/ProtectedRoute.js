import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import GetItem from "../components/GetItem";
import Login from "../components/Login";


const ProtectedRoute = () => {
  const token = localStorage.getItem('token')
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
