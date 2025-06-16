import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect } from 'react';
import { auth } from '../firebase/firebase.init';
import { useState } from 'react';

export const AuthContext =createContext(null);

const AuthProvider = ({children}) => {

     
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);

     const handleRegister = (email, password) => {
          setLoading(true)
          return createUserWithEmailAndPassword(auth, email, password);
     }

     const handlesignIn = (email, password) => {
          setLoading(true);
          return signInWithEmailAndPassword(auth, email, password);
     }

     const handleGoogleRegister = (provider) => {
          return signInWithPopup(auth, provider);
     }

     const upDateUser = (profile) => {
          return updateProfile(auth.currentUser, profile);
     }

     const logout = () => {
          setLoading(true);
          return signOut(auth);
     }


     useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
               setUser(currentUser);
               setLoading(false);
          });
          return () => {
               unsubscribe();
          }
     }, [])
     const userInfo = {
          user,
          setUser,
          loading,
          handleGoogleRegister,
          handleRegister,
          handlesignIn,
          upDateUser,
          logout
     }
     return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
};

export default AuthProvider;