import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AssignmentCard from './AssignmentCard';
import { Helmet } from 'react-helmet-async';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaBook } from 'react-icons/fa';
import Loading from '../Auth/Loading';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [level, setLevel] = useState('');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAssignments = async (currentPage = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API}/assignments`, {
        params: {
          page: currentPage,
          limit,
          level,
          search: searchText
        }
      });

      setAssignments(res.data.data || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
      setPage(currentPage);
    } catch (error) {
      console.error('Failed to fetch assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments(page);
  }, [page, level]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchAssignments(1);
  };

  const handleFilterByLevel = (e) => {
    setLevel(e.target.value);
    setPage(1);
  };

  const handleRemove = (id) => {
    setAssignments((prev) => prev.filter((a) => a._id !== id));
  };
  if(loading) return <div className='flex justify-center items-center'>
    <Loading />
  </div>
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 ">
      <Helmet>
        <title>All Assignments - BrainBand</title>
      </Helmet>

      <motion.div
        className=" mx-auto"
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
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
              <FaBook className="text-blue-600 dark:text-blue-400 text-xl" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
              All Assignments
            </h1>
          </motion.div>
          <motion.p
            className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Explore and discover amazing assignments to enhance your learning experience
          </motion.p>
        </div>

        {/* Search and Filter Section */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Filter */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <FaFilter className="text-gray-400" />
              <select
                onChange={handleFilterByLevel}
                value={level}
                className="select select-bordered bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 w-full lg:w-48"
              >
                <option value="">All Difficulty Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="flex w-full lg:w-96">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search assignments by title..."
                  className="input input-bordered w-full pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-r-none"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                type="submit"
                className="btn bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 text-white rounded-l-none px-6"
              >
                Search
              </button>
            </form>
          </div>
        </motion.div>

        {/* Assignments Grid */}
        {loading && assignments.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBook className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No Assignments Found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              {searchText || level
                ? "Try adjusting your search or filter criteria"
                : "No assignments available at the moment"}
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {assignments.map((assignment) => (
                <AssignmentCard
                  key={assignment._id}
                  assignment={assignment}
                  handleRemove={handleRemove}
                />
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                className="flex justify-center items-center gap-2 my-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <button
                  disabled={page === 1}
                  onClick={() => fetchAssignments(page - 1)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => fetchAssignments(i + 1)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      page === i + 1
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={page === totalPages}
                  onClick={() => fetchAssignments(page + 1)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Assignments;