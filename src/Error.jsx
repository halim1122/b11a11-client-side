import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';

const Error = () => {
     return (
          <div className='flex justify-center text-center mt-10'>
               <Helmet>
                    <title>Error !Page not found</title>
               </Helmet>
               <div>
               <img className=' shadow-2xl' src="https://i.ibb.co.com/yFKzb1Z3/istockphoto-1404059706-612x612.jpg" alt="" />
               <Link to="/" className='btn btn-primary my-5'>Back to Home</Link>
               </div>
          </div>
     );
};

export default Error;