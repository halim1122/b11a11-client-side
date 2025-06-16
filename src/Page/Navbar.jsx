import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {

     const links = <>
<li><NavLink to='/'>Home</NavLink></li>
<li><NavLink to='/assignments'>Assignments</NavLink></li>
     </>
     const links2 = <>
<li><NavLink to='/create-assignment'>Create Assignment</NavLink></li>
<li><NavLink to='/attemded-assignments'>Attemded Assignments</NavLink></li>
     </>
     return (
         <div className='w-11/12 mx-auto text-white'>
           <div className="flex justify-between navbar items-center">
               <div>
                    <a className="text-xl edu-sa-hand">BrainBand</a>
               </div>
               <div>
                    <ul
                         tabIndex={0}
                         className='flex gap-4'
                         >
                         {links}
                    </ul>
               </div>
               <div>
                    <div className="dropdown dropdown-end">
                         <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                              <div className="w-10 rounded-full">
                                   <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                              </div>
                         </div>
                         <ul
                              tabIndex={0}
                              className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box z-1 mt-3 w-52 p-2 shadow">
                              {links2}
                         </ul>
                    </div>
               </div>
          </div>
         </div>
     );
};

export default Navbar;