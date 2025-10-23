import React, { useContext } from 'react';
import { NavLink } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
     FaHome,
     FaTasks,
     FaPlus,
     FaHistory,
     FaUser,
     FaChartBar,
     FaCog,
     FaTimes,
     FaClock
} from 'react-icons/fa';
import { LuLogOut } from 'react-icons/lu';
import { AuthContext } from '../../Provider/AuthProvider';

const DashboardSidebar = ({ onClick }) => {
     const { logout } = useContext(AuthContext);
     const menuItems = [
          {
               path: '/',
               name: 'Home',
               icon: <FaHome className="text-lg" />,
               mobileIcon: <FaHome className="text-xl" />
          },
          {
               path: '/dashboard/assignments',
               name: 'Assignments',
               icon: <FaTasks className="text-lg" />,
               mobileIcon: <FaTasks className="text-xl" />
          },
          {
               path: '/dashboard/pending-assignments',
               name: 'Pending Assignments',
               icon: <FaClock className="text-lg" />,
               mobileIcon: <FaClock className="text-xl" />
          },
          {
               path: '/dashboard/create-assignment',
               name: 'Create Assignment',
               icon: <FaPlus className="text-lg" />,
               mobileIcon: <FaPlus className="text-xl" />
          },
          {
               path: '/dashboard/attempted-assignments',
               name: 'Attempted Assignments',
               icon: <FaHistory className="text-lg" />,
               mobileIcon: <FaHistory className="text-xl" />
          },
          {
               path: '/dashboard/profile',
               name: 'Profile',
               icon: <FaUser className="text-lg" />,
               mobileIcon: <FaUser className="text-xl" />
          }
     ];

     const itemVariants = {
          hidden: { opacity: 0, x: -20 },
          visible: (i) => ({
               opacity: 1,
               x: 0,
               transition: {
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 100
               }
          })
     };

     return (
          <div className="h-full md:mt-16 flex flex-col">
               {/* Navigation Menu */}
               <nav className="h-full flex-1 p-4">
                    <ul className="space-y-2">
                         {menuItems.map((item, index) => (
                              <motion.li
                                   key={item.path}
                                   custom={index}
                                   variants={itemVariants}
                                   initial="hidden"
                                   animate="visible"
                              >
                                   <NavLink
                                        to={item.path}
                                        onClick={onClick}
                                        className={({ isActive }) =>
                                             `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${isActive
                                                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                             }`
                                        }
                                   >
                                        <span className="lg:hidden">
                                             {item.mobileIcon}
                                        </span>
                                        <span className="hidden lg:block">
                                             {item.icon}
                                        </span>
                                        <span>{item.name}</span>
                                   </NavLink>
                              </motion.li>
                         ))}
                    </ul>
                    <div className="cursor-pointer lg:bottom-10 lg:absolute lg:w-9/10">
                         <button onClick={logout}
                              className="btn bg-gradient-to-r w-full from-red-500 to-pink-600 border-0 text-white px-6 text-sm font-medium rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                         >
                              <LuLogOut className="mr-2" />
                              Logout
                         </button>
                    </div>
               </nav>

               {/* Quick Stats - Hidden on mobile */}
               <motion.div
                    className="hidden lg:block p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
               >
                    <div className="text-center">
                         <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Quick Stats</p>
                         <div className="flex justify-between text-xs">
                              <span className="text-green-600">8 Done</span>
                              <span className="text-yellow-600">4 Pending</span>
                         </div>
                    </div>
               </motion.div>
          </div>
     );
};

export default DashboardSidebar;