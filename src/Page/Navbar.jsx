import { NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { useContext, useState } from 'react';
import LogoImg from '../../src/assets/ChatGPT Image Jun 16, 2025, 05_08_07 PM.png';
import { IoMenu } from "react-icons/io5";
import { RiChatDeleteLine } from "react-icons/ri";

const Navbar = () => {
     const { user } = useContext(AuthContext);
     const [manu, setManu] = useState(false);

     const links = <>
          <li>
               <NavLink 
                    to='/' 
                    className={({ isActive }) => 
                         `nav-link ${isActive ? 'nav-link-active' : ''}`
                    }
               >
                    Home
               </NavLink>
          </li>
          <li>
               <NavLink 
                    to='/assignments'
                    className={({ isActive }) => 
                         `nav-link ${isActive ? 'nav-link-active' : ''}`
                    }
               >
                    Assignments
               </NavLink>
          </li>
          <li>
               <NavLink 
                    to='/about-Us'
                    className={({ isActive }) => 
                         `nav-link ${isActive ? 'nav-link-active' : ''}`
                    }
               >
                    About Us
               </NavLink>
          </li>
     </>

     const links2 = <>{user &&
      <li>
               <NavLink 
                    to='/dashboard'
                    className={({ isActive }) => 
                         `nav-link ${isActive ? 'nav-link-active' : ''}`
                    }
               >
                    Dashboard
               </NavLink>
          </li>}
    
     </>
{/* <>
          <li>
               <NavLink 
                    to='/pending-assignments'
                    className={({ isActive }) => 
                         `nav-link ${isActive ? 'nav-link-active' : ''}`
                    }
               >
                    Pending Assignments
               </NavLink>
          </li>
          <li>
               <NavLink 
                    to='/create-assignment'
                    className={({ isActive }) => 
                         `nav-link ${isActive ? 'nav-link-active' : ''}`
                    }
               >
                    Create Assignment
               </NavLink>
          </li>
          <li>
               <NavLink 
                    to='/attemded-assignments'
                    className={({ isActive }) => 
                         `nav-link ${isActive ? 'nav-link-active' : ''}`
                    }
               >
                    My Attempted Assignments
               </NavLink>
          </li>
     </> */}
     return (
          <div className="w-11/12 mx-auto text-white">
               <div className="flex justify-between navbar items-center">
                    {/* Logo and Site Name */}
                    <div className="flex items-center relative gap-2">
                         <button 
                              className='lg:hidden transition-transform duration-200 hover:scale-110 active:scale-95' 
                              onClick={() => setManu(!manu)}
                              aria-label="Toggle menu"
                         >
                              {manu ? 
                                   <RiChatDeleteLine className='h-6 w-6' /> : 
                                   <IoMenu className='h-6 w-6' />
                              }
                         </button>
                         <img 
                              className="w-12 h-12 hidden md:flex transition-transform duration-300 hover:scale-105" 
                              src={LogoImg} 
                              alt="BrainBand Logo" 
                         />
                         <a className="text-md md:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:from-purple-500 hover:to-blue-400 transition-all duration-300">
                              BrainBand
                         </a>
                    </div>

                    {/* Mobile Menu with Backdrop */}
                    {manu && (
                         <div 
                              className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
                              onClick={() => setManu(false)}
                         ></div>
                    )}
                    
                    {/* Phone Nav Links */}
                    <div className={`absolute lg:hidden p-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl z-50 transition-all duration-300 ease-in-out transform ${manu ? 'top-16 left-4 scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
                         <ul className="space-y-3" onClick={() => setManu(false)}>
                              {links}
                              {links2}
                         </ul>
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden lg:flex">
                         <ul className="flex gap-6 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                              {links}
                              {links2}
                         </ul>
                    </div>

                    {/* User Profile */}
                    <div className="relative">
                         <div className="dropdown dropdown-end">
                              <div
                                   tabIndex={0}
                                   role="button"
                                   className="w-auto relative group flex justify-end items-center gap-3 transition-all duration-300"
                              >
                                   {user ? (
                                        <div className="relative">
                                             <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                                             <img
                                                  className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-white transition-all duration-300 relative z-10"
                                                  src={user?.photoURL}
                                                  alt="Profile"
                                                  title={user?.displayName}
                                             />
                                             {/* Online Status Indicator */}
                                             <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white z-20"></div>
                                        </div>
                                   ) : (
                                        <div className="relative group">
                                             <div className="absolute -inset-1 bg-gray-400 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                             <img
                                                  className="rounded-full md:h-10 h-8 w-8 md:w-10 object-cover border-2 border-gray-300 group-hover:border-white transition-all duration-300 relative z-10"
                                                  src="https://i.ibb.co/HLcVYWvt/149071.png"
                                                  alt="Guest"
                                             />
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>
               </div>

               {/* Add CSS for smooth transitions */}
               <style jsx>{`
                    .nav-link {
                         position: relative;
                         padding: 8px 16px;
                         border-radius: 20px;
                         transition: all 0.3s ease;
                         font-weight: 500;
                    }
                    
                    .nav-link:hover {
                         background: rgba(255, 255, 255, 0.1);
                         transform: translateY(-2px);
                    }
                    
                    .nav-link-active {
                         background: rgba(255, 255, 255, 0.2);
                         box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
                    }
                    
                    .nav-link-active::after {
                         content: '';
                         position: absolute;
                         bottom: -5px;
                         left: 50%;
                         transform: translateX(-50%);
                         width: 5px;
                         height: 5px;
                         background: white;
                         border-radius: 50%;
                    }
               `}</style>
          </div>
     );
};

export default Navbar;