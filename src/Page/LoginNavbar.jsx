import React from 'react';

const LoginNavbar = () => {
     return (
          <div className='flex text-white border-2 border-white'>
               <div className='flex-1'></div>
               <div className='flex gap-4 my-2 mx-5'>
                    <div  className='rounded-full btn px-7 text-sm bg-[#342995] border-white text-white text-center'>redister</div>
                    <div className='rounded-full btn px-7 text-sm bg-[#66ffb2] text-[#342995] text-center'>login</div>
               </div>
          </div>
     );
};

export default LoginNavbar;