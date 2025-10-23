import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is BrainBand?",
      answer:
        "BrainBand is an online group study platform where all registered users are friends. You can create, complete, and grade assignments collaboratively.",
    },
    {
      question: "How can I join BrainBand?",
      answer:
        "Just register with your email. Once you're in, you're automatically connected with every other user as a friend.",
    },
    {
      question: "How are assignments graded?",
      answer:
        "Any user can grade another user's submitted assignment. The grading is peer-reviewed, which ensures fairness and collaborative learning.",
    },
    {
      question: "Can I edit or delete my assignments?",
      answer:
        "Yes. Go to the “My Assignments” section to edit or delete the assignments you created.",
    },
    {
      question: "What can I do after logging in?",
      answer:
        "You can create assignments, submit answers to others' assignments, grade your friends, and view your submissions and grades.",
    },
    {
      question: "Is BrainBand free to use?",
      answer: "Yes! BrainBand is completely free for collaborative learning.",
    },
    {
      question: "Can I track my progress?",
      answer:
        "Yes. The Dashboard displays your submitted assignments, grades, and pending reviews.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const answerVariants = {
    hidden: { 
      height: 0, 
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto my-20 p-6 rounded-2xl bg-gradient-to-br from-base-100 to-base-200 shadow-xl border border-base-300"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        variants={itemVariants}
      >
        Frequently Asked Questions
      </motion.h2>
      
      <motion.div 
        className="space-y-3"
        variants={containerVariants}
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border border-base-300 rounded-xl bg-base-200/50 backdrop-blur-sm overflow-hidden"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-6 py-4 font-semibold text-lg flex justify-between items-center hover:bg-base-300/50 transition-colors duration-200"
              whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-primary pr-4">{faq.question}</span>
              <motion.div
                variants={iconVariants}
                animate={openIndex === index ? "open" : "closed"}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <svg 
                  className="w-5 h-5 text-primary flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  className="px-6 overflow-hidden"
                  variants={answerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <motion.div 
                    className="pb-4 text-base-content/80 leading-relaxed"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                  >
                    {faq.answer}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Help Section */}
      <motion.div 
        className="mt-8 p-6 bg-primary/10 rounded-xl border border-primary/20 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-xl font-semibold text-primary mb-2">
          Still have questions?
        </h3>
        <p className="text-base-content/70 mb-4">
          We're here to help you get the most out of BrainBand.
        </p>
        <motion.button
          className="btn btn-primary text-white px-6 rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Support
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;