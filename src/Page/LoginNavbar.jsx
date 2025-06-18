import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import { LuLogIn, LuLogOut } from 'react-icons/lu';
import { FaRegRegistered } from 'react-icons/fa';

const LoginNavbar = () => {

     const { user, logout } = useContext(AuthContext);
     const [toggle, setToggle]=useState(false)

     // console.log(toggle)
     const Navigate = useNavigate();

     // লগআউট হ্যান্ডলার
     const handleLogout = () => {
          logout()
               .then(() => {
                    toast.success("Logout successful");
                    Navigate('/auth/login');
               })
               .catch((error) => {
                    toast.error("Logout failed");
                    console.error(error);
               });
     };


     return (
          <div className='fixed top-0 w-full z-40 flex edu-sa-hand bg-white border-2 border-white'>
               <div className='md:flex-1'></div>
               <div className='flex md:gap-4 gap-2 items-center my-2 mx-5'>
                    <input onClick={() => setToggle(!toggle)} type="checkbox" defaultChecked className="toggle" />
                    <div>
                         {!user?.email && (
                              <><Link
                                   to='/auth/register'
                                   className='rounded-full btn px-7 md:flex hidden text-sm text-[#342995] hover:text-white hover:bg-[#342995] border-[#342995] bg-white text-center'
                              >
                                   Register
                              </Link>
                              <a className="btn md:px-3 px-1 rounded-full bg-[#6f64d4] text-white md:h-10 h-8 w-8 md:w-10 md:hidden">
                                             <FaRegRegistered />
                                        </a>
                         </>)}
                    </div>


                    <div>
                         {user ? (
                              <>
                                   <div onClick={handleLogout} className="cursor-pointer">
                                        <Link to="/auth/login" className='rounded-full btn px-7 text-sm bg-[#66ffb2] hidden md:flex hover:border-black text-[#342995] hover:bg-white hover:text-black text-center'>Logout</Link>
                                        <a className="btn md:px-3 px-1 rounded-full bg-[#6f64d4] text-white md:h-10 h-8 w-8 md:w-10 md:hidden">
                                             <LuLogOut />
                                        </a>
                                   </div>
                              </>
                         ) : (
                              <>
                                   <Link to="/auth/login" className='rounded-full btn px-7 text-sm bg-[#66ffb2] hidden md:flex hover:border-black text-[#342995] hover:bg-white hover:text-black text-center'>Login</Link>
                                   <a className="btn md:px-3 px-1 rounded-full md:h-10 h-8 w-8 md:w-10 bg-[#6f64d4] text-white md:hidden">
                                        <LuLogIn />
                                   </a>
                              </>
                         )}
                    </div>
               </div>
          </div>
     );
};

export default LoginNavbar;