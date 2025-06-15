import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Page/Navbar';
import Footer from '../Page/Footer';

const MainLayout = () => {
     return (
          <div className='w'>
               <Navbar></Navbar>
               <Outlet></Outlet>
               <Footer></Footer>
          </div>
     );
};

export default MainLayout;