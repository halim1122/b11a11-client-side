import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaFileAlt, FaCheckCircle, FaClock, FaStar, FaComments, FaExternalLinkAlt } from "react-icons/fa";
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
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if(loading) return <div className='flex justify-center items-center min-h-screen'>
    <Loading />
  </div>

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
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
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            My Submitted Assignments
          </motion.h1>
          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
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
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaFileAlt className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{assignments.length}</p>
                  <p className="text-sm text-gray-600">Total Submissions</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaCheckCircle className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {assignments.filter(a => a.status === 'completed').length}
                  </p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <FaClock className="text-yellow-600 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {assignments.filter(a => a.status === 'pending').length}
                  </p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FaComments className="text-purple-600 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {assignments.filter(a => a.feedback && a.feedback !== '--').length}
                  </p>
                  <p className="text-sm text-gray-600">With Feedback</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Assignments List */}
        {assignments.length === 0 ? (
          <motion.div 
            className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaFileAlt className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Assignments Submitted Yet
            </h3>
            <p className="text-gray-500">
              You haven't submitted any assignments. Start by exploring available assignments.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {assignments.map((assignment, index) => (
              <motion.div
                key={assignment._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                        <FaFileAlt className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {assignment.assignmentTitle || "Untitled Assignment"}
                        </h3>
                        <p className="text-gray-500">
                          Submitted on {new Date(assignment.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(assignment.status)}
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold capitalize border ${getStatusColor(assignment.status)}`}>
                        {assignment.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Marks */}
                    <div className="text-center">
                      <p className="text-sm text-gray-600 font-medium mb-2">Marks Obtained</p>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-2xl font-bold text-gray-800">
                          {assignment?.marks ? `${assignment.marks}` : "--"}
                        </p>
                      </div>
                    </div>

                    {/* Submission Link */}
                    <div className="text-center">
                      <p className="text-sm text-gray-600 font-medium mb-2">Submission</p>
                      <a
                        href={assignment.docsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors font-semibold"
                      >
                        <FaExternalLinkAlt />
                        View Submission
                      </a>
                    </div>

                    {/* Feedback */}
                    <div className="text-center md:text-left">
                      <p className="text-sm text-gray-600 font-medium mb-2">Feedback</p>
                      <div className="bg-gray-50 rounded-xl p-4 min-h-[80px]">
                        <p className="text-gray-700">
                          {assignment.feedback && assignment.feedback !== "--" ? assignment.feedback : "No feedback yet"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MySubmittedAssignments;