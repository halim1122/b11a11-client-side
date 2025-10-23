import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import { LuLogIn, LuLogOut } from 'react-icons/lu';
import { FaRegRegistered } from 'react-icons/fa';
import { IoIosSunny, IoMdMoon } from "react-icons/io";

const LoginNavbar = () => {
     const { user, logout } = useContext(AuthContext);
     const navigate = useNavigate();

     // লগআউট হ্যান্ডলার
     const handleLogout = () => {
          logout()
               .then(() => {
                    toast.success("Logout successful");
                    navigate('/auth/login');
               })
               .catch((error) => {
                    toast.error("Logout failed");
                    console.error(error);
               });
     };

     return (
          <div className={`fixed top-0 w-full z-40 flex dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm`}>
               <div className='md:flex-1'></div>
               <div className='flex md:gap-4 gap-3 items-center my-3 mx-5'>
                    
                    {/* Theme Toggle with Enhanced Design */}
                    <label className="cursor-pointer group relative">
                         <input type="checkbox" value="dark" className="toggle theme-controller hidden" />
                         <div className="w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-all duration-300 group-hover:shadow-md">
                              <div className="flex items-center justify-between w-full relative">
                                   <IoIosSunny className="text-yellow-500 text-xs transition-all duration-300 opacity-100 dark:opacity-40" />
                                   <IoMdMoon className="text-blue-400 text-xs transition-all duration-300 opacity-40 dark:opacity-100" />
                                   <div className="absolute bg-white dark:bg-gray-800 w-4 h-4 rounded-full shadow-lg transform transition-transform duration-300 translate-x-0 dark:translate-x-6"></div>
                              </div>
                         </div>
                    </label>

                    {/* Register Button */}
                    {!user?.email && (
                         <>
                              <Link
                                   to='/auth/register'
                                   className="btn bg-gradient-to-r from-green-500 to-emerald-600 border-0 text-white px-6 md:flex hidden text-sm font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                              >
                                   <FaRegRegistered className="mr-2" />
                                   Register
                              </Link>
                              <Link
                                   to='/auth/register'
                                   className="btn bg-gradient-to-r from-green-500 to-emerald-600 border-0 text-white p-0 md:h-10 h-9 w-9 md:w-10 rounded-lg md:hidden flex items-center justify-center hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg"
                              >
                                   <FaRegRegistered className="text-sm" />
                              </Link>
                         </>
                    )}

                    {/* Login/Logout Button */}
                    {user ? (
                         <div onClick={handleLogout} className="cursor-pointer">
                              <button
                                   className="btn bg-gradient-to-r from-red-500 to-pink-600 border-0 text-white px-6 hidden md:flex text-sm font-medium rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                              >
                                   <LuLogOut className="mr-2" />
                                   Logout
                              </button>
                              <button className="btn bg-gradient-to-r from-red-500 to-pink-600 border-0 text-white p-0 md:h-10 h-9 w-9 md:w-10 rounded-lg md:hidden flex items-center justify-center hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg">
                                   <LuLogOut className="text-sm" />
                              </button>
                         </div>
                    ) : (
                         <>
                              <Link
                                   to="/auth/login"
                                   className="btn bg-gradient-to-r from-blue-500 to-purple-600 border-0 text-white px-6 hidden md:flex text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                              >
                                   <LuLogIn className="mr-2" />
                                   Login
                              </Link>
                              <Link
                                   to="/auth/login"
                                   className="btn bg-gradient-to-r from-blue-500 to-purple-600 border-0 text-white p-0 md:h-10 h-9 w-9 md:w-10 rounded-lg md:hidden flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                              >
                                   <LuLogIn className="text-sm" />
                              </Link>
                         </>
                    )}
               </div>
          </div>
     );
};

export default LoginNavbar;