import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Page/Navbar';
import LoginNavbar from '../Page/LoginNavbar';

const AuthLayout = () => {
     return (
          <div>
               <div className='shadow'>
                    <LoginNavbar />
                    <header className="shadow fixed top-[56px] w-full z-40 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium">
                         <Navbar />
                    </header>
               </div>
               <Outlet></Outlet>
          </div>
     );
};

export default AuthLayout;