import React from 'react'
import { Navigate } from 'react-router-dom';
import parseJwt from '../common/getAdmin';
import isTokenExpired from '../common/TokenExpiry';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token")

    const role = parseJwt(token)
    
   if (!token || isTokenExpired(token)) {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        return <Navigate to="/" replace />;
    }

    if (role?.role) {
        return <Navigate to="/admin" replace />;
    }

    return children;
}

export default ProtectedRoute