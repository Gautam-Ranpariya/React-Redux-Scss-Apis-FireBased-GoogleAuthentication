import React from 'react';
import { Navigate } from 'react-router-dom';


export const ProtectedRoute = ({children}) =>
{
    const authLogin = true;

    if (!authLogin) {
        return <Navigate to="/login" replace />;
    }
    return children;

}

