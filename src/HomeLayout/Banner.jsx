// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import bannerImg from '../../src/assets/ChatGPT Image Jun 16, 2025, 04_51_47 PM.png';

const Banner = () => {
  return (
    <div className="bg-base-100 text-base-content mt-30 py-12 px-4 md:px-20 flex flex-col md:flex-row items-center gap-10">
      
      {/* Text Section */}
      <motion.div
        className="flex-1"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Study Together with <span className="text-primary">BrainBand</span>
        </h1>
        <p className="text-lg mb-6 text-base-content/70">
          Create assignments, collaborate with friends, and grade each other's work in a fun and interactive way!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="btn btn-primary text-white px-6 py-2 rounded-full"
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="flex-1"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img src={bannerImg} alt="Banner illustration" className="w-full max-w-md rounded-2xl mx-auto" />
      </motion.div>
    </div>
  );
};

export default Banner;
