import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaFileAlt, FaLaptopCode, FaFlask, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const assignmentsData = [
  { id: 1, title: "Build a Portfolio Website", description: "Create a personal portfolio using HTML, CSS, and JavaScript.", icon: <FaLaptopCode className="text-3xl text-blue-500" />, category: "coding" },
  { id: 2, title: "Science Research Report", description: "Write a detailed research paper on renewable energy sources.", icon: <FaFlask className="text-3xl text-green-500" />, category: "science" },
  { id: 3, title: "Essay on Climate Change", description: "Discuss the effects of global warming and climate change.", icon: <FaFileAlt className="text-3xl text-yellow-500" />, category: "writing" },
  { id: 4, title: "JavaScript Calculator", description: "Develop a basic calculator using JavaScript functions.", icon: <FaLaptopCode className="text-3xl text-purple-500" />, category: "coding" },
  { id: 5, title: "Lab Experiment Report", description: "Record your observations and results from the chemistry experiment.", icon: <FaFlask className="text-3xl text-red-500" />, category: "science" },
  { id: 6, title: "Creative Writing Assignment", description: "Write a short story using any theme of your choice.", icon: <FaFileAlt className="text-3xl text-pink-500" />, category: "writing" },
  { id: 7, title: "Math Problem Set", description: "Solve algebra and geometry problems from the given worksheet.", icon: <FaFileAlt className="text-3xl text-orange-500" />, category: "writing" },
  { id: 8, title: "React Blog Project", description: "Build a blog website using React and TailwindCSS.", icon: <FaLaptopCode className="text-3xl text-teal-500" />, category: "coding" },
  { id: 9, title: "Physics Experiment", description: "Conduct an experiment and explain Newton's Laws.", icon: <FaFlask className="text-3xl text-indigo-500" />, category: "science" },
  { id: 10, title: "Literature Review", description: "Summarize and critique an academic research paper.", icon: <FaFileAlt className="text-3xl text-gray-500" />, category: "writing" },
  { id: 11, title: "Portfolio Redesign", description: "Redesign your old portfolio using modern UI/UX trends.", icon: <FaLaptopCode className="text-3xl text-lime-500" />, category: "coding" },
  { id: 12, title: "Chemistry Lab Report", description: "Submit a detailed report of your latest lab experiment.", icon: <FaFlask className="text-3xl text-cyan-500" />, category: "science" },
];

const FeaturedAssignments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const cardsPerPage = 6;

  // Filter assignments
  const filteredAssignments = filter === "all" 
    ? assignmentsData 
    : assignmentsData.filter(assignment => assignment.category === filter);

  const totalPages = Math.ceil(filteredAssignments.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentAssignments = filteredAssignments.slice(startIndex, startIndex + cardsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      scale: 0.9
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
    },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  };

  return (
    <section className="pb-20 px-4 max-w-7xl mx-auto">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4"
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Featured Assignments
      </motion.h2>

      <motion.p 
        className="text-center text-base-content/70 mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Discover amazing assignments to enhance your learning experience
      </motion.p>

      {/* Filter Buttons */}
      <motion.div 
        className="flex flex-wrap justify-center gap-3 mb-8"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {["all", "coding", "science", "writing"].map((category) => (
          <motion.button
            key={category}
            onClick={() => {
              setFilter(category);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full font-medium capitalize transition-all duration-300 ${
              filter === category 
                ? "bg-primary text-white shadow-lg" 
                : "bg-base-200 text-base-content hover:bg-base-300"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category === "all" ? "All Assignments" : category}
          </motion.button>
        ))}
      </motion.div>

      {/* Card Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${filter}-${currentPage}`}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {currentAssignments.map((assignment) => (
            <motion.div
              key={assignment.id}
              className="border border-base-300 rounded-xl bg-base-100 p-6 flex flex-col gap-4 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div>{assignment.icon}</div>
                <motion.span 
                  className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize"
                  whileHover={{ scale: 1.1 }}
                >
                  {assignment.category}
                </motion.span>
              </div>
              
              <h3 className="text-xl font-semibold text-base-content line-clamp-2">
                {assignment.title}
              </h3>
              
              <p className="text-base-content/70 text-sm leading-relaxed flex-grow">
                {assignment.description}
              </p>
              
              <motion.button
                className="w-full mt-2 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                View Assignment
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div 
          className="flex justify-center items-center gap-2 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-base-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-base-200 transition-colors"
            whileHover={{ scale: currentPage !== 1 ? 1.05 : 1 }}
            whileTap={{ scale: currentPage !== 1 ? 0.95 : 1 }}
          >
            <FaChevronLeft className="text-sm" />
            Previous
          </motion.button>

          <div className="flex gap-1 mx-4">
            {[...Array(totalPages)].map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 rounded-lg font-medium transition-all ${
                  currentPage === index + 1 
                    ? "bg-primary text-white shadow-lg scale-110" 
                    : "bg-base-200 text-base-content hover:bg-base-300"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {index + 1}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-base-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-base-200 transition-colors"
            whileHover={{ scale: currentPage !== totalPages ? 1.05 : 1 }}
            whileTap={{ scale: currentPage !== totalPages ? 0.95 : 1 }}
          >
            Next
            <FaChevronRight className="text-sm" />
          </motion.button>
        </motion.div>
      )}

      {/* Empty State */}
      {currentAssignments.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-base-content mb-2">No assignments found</h3>
          <p className="text-base-content/70">Try selecting a different filter</p>
        </motion.div>
      )}
    </section>
  );
}

export default FeaturedAssignments;