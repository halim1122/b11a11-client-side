import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import GiveMarkModal from "./GiveMarkModal";
import { Helmet } from "react-helmet-async";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaClock, FaUser, FaFileAlt, FaStar, FaCheckCircle } from "react-icons/fa";
import Loading from "../Auth/Loading";

const PendingAssignments = () => {
  const { user } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axios.get(`${import.meta.env.VITE_API}/submissions?status=pending`)
      .then(res => {
        setSubmissions(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch submissions:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  if (!user?.email) return <div className="flex justify-center items-center ">
    <Loading />
  </div>;

  if(loading) return <div className="flex justify-center items-center ">
    <Loading />
  </div>;

  const pendingSubmissions = submissions.filter(sub => sub.submittedBy !== user.email);
  const mySubmissions = submissions.filter(sub => sub.submittedBy === user.email);
console.log(submissions)
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <Helmet>
        <title>Pending Assignments - BrainBand</title>
      </Helmet>

      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-xl flex items-center justify-center">
              <FaClock className="text-yellow-600 dark:text-yellow-400 text-xl" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
              Pending Assignments
            </h1>
          </motion.div>
          <motion.p
            className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Review and evaluate assignments submitted by other students
          </motion.p>
        </div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                <FaFileAlt className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{submissions.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Pending</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                <FaCheckCircle className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{pendingSubmissions.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Available for Review</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center">
                <FaUser className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{mySubmissions.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your Submissions</p>
              </div>
            </div>
          </div>
        </motion.div>

        {loading && submissions.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaClock className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No Pending Assignments
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              There are currently no assignments waiting for evaluation.
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary to-secondary">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold whitespace-nowrap">
                      Assignment Details
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold whitespace-nowrap">
                      Total Marks
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold whitespace-nowrap">
                      Submitted By
                    </th>
                    <th className="px-6 py-4 text-center text-white font-semibold whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {submissions.map((sub, index) => (
                    <motion.tr
                      key={sub._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                            <FaFileAlt className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-gray-200">
                              {sub.assignmentTitle || "Untitled Assignment"}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Submitted on {new Date(sub.submissionDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                          <FaStar className="text-yellow-500 text-sm" />
                          <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {sub.marks || "N/A"}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                            <FaUser className="text-purple-600 dark:text-purple-400 text-sm" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {sub.submittedBy || "Unknown"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {sub.submittedBy !== user.email ? (
                          <motion.button
                            onClick={() => setSelected(sub)}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Evaluate
                          </motion.button>
                        ) : (
                          <span className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-3 py-2 rounded-lg text-sm">
                            <FaUser className="text-sm" />
                            Your Submission
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {selected && (
          <GiveMarkModal
            submission={selected}
            setSelected={setSelected}
            refreshData={() => {
              setSubmissions(prev => prev.filter(sub => sub._id !== selected._id));
              setSelected(null);
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default PendingAssignments;