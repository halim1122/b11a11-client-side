import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaFileAlt, FaCheckCircle, FaClock, FaStar, FaComments } from "react-icons/fa";
import Loading from "../Auth/Loading";

const MySubmittedAssignments = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API}/submissions`, {
        headers: {
          authorization: `Bearer ${user?.accessToken}`
        },
        params: {
          submittedBy: user.email,
        }
      })
      .then((res) => {
        setAssignments(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch submissions:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'reviewed':
        return <FaStar className="text-blue-500" />;
      default:
        return <FaFileAlt className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

 if(loading) return <div className='flex justify-center items-center'>
    <Loading />
  </div>
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <Helmet>
        <title>My Submitted Assignments - BrainBand</title>
      </Helmet>

      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            My Submitted Assignments
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Track all your submitted assignments and their evaluation status
          </motion.p>
        </div>

        {/* Stats Cards */}
        {assignments.length > 0 && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <FaFileAlt className="text-blue-600 dark:text-blue-400 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{assignments.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Submissions</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <FaCheckCircle className="text-green-600 dark:text-green-400 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {assignments.filter(a => a.status === 'completed').length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <FaClock className="text-yellow-600 dark:text-yellow-400 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {assignments.filter(a => a.status === 'pending').length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <FaComments className="text-purple-600 dark:text-purple-400 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {assignments.filter(a => a.feedback && a.feedback !== '--').length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">With Feedback</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Assignments Table */}
        {loading && assignments.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaFileAlt className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No Assignments Submitted Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              You haven't submitted any assignments. Start by exploring available assignments.
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
                      Assignment Title
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold whitespace-nowrap">
                      Total Marks
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold whitespace-nowrap">
                      Feedback
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {assignments.map((assignment, index) => (
                    <motion.tr
                      key={assignment._id}
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
                              {assignment.assignmentTitle || "Untitled Assignment"}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Submitted on {new Date(assignment.submissionDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(assignment.status)}
                          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(assignment.status)}`}>
                            {assignment.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {assignment?.marks ?? "--"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
                            {assignment.feedback && assignment.feedback !== "--" ? assignment.feedback : "No feedback yet"}
                          </p>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MySubmittedAssignments;