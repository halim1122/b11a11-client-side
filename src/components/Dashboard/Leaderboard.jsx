import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaTrophy, FaCrown, FaAward, FaMedal, FaUserCircle, FaStar } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../../Auth/Loading";

const Leaderboard = () => {
     const { user } = useContext(AuthContext);
     const [leaderboard, setLeaderboard] = useState([]);
     const [loading, setLoading] = useState(true);
     const [timeRange, setTimeRange] = useState("all"); // all, monthly, weekly

     useEffect(() => {
          setLoading(true);
          axios.get(`${import.meta.env.VITE_API}/submissions`)
               .then(res => {
                    const completedSubmissions = res.data.filter(sub => sub.status === 'completed' && sub.marks);
                    calculateLeaderboard(completedSubmissions);
               })
               .catch(err => {
                    console.error("Failed to fetch submissions:", err);
               })
               .finally(() => {
                    setLoading(false);
               });
     }, [timeRange]);

     const calculateLeaderboard = (submissions) => {
          // Group by user email and calculate total marks
          const userStats = submissions.reduce((acc, submission) => {
               const email = submission.submittedBy;
               if (!acc[email]) {
                    acc[email] = {
                         email: email,
                         totalMarks: 0,
                         submissionCount: 0,
                         averageMarks: 0,
                         submissions: []
                    };
               }
               acc[email].totalMarks += submission.marks;
               acc[email].submissionCount += 1;
               acc[email].submissions.push(submission);
               return acc;
          }, {});

          // Calculate average marks and sort by total marks
          const leaderboardData = Object.values(userStats)
               .map(user => ({
                    ...user,
                    averageMarks: user.totalMarks / user.submissionCount
               }))
               .sort((a, b) => b.totalMarks - a.totalMarks)
               .slice(0, 20); // Top 20

          setLeaderboard(leaderboardData);
     };

     const getRankIcon = (rank) => {
          switch (rank) {
               case 0:
                    return <FaCrown className="text-yellow-500 text-2xl" />;
               case 1:
                    return <FaTrophy className="text-gray-400 text-xl" />;
               case 2:
                    return <FaMedal className="text-orange-500 text-lg" />;
               default:
                    return <FaAward className="text-blue-500" />;
          }
     };

     const getRankColor = (rank) => {
          switch (rank) {
               case 0:
                    return "from-yellow-400 to-yellow-600";
               case 1:
                    return "from-gray-400 to-gray-600";
               case 2:
                    return "from-orange-400 to-orange-600";
               default:
                    return "from-blue-400 to-blue-600";
          }
     };

     if (loading) return (
          <div className="flex justify-center items-center min-h-screen">
               <Loading />
          </div>
     );

     return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
               <Helmet>
                    <title>Leaderboard - BrainBand</title>
               </Helmet>

               <motion.div
                    className="max-w-6xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
               >
                    {/* Header Section */}
                    <div className="text-center mb-8">
                         <motion.div
                              className="inline-flex items-center gap-4 mb-6"
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                         >
                              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                                   <FaTrophy className="text-white text-2xl" />
                              </div>
                              <div>
                                   <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                                        Leaderboard
                                   </h1>
                                   <p className="text-gray-600 text-lg mt-2">
                                        Top performers based on assignment marks
                                   </p>
                              </div>
                         </motion.div>

                         {/* Time Range Filter */}
                         <motion.div
                              className="flex justify-center gap-2 mb-8"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                         >
                              {["all", "monthly", "weekly"].map((range) => (
                                   <button
                                        key={range}
                                        onClick={() => setTimeRange(range)}
                                        className={`px-6 py-2 rounded-full font-semibold capitalize transition-all ${timeRange === range
                                                  ? "bg-blue-600 text-white shadow-lg"
                                                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                             }`}
                                   >
                                        {range}
                                   </button>
                              ))}
                         </motion.div>
                    </div>

                    {/* Top 3 Podium */}
                    {leaderboard.length >= 3 && (
                         <motion.div
                              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end"
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                         >
                              {/* 2nd Place */}
                              <motion.div
                                   className="flex flex-col items-center order-2 md:order-1"
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ delay: 0.5 }}
                              >
                                   <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center shadow-lg mb-4">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                             <FaUserCircle className="text-gray-400 text-3xl" />
                                        </div>
                                   </div>
                                   <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-200 w-full">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                             <FaTrophy className="text-gray-500" />
                                             <span className="font-bold text-gray-700">2nd</span>
                                        </div>
                                        <h3 className="font-bold text-gray-800 text-lg mb-1 truncate">
                                             {leaderboard[1]?.email || "N/A"}
                                        </h3>
                                        <div className="text-2xl font-bold text-gray-700 mb-2">
                                             {leaderboard[1]?.totalMarks || 0}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                             {leaderboard[1]?.submissionCount || 0} submissions
                                        </div>
                                   </div>
                              </motion.div>

                              {/* 1st Place - Higher Position */}
                              <motion.div
                                   className="flex flex-col items-center order-1 md:order-2"
                                   initial={{ opacity: 0, y: -30 }}
                                   animate={{ opacity: 1, y: -15 }}
                                   transition={{ delay: 0.6 }}
                              >
                                   <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl mb-4">
                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                                             <FaCrown className="text-yellow-500 text-3xl" />
                                        </div>
                                   </div>
                                   <div className="text-center bg-white rounded-2xl p-6 shadow-2xl border-2 border-yellow-200 w-full relative -top-8">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                             <FaCrown className="text-yellow-500" />
                                             <span className="font-bold text-yellow-700">1st</span>
                                        </div>
                                        <h3 className="font-bold text-gray-800 text-xl mb-1 truncate">
                                             {leaderboard[0]?.email || "N/A"}
                                        </h3>
                                        <div className="text-3xl font-bold text-yellow-600 mb-2">
                                             {leaderboard[0]?.totalMarks || 0}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                             {leaderboard[0]?.submissionCount || 0} submissions
                                        </div>
                                   </div>
                              </motion.div>

                              {/* 3rd Place */}
                              <motion.div
                                   className="flex flex-col items-center order-3"
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ delay: 0.5 }}
                              >
                                   <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg mb-4">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                             <FaUserCircle className="text-orange-400 text-3xl" />
                                        </div>
                                   </div>
                                   <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-200 w-full">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                             <FaMedal className="text-orange-500" />
                                             <span className="font-bold text-orange-700">3rd</span>
                                        </div>
                                        <h3 className="font-bold text-gray-800 text-lg mb-1 truncate">
                                             {leaderboard[2]?.email || "N/A"}
                                        </h3>
                                        <div className="text-2xl font-bold text-orange-600 mb-2">
                                             {leaderboard[2]?.totalMarks || 0}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                             {leaderboard[2]?.submissionCount || 0} submissions
                                        </div>
                                   </div>
                              </motion.div>
                         </motion.div>
                    )}

                    {/* Leaderboard List */}
                    <motion.div
                         className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.7 }}
                    >
                         {/* Header */}
                         <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                              <h2 className="text-2xl font-bold text-white text-center">
                                   Top Performers
                              </h2>
                         </div>

                         {/* List */}
                         <div className="divide-y divide-gray-200">
                              {leaderboard.length === 0 ? (
                                   <div className="text-center py-12">
                                        <FaTrophy className="text-gray-300 text-4xl mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                             No Submissions Yet
                                        </h3>
                                        <p className="text-gray-500">
                                             Complete some assignments to appear on the leaderboard!
                                        </p>
                                   </div>
                              ) : (
                                   leaderboard.map((student, index) => (
                                        <motion.div
                                             key={student.email}
                                             className={`p-6 hover:bg-gray-50 transition-colors ${index < 3 ? "bg-gradient-to-r from-blue-50 to-purple-50" : ""
                                                  }`}
                                             initial={{ opacity: 0, x: -20 }}
                                             animate={{ opacity: 1, x: 0 }}
                                             transition={{ delay: 0.8 + index * 0.1 }}
                                        >
                                             <div className="flex items-center gap-4">
                                                  {/* Rank */}
                                                  <div className="flex items-center gap-3">
                                                       <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${getRankColor(index)}`}>
                                                            <span className="text-white font-bold text-lg">
                                                                 {index + 1}
                                                            </span>
                                                       </div>
                                                       {getRankIcon(index)}
                                                  </div>

                                                  {/* User Info */}
                                                  <div className="flex-1">
                                                       <div className="flex items-center gap-3">
                                                            <FaUserCircle className="text-gray-400 text-2xl" />
                                                            <div>
                                                                 <h3 className="font-semibold text-gray-800 text-lg">
                                                                      {student.email}
                                                                 </h3>
                                                                 <p className="text-gray-500 text-sm">
                                                                      {student.submissionCount} assignments completed
                                                                 </p>
                                                            </div>
                                                       </div>
                                                  </div>

                                                  {/* Marks */}
                                                  <div className="text-right">
                                                       <div className="flex items-center gap-2 justify-end mb-1">
                                                            <FaStar className="text-yellow-500" />
                                                            <span className="text-2xl font-bold text-gray-800">
                                                                 {student.totalMarks}
                                                            </span>
                                                       </div>
                                                       <div className="text-sm text-gray-500">
                                                            Avg: {student.averageMarks.toFixed(1)}
                                                       </div>
                                                  </div>
                                             </div>
                                        </motion.div>
                                   ))
                              )}
                         </div>
                    </motion.div>

                    {/* Current User Stats */}
                    {user && (
                         <motion.div
                              className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1 }}
                         >
                              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                                   Your Position
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                   <div className="bg-blue-50 rounded-xl p-4">
                                        <div className="text-2xl font-bold text-blue-600">
                                             #{leaderboard.findIndex(s => s.email === user.email) + 1 || "N/A"}
                                        </div>
                                        <div className="text-sm text-blue-600 font-medium">Your Rank</div>
                                   </div>
                                   <div className="bg-green-50 rounded-xl p-4">
                                        <div className="text-2xl font-bold text-green-600">
                                             {leaderboard.find(s => s.email === user.email)?.totalMarks || 0}
                                        </div>
                                        <div className="text-sm text-green-600 font-medium">Total Marks</div>
                                   </div>
                                   <div className="bg-purple-50 rounded-xl p-4">
                                        <div className="text-2xl font-bold text-purple-600">
                                             {leaderboard.find(s => s.email === user.email)?.submissionCount || 0}
                                        </div>
                                        <div className="text-sm text-purple-600 font-medium">Submissions</div>
                                   </div>
                              </div>
                         </motion.div>
                    )}
               </motion.div>
          </div>
     );
};

export default Leaderboard;