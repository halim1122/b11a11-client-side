import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Page/Navbar';
import LoginNavbar from '../Page/LoginNavbar';

const AuthLayout = () => {
     return (
          <div>
               <div className='shadow'>
                    <LoginNavbar></LoginNavbar>
               </div>
               <Outlet></Outlet>
          </div>
     );
};

export default AuthLayout;