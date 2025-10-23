import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { FaBars, FaBell, FaUserCircle, FaCog, FaTimes } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';

const DashboardNavbar = ({ onMenuToggle }) => {
     const { user, logout } = useContext(AuthContext);
     const [showDropdown, setShowDropdown] = useState(false);

     return (
          <header className="fixed top-0 left-0 right-0 h-14 bg-gradient-to-r from-primary to-secondary text-white shadow-lg z-40">
               <div className="flex justify-between items-center h-full px-4">
                    {/* Left Side - Menu Button and Brand */}
                    <div className="flex items-center gap-4">
                         {/* Mobile Menu Button - Only show on small screens */}
                         <motion.button
                              className="p-2 rounded-lg hover:bg-white/10 transition-colors lg:hidden"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={onMenuToggle}
                         >
                              <FaBars className="text-xl" />
                         </motion.button>

                         <Link to={`/`}>
                         <motion.h1
                              className="text-xl font-bold"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                         >
                              BrainBand Dashboard
                         </motion.h1>
                         </Link>
                    </div>

                    {/* Right Side - User Menu */}
                    <div className="flex items-center gap-4">
                         {/* Notification Bell */}
                         <motion.button
                              className="p-2 rounded-lg hover:bg-white/10 transition-colors relative"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                         >
                              <FaBell className="text-xl" />
                              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                         </motion.button>

                         {/* User Profile Dropdown */}
                         <div className="relative">
                              <motion.button
                                   className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
                                   whileHover={{ scale: 1.05 }}
                                   whileTap={{ scale: 0.95 }}
                                   onClick={() => setShowDropdown(!showDropdown)}
                              >
                                   {user?.photoURL ? (
                                        <img
                                             src={user.photoURL}
                                             alt="Profile"
                                             className="w-8 h-8 rounded-full"
                                        />
                                   ) : (
                                        <FaUserCircle className="text-2xl" />
                                   )}
                                   <span className="hidden md:block font-medium">
                                        {user?.displayName || 'User'}
                                   </span>
                              </motion.button>

                              {/* Dropdown Menu */}
                              <AnimatePresence>
                                   {showDropdown && (
                                        <motion.div
                                             className="absolute right-0 top-12 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50"
                                             initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                             animate={{ opacity: 1, y: 0, scale: 1 }}
                                             exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        >
                                             <NavLink to={`/dashboard/profile`} className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                                                  <FaUserCircle />
                                                  Profile
                                             </NavLink>
                                             <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
                                             <button
                                                  onClick={logout}
                                                  className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                             >
                                                  Logout
                                             </button>
                                        </motion.div>
                                   )}
                              </AnimatePresence>
                         </div>
                    </div>
               </div>
          </header>
     );
};

export default DashboardNavbar;