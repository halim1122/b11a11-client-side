import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AssignmentCard from './AssignmentCard';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '../components/LoadingSpinner';

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

  return (
    <div className="py-8 px-4 max-w-full min-h-screen mx-auto">
      <Helmet>
        <title>Assignments</title>
      </Helmet>
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">All Assignments</h2>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <select
          onChange={handleFilterByLevel}
          value={level}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="">All Levels</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <form onSubmit={handleSearchSubmit} className="flex w-full max-w-lg">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search assignments..."
            className="input input-bordered flex-grow rounded-r-none"
          />
          <button type="submit" className="btn btn-primary rounded-l-none">
            Search
          </button>
        </form>
      </div>

      {loading ? (
       <LoadingSpinner/>
      ) : assignments.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg mt-10">
          ❌ No assignments available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
              handleRemove={handleRemove}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          disabled={page === 1}
          onClick={() => fetchAssignments(page - 1)}
          className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => fetchAssignments(i + 1)}
            className={`px-3 py-1 rounded border ${
              page === i + 1 ? 'bg-blue-500 text-white' : 'border-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => fetchAssignments(page + 1)}
          className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Assignments;
