// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaTasks, FaUsers, FaPenFancy, FaChartLine, FaBell, FaComments, FaRocket } from "react-icons/fa";

const FeatureSection = () => {
  const features = [
    {
      title: "Create Assignments",
      description: "Easily create study assignments and share with all your study friends.",
      icon: <FaPenFancy className="text-3xl" />,
      color: "from-blue-500 to-cyan-500",
      delay: 0.1
    },
    {
      title: "Submit Solutions",
      description: "Complete your friends' assignments and submit your own responses for grading.",
      icon: <FaTasks className="text-3xl" />,
      color: "from-green-500 to-emerald-500",
      delay: 0.2
    },
    {
      title: "Peer Grading",
      description: "Grade others' work and receive feedback on your own — collaborative learning at its best.",
      icon: <FaUsers className="text-3xl" />,
      color: "from-purple-500 to-pink-500",
      delay: 0.3
    },
    {
      title: "Progress Tracking",
      description: "See your completed, pending, and graded assignments in one place.",
      icon: <FaChartLine className="text-3xl" />,
      color: "from-orange-500 to-red-500",
      delay: 0.4
    },
    {
      title: "Collaboration Tools",
      description: "Discuss assignments with peers and share resources directly on the platform.",
      icon: <FaComments className="text-3xl" />,
      color: "from-indigo-500 to-blue-500",
      delay: 0.5
    },
    {
      title: "Deadline Reminders",
      description: "Get notified before submission dates so you never miss a deadline.",
      icon: <FaBell className="text-3xl" />,
      color: "from-yellow-500 to-orange-500",
      delay: 0.6
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      rotateX: -15
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      rotateY: 5,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    },
    tap: {
      scale: 0.98,
      rotateY: 0
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2
      }
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <div className="py-20 bg-gradient-to-br from-base-200 via-base-100 to-base-300 text-base-content overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <FaRocket className="text-4xl text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Amazing Features
            </h2>
          </motion.div>
          <motion.p 
            className="text-xl text-base-content/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Everything you need for effective collaborative learning
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
              custom={index}
            >
              {/* Background Gradient Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              
              <motion.div
                className="relative bg-base-100 p-8 rounded-2xl shadow-lg border border-base-300/50 backdrop-blur-sm z-10"
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {/* Icon Container */}
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 shadow-lg`}
                  variants={iconVariants}
                >
                  {feature.icon}
                </motion.div>

                {/* Content */}
                <motion.h3 
                  className="text-xl font-bold text-base-content mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {feature.title}
                </motion.h3>
                
                <motion.p 
                  className="text-base-content/70 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {feature.description}
                </motion.p>

                {/* Hover Arrow */}
                <motion.div
                  className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div
            className="inline-flex flex-col sm:flex-row gap-4 items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.button
              className="btn btn-primary btn-lg text-white px-8 rounded-full font-semibold bg-gradient-to-r from-primary to-secondary border-none shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.button>
            <motion.button
              className="btn btn-outline btn-lg px-8 rounded-full font-semibold border-2"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(59, 130, 246, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeatureSection;