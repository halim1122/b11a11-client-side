import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect } from 'react';
import { auth } from '../firebase/firebase.init';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {


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
          setLoading(true);
          return signInWithPopup(auth, provider);
     }

     const upDateUser = (profile) => {
          setLoading(true);
          return updateProfile(auth.currentUser, profile);
     }

     const logout = () => {
          setLoading(true);
          return signOut(auth);
     }


     useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
               setUser(currentUser);

               if(currentUser?.email){
                    axios.post(`${import.meta.env.VITE_API}/jwt`, { email: currentUser.email }, { withCredentials: true })
                    .then(res => {
                         if (res.data?.success) {
                              console.log(' JWT set successfully', res?.data);
                         }
                    })
                    .catch(error => console.log('❌ Error setting JWT:', error))
               }


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