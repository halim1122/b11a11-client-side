
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import bannerImg from '../../src/assets/ChatGPT Image Jun 16, 2025, 04_51_47 PM.png'; // Replace with your image path

const Banner = () => {
  return (
    <div className="bg-[#f8f9ff] py-12 px-4 md:px-20 flex flex-col md:flex-row items-center gap-10">
      {/* Text Section */}
      <motion.div
        className="flex-1"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-[#342995] mb-6 leading-tight">
          Study Together with <span className="text-[#66ffb2]">BrainBand</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Create assignments, collaborate with friends, and grade each other's work in a fun and interactive way!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="btn bg-[#342995] text-white px-6 py-2 rounded-full"
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
        <img src={bannerImg} alt="Banner illustration" className="w-full max-w-md mx-auto" />
      </motion.div>
    </div>
  );
};

export default Banner;
