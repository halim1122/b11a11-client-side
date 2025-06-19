import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router'; // react-router-dom হচ্ছে সঠিক প্যাকেজ
import AssignmentCard from './AssignmentCard';
import { Helmet } from 'react-helmet-async';

const Assignments = () => {
  const loadedAssignments = useLoaderData();
  const [assignments, setAssignments] = useState([]);
  const [allAssignments, setAllAssignments] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (Array.isArray(loadedAssignments)) {
      setAssignments(loadedAssignments);
      setAllAssignments(loadedAssignments);
    } else {
      setAssignments([]);
      setAllAssignments([]);
    }
  }, [loadedAssignments]);

  // level দিয়ে ফিল্টার
  const handleFilterByLevel = (e) => {
    const level = e.target.value;
    if (level === '') {
      setAssignments(allAssignments);
    } else {
      const filtered = allAssignments.filter(item => item.level === level);
      setAssignments(filtered);
    }
  };

  // সার্চ সাবমিট হ্যান্ডলার
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchText.trim()) {
      setAssignments(allAssignments);
      return;
    }
    const filtered = allAssignments.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setAssignments(filtered);
    setSearchText('');
  };

  // ডিলিট হ্যান্ডলার
  const handleRemove = (id) => {
    const remaining = assignments.filter(item => item._id !== id);
    setAssignments(remaining);
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <Helmet>
        <title>Assignments</title>
      </Helmet>
      <h2 className='text-3xl font-bold mb-6 text-center text-primary'>All Assignments</h2>

      <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-6'>
        {/* Level Filter */}
        <select
          onChange={handleFilterByLevel}
          name="level"
          className="select select-bordered w-full max-w-xs"
          defaultValue=""
          aria-label="Filter assignments by level"
        >
          <option value="">All Levels</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        {/* Search Form */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex w-full max-w-lg"
          role="search"
          aria-label="Search assignments"
        >
          <input
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="Search assignments..."
            className="input input-bordered flex-grow rounded-r-none"
          />
          <button
            type="submit"
            className="btn btn-primary rounded-l-none"
            aria-label="Submit search"
          >
            Search
          </button>
        </form>
      </div>

      {/* Assignments Grid */}
      {assignments.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg mt-10">
          ❌ No assignments available.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map(assignment => (
            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
              handleRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Assignments;
