import React, { useState } from 'react';
import { Outlet } from 'react-router';
import DashboardNavbar from '../components/Dashboard/DashboardNavbar';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';
import DashboardFooter from '../components/Dashboard/DashboardFooter';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = () => {
     const [isSidebarOpen, setIsSidebarOpen] = useState(true);

     return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
               <DashboardNavbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
               
               {/* Mobile Overlay */}
               <AnimatePresence>
                    {isSidebarOpen && (
                         <motion.div
                              className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onClick={() => setIsSidebarOpen(false)}
                         />
                    )}
               </AnimatePresence>

               <div className="flex">
                         {/* Sidebar - Left Side (My Bookings Menu) */}
                      <motion.aside
                         className={`fixed top-[56px] lg:top-0 md:w-1/5 lg:h-full bg-white dark:bg-gray-800 shadow-lg z-50 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:fixed lg:z-30 ${
                              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                         }`}
                         initial={false}
                         animate={{ x: isSidebarOpen ? 0 : -320 }}
                    >
                         <DashboardSidebar onClick={() => setIsSidebarOpen(!false)} />
                    </motion.aside>
               
                    {/* Main Content - Right Side */}
                    <main className="mt-[56px] min-h-[calc(100vh-56px)] lg:ml-auto lg:w-4/5 transition-all duration-300">
                         <div className="p-6">
                              <Outlet />
                         </div>
                    </main>
               </div>
               
               <footer className="lg:ml-[20%] lg:w-4/5">
                    <DashboardFooter />
               </footer>
          </div>
     );
};

export default DashboardLayout;