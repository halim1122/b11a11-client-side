import React, { createContext } from 'react';

export const AuthContext =createContext(null);

const AuthProvider = ({children}) => {

const userInfo = {
     name: 'halim'
}


     return <AuthContext value={userInfo}>{children}</AuthContext>
};

export default AuthProvider;