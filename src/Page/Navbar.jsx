import { NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { useContext } from 'react';
import LogoImg from '../../src/assets/ChatGPT Image Jun 16, 2025, 05_08_07 PM.png';

const Navbar = () => {

     const {user}=useContext(AuthContext);

     // console.log(`${import.meta.env.VITE_API}`)
     const links = <>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/assignments'>Assignments</NavLink></li>
          {user && <li><NavLink to='/pending-assignments'>Pending Assignments</NavLink></li>}
     </>
     const links2 = <>
          <li><NavLink to='/create-assignment'>Create Assignment</NavLink></li>
          <li><NavLink to='/attemded-assignments'>My Attempted Assignments</NavLink></li>
     </>
     return (
          <div className='w-11/12 mx-auto text-white'>
               <div className="flex justify-between navbar items-center">
                    <div className='flex items-center'>
                         <div>
                              <img className='w-12 h-12 hidden md:flex' src={LogoImg} alt="" />
                         </div>
                         <a className="text-md md:text-xl edu-sa-hand">BrainBand</a>
                    </div>
                    <div className='hidden md:flex'>
                         <ul
                              tabIndex={0}
                              className='flex gap-4'
                         >
                              {links}
                         </ul>
                    </div>
                    <div>
                         <div className="dropdown dropdown-end">
                              <div tabIndex={0} role="button" className="w-auto relative group flex justify-end items-center gap-3 mt-0">
                                   {user ? (
                                        <div>
                                             <img
                                                  className="rounded-full md:h-10 h-7 w-7 md:w-10 object-cover"
                                                  src={user.photoURL}
                                                  alt="User"
                                             />
                                             <div className="absolute -top-[30px] md:-top-[26px] -left-40 md:-left-40 transform translate-x-1/2 translate-y-full p-2 bg-black text-white text-xs rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                  {user.displayName}
                                             </div>
                                        </div>
                                   ) : (
                                        <img
                                             className="rounded-full md:h-10 h-8 w-8 md:w-10 object-cover"
                                             src="https://i.ibb.co/HLcVYWvt/149071.png"
                                             alt="User"
                                        />
                                   )}
                              </div>
                              <ul
                                   tabIndex={0}
                                   className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box z-1 mt-3 w-52 p-2 shadow">
                                   <div className='md:hidden'>
                                        {links}
                                   </div>
                                   {links2}

                              </ul>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Navbar;