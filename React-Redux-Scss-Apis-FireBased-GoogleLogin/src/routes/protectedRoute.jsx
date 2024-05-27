import React from 'react';
import { Navigate } from 'react-router-dom';
import GetCookie from '../helpers/cookies/getCookie';
import { useSelector } from 'react-redux';


export const ProtectedRoute = ({children}) =>
{
    const accesstoken = GetCookie('accessToken');
    const { isAuthenticate } =  useSelector(state => state.auth)

    if (!accesstoken || isAuthenticate === false) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

