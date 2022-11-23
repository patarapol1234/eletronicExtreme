import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import GetItem from "../components/GetItem";
import Login from "../components/Login";




const PublicRoute = () => {
  const token = localStorage.getItem('token')
  return token ? <Navigate to="/getitem" /> : <Outlet /> ;
};

export default PublicRoute;
