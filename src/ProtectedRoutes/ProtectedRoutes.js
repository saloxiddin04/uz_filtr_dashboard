import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import {useSelector} from 'react-redux';

const ProtectedRoutes = () => {
  const {user, loading} = useSelector((state) => state.user);
  
  return !loading && (user ? <Outlet/> : <Navigate to="/login" replace/>)
  
};

export default ProtectedRoutes;
