import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const Error = () => {
     return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
               <Helmet>
                    <title>Page Not Found - BrainBand</title>
               </Helmet>

               <motion.div
                    className="text-center max-w-md"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
               >
                    {/* Error Icon */}
                    <motion.div
                         className="mb-6"
                         animate={{ 
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0]
                         }}
                         transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              ease: "easeInOut"
                         }}
                    >
                         <div className="w-24 h-24 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto">
                              <FaExclamationTriangle className="text-4xl text-red-500 dark:text-red-400" />
                         </div>
                    </motion.div>

                    {/* Error Content */}
                    <motion.h1
                         className="text-7xl font-bold text-red-500 dark:text-red-400 mb-4"
                         initial={{ opacity: 0, y: -20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.2 }}
                    >
                         404
                    </motion.h1>

                    <motion.h2
                         className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.3 }}
                    >
                         Page Not Found
                    </motion.h2>

                    <motion.p
                         className="text-gray-600 dark:text-gray-400 mb-8"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.4 }}
                    >
                         The page you're looking for doesn't exist or has been moved.
                    </motion.p>

                    <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.5 }}
                    >
                         <Link
                              to="/"
                              className="btn bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                         >
                              <FaHome />
                              Back to Home
                         </Link>
                    </motion.div>
               </motion.div>
          </div>
     );
};

export default Error;