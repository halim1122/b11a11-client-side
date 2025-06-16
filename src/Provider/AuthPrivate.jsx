import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import Loading from '../Auth/Loading';
import { Navigate, useLocation } from 'react-router';

const AuthPrivate = ({children}) => {
     const {user,loading}=useContext(AuthContext);;
     const location = useLocation();

if(loading) return <Loading></Loading>


     if(user){
          return children;
     }
     return <Navigate state={location.pathname} to='/auth/login'></Navigate>
};

export default AuthPrivate;