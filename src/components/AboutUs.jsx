import { FaGithub, FaGlobe, FaLinkedin, FaCode, FaLaptopCode, FaProjectDiagram } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
     return (
          <div className="min-h-screen bg-gray-50  py-8 px-4">
               <Helmet>
                    <title>About Developer - BrainBand</title>
               </Helmet>

               <motion.div
                    className="max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
               >
                    {/* Header Section */}
                    <div className="text-center mb-12">
                         <motion.h1
                              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                         >
                              About the Developer
                         </motion.h1>
                         <motion.p
                              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                         >
                              Meet the passionate developer behind BrainBand learning platform
                         </motion.p>
                    </div>

                    {/* Developer Card */}
                    <motion.div
                         className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-8"
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.4 }}
                    >
                         <div className="flex flex-col md:flex-row gap-8 items-center">
                              {/* Developer Image */}
                              <motion.div
                                   className="flex-shrink-0"
                                   whileHover={{ scale: 1.05 }}
                                   transition={{ type: "spring", stiffness: 300 }}
                              >
                                   <img
                                        src="https://i.ibb.co/Wpd8P66D/193255466.jpg"
                                        alt="Md Abdul Halim"
                                        className="w-40 h-40 rounded-full border-4 border-blue-500 dark:border-blue-400 shadow-lg object-cover"
                                   />
                              </motion.div>

                              {/* Developer Info */}
                              <div className="flex-1 text-center md:text-left">
                                   <motion.h2
                                        className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                   >
                                        Md Abdul Halim
                                   </motion.h2>
                                   <motion.div
                                        className="flex items-center justify-center md:justify-start gap-2 mb-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                   >
                                        <FaCode className="text-blue-500 text-lg" />
                                        <span className="text-blue-500 dark:text-blue-400 font-medium">Full Stack Developer</span>
                                   </motion.div>
                                   <motion.p
                                        className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                   >
                                        A passionate full-stack web developer from Bangladesh with expertise in building
                                        dynamic, responsive, and scalable web applications using the MERN stack.
                                        Dedicated to creating innovative solutions and exceptional user experiences.
                                   </motion.p>

                                   {/* Stats */}
                                   <motion.div
                                        className="flex flex-wrap gap-4 justify-center md:justify-start mb-6"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                   >
                                        <div className="bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-800">
                                             <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                                                  Total Projects: <span className="text-gray-800 dark:text-gray-200">12+</span>
                                             </p>
                                        </div>
                                        <div className="bg-green-50 dark:bg-green-900/30 px-4 py-2 rounded-lg border border-green-200 dark:border-green-800">
                                             <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                                                  Experience: <span className="text-gray-800 dark:text-gray-200">2+ Years</span>
                                             </p>
                                        </div>
                                   </motion.div>

                                   {/* Social Links */}
                                   <motion.div
                                        className="flex justify-center md:justify-start gap-6 text-2xl"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.9 }}
                                   >
                                        <a
                                             href="https://github.com/halim1122"
                                             target="_blank"
                                             rel="noreferrer"
                                             className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 transform hover:scale-110"
                                             title="GitHub"
                                        >
                                             <FaGithub />
                                        </a>
                                        <a
                                             href="https://linkedin.com/in/halimdev"
                                             target="_blank"
                                             rel="noreferrer"
                                             className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                                             title="LinkedIn"
                                        >
                                             <FaLinkedin />
                                        </a>
                                        <a
                                             href="https://twitter.com/halimdev"
                                             target="_blank"
                                             rel="noreferrer"
                                             className="text-gray-600 dark:text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                                             title="Twitter"
                                        >
                                             <FaSquareTwitter />
                                        </a>
                                        <a
                                             href="https://halimdev-portfolio.netlify.app"
                                             target="_blank"
                                             rel="noreferrer"
                                             className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-300 transform hover:scale-110"
                                             title="Portfolio"
                                        >
                                             <FaGlobe />
                                        </a>
                                   </motion.div>
                              </div>
                         </div>
                    </motion.div>

                    {/* Featured Projects */}
                    <motion.div
                         className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8"
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 1.0 }}
                    >
                         <motion.div
                              className="flex items-center gap-3 mb-6"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1.1 }}
                         >
                              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                                   <FaProjectDiagram className="text-purple-600 dark:text-purple-400 text-lg" />
                              </div>
                              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Featured Projects</h3>
                         </motion.div>

                         <div className="space-y-4">
                              {[
                                   {
                                        name: "Tour Haven - Travel Booking Web App",
                                        url: "https://tour-haven.netlify.app",
                                        description: "A comprehensive travel booking platform with real-time availability and secure payments"
                                   },
                                   {
                                        name: "ParcelXpress - Courier Delivery Platform",
                                        url: "https://parcelxpress.netlify.app",
                                        description: "Modern courier service platform with tracking and management features"
                                   },
                                   {
                                        name: "AssignmentHubBD - Student Assignment System",
                                        url: "https://assignmenthubbd.netlify.app",
                                        description: "Collaborative assignment submission and grading platform for students"
                                   }
                              ].map((project, index) => (
                                   <motion.a
                                        key={index}
                                        href={project.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 group hover:shadow-lg"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.2 + index * 0.1 }}
                                        whileHover={{ x: 5 }}
                                   >
                                        <div className="flex items-center gap-3">
                                             <FaLaptopCode className="text-blue-500 text-xl group-hover:scale-110 transition-transform duration-300" />
                                             <div className="flex-1">
                                                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                       {project.name}
                                                  </h4>
                                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                       {project.description}
                                                  </p>
                                             </div>
                                             <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                  ↗
                                             </div>
                                        </div>
                                   </motion.a>
                              ))}
                         </div>

                         {/* Skills Section */}
                         <motion.div
                              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1.5 }}
                         >
                              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Technical Skills</h4>
                              <div className="flex flex-wrap gap-2">
                                   {["React", "Node.js", "Express", "MongoDB", "JavaScript", "TypeScript", "Tailwind CSS", "Firebase", "Git"].map((skill, index) => (
                                        <motion.span
                                             key={skill}
                                             className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                                             initial={{ opacity: 0, scale: 0 }}
                                             animate={{ opacity: 1, scale: 1 }}
                                             transition={{ delay: 1.6 + index * 0.1 }}
                                        >
                                             {skill}
                                        </motion.span>
                                   ))}
                              </div>
                         </motion.div>
                    </motion.div>
               </motion.div>
          </div>
     );
};

export default AboutUs;