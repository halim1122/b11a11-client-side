import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Page/Navbar';
import Footer from '../Page/Footer';
import LoginNavbar from '../Page/LoginNavbar';

const MainLayout = () => {
     return (
          <div>
               <header className='shadow bg-[#342995]'>
                    <LoginNavbar></LoginNavbar>
                    <Navbar></Navbar>
               </header>
              <div className='w-11/12 mx-auto'>
                <Outlet></Outlet>
              </div>
               <footer>
                    <Footer></Footer>
               </footer>
          </div>
     );
};

export default MainLayout;