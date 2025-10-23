// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import bannerImg from '../../src/assets/ChatGPT Image Jun 16, 2025, 04_51_47 PM.png';
import { Link } from 'react-router';

const Banner = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8
      }
    }
  };

  const textVariants = {
    hidden: { x: -80, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const imageVariants = {
    hidden: { x: 80, opacity: 0, scale: 0.8 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-base-200 via-base-100 to-base-300 mb-20 text-base-content py-16 md:py-24 px-4 md:px-20 flex flex-col md:flex-row items-center gap-8 md:gap-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >

      {/* Text Section */}
      <motion.div
        className="flex-1 text-center md:text-left"
        variants={containerVariants}
      >
        <motion.h1
          className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight"
          variants={textVariants}
        >
          Study Together with{" "}
          <motion.span
            className="text-primary"
            animate={{
              color: ["#3B82F6", "#8B5CF6", "#3B82F6"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          >
            BrainBand
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-lg xl:text-xl mb-8 text-base-content/80 leading-relaxed"
          variants={textVariants}
        >
          Create assignments, collaborate with friends, and grade each other's work in a fun and interactive way! Join thousands of students already using BrainBand.
        </motion.p>

        <motion.div
        >
          <Link to='/assignments'>
            <motion.button
              className="btn btn-primary text-white text-lg px-8 py-4 rounded-full font-semibold bg-gradient-to-r from-primary to-secondary border-none shadow-lg"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              Get Started Now
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="flex flex-wrap gap-6 mt-8 justify-center md:justify-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="text-center">
            <motion.p
              className="text-2xl font-bold text-primary"
              whileInView={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1 }}
            >
              10K+
            </motion.p>
            <p className="text-sm text-base-content/70">Active Students</p>
          </div>
          <div className="text-center">
            <motion.p
              className="text-2xl font-bold text-secondary"
              whileInView={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              5K+
            </motion.p>
            <p className="text-sm text-base-content/70">Assignments</p>
          </div>
          <div className="text-center">
            <motion.p
              className="text-2xl font-bold text-accent"
              whileInView={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              99%
            </motion.p>
            <p className="text-sm text-base-content/70">Satisfaction</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="flex-1 relative"
        variants={imageVariants}
      >
        <motion.div
          animate={floatingAnimation}
        >
          <motion.img
            src={bannerImg}
            alt="Banner illustration"
            className="w-full max-w-xl rounded-3xl mx-auto shadow-2xl"
            whileHover={{
              scale: 1.02,
              rotate: 1,
              transition: { duration: 0.3 }
            }}
          />
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/20 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.8, 0.5, 0.8]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Banner;