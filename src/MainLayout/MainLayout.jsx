import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Page/Navbar';
import Footer from '../Page/Footer';
import LoginNavbar from '../Page/LoginNavbar';

const MainLayout = () => {
     return (
          <div>
               <LoginNavbar></LoginNavbar>
               <header className='shadow fixed top-[56px] w-full z-40 bg-[#342995]'>
                    <Navbar></Navbar>
               </header>
              <div className='w-11/12 mx-auto mt-30'>
                <Outlet></Outlet>
              </div>
               <footer>
                    <Footer></Footer>
               </footer>
          </div>
     );
};

export default MainLayout;