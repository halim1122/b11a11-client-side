import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const DashboardFooter = () => {
    return (
        <motion.footer 
            className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
        >
            <div className="w-11/12 mx-auto px-4 lg:px-0">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left mb-2 md:mb-0">
                        © {new Date().getFullYear()} BrainBand Dashboard. All rights reserved.
                    </p>
                    <div className="flex gap-4 flex-wrap justify-center">
                        <button className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                            Privacy
                        </button>
                        <button className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                            Terms
                        </button>
                        <button className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                            Help
                        </button>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default DashboardFooter;