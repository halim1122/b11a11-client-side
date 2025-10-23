import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Page/Navbar';
import Footer from '../Page/Footer';
import LoginNavbar from '../Page/LoginNavbar';
import ScrollToTop from '../components/ScrollToTop';

const MainLayout = () => {
     return (
          <div>
               <ScrollToTop />
               <LoginNavbar />
               <header className="shadow fixed top-[56px] mb-0 w-full z-40 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium">
                    <Navbar />
               </header>
               <div className="w-11/12 mx-auto mt-32">
                    <Outlet />
               </div>
               <footer>
                    <Footer />
               </footer>
          </div>

     );
};

export default MainLayout;