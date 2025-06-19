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
          <div className={`fixed top-0 w-full z-40 flex edu-sa-hand bg-base-100 dark:bg-base-300 border-2 border-base-100 dark:border-base-300`}>
               <div className='md:flex-1'></div>
               <div className='flex md:gap-4 gap-2 items-center my-2 mx-5'>

                    {/* Toggle Theme */}
                    <label className="cursor-pointer flex items-center gap-2">
                         <input type="checkbox" value="dark" className="toggle theme-controller" />
                    </label>

                    {/* Register Button */}
                    {!user?.email && (
                         <>
                              <Link
                                   to='/auth/register'
                                   className="btn btn-outline btn-primary px-7 md:flex hidden text-sm"
                              >
                                   Register
                              </Link>
                              <a className="btn btn-accent md:px-3 px-1 rounded-full text-white md:h-10 h-8 w-8 md:w-10 md:hidden">
                                   <FaRegRegistered />
                              </a>
                         </>
                    )}

                    {/* Login/Logout Button */}
                    {user ? (
                         <div onClick={handleLogout} className="cursor-pointer">
                              <Link
                                   to="/auth/login"
                                   className="btn btn-success rounded-full hidden md:flex px-7 text-sm text-primary-content"
                              >
                                   Logout
                              </Link>
                              <a className="btn btn-accent md:px-3 px-1 rounded-full text-white md:h-10 h-8 w-8 md:w-10 md:hidden">
                                   <LuLogOut />
                              </a>
                         </div>
                    ) : (
                         <>
                              <Link
                                   to="/auth/login"
                                   className="btn btn-success rounded-full hidden md:flex px-7 text-sm text-primary-content"
                              >
                                   Login
                              </Link>
                              <a className="btn btn-accent md:px-3 px-1 rounded-full text-white md:h-10 h-8 w-8 md:w-10 md:hidden">
                                   <LuLogIn />
                              </a>
                         </>
                    )}
               </div>
          </div>
     );
};

export default LoginNavbar;