import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router'; // ✅ make sure you're using 'react-router-dom'
import AssignmentCard from './AssignmentCard';
import { Helmet } from 'react-helmet-async';

const Assignments = () => {
  const loadedAssignments = useLoaderData(); // loader থেকে পাওয়া ডেটা
  const [assignments, setAssignments] = useState([]);
  const [allAssignments, setAllAssignments] = useState([]);
  const [searchText,setSearchText] = useState('');

  useEffect(() => {
    if (Array.isArray(loadedAssignments)) {
      setAssignments(loadedAssignments);
      setAllAssignments(loadedAssignments); // backup রাখছি সার্চের জন্য
    } else {
      setAssignments([]);
    }
  }, [loadedAssignments]);

  const handleSearch = (e) => {
    const level = e.target.value;

    if (level === "") {
      setAssignments(allAssignments);
    } else {
      const filtered = allAssignments.filter(item => item.level === level);
      setAssignments(filtered);
    }
  };


  const handleRemove = (id) => {
    const remaining = assignments.filter(item => item._id !== id);
    setAssignments(remaining);
  };

  const handleSearchs = (e, text) => {
          e.preventDefault();
          const searchAssignments = assignments.filter(itme => itme.title.toLowerCase().includes(text.toLowerCase())
          )
          setAssignments(searchAssignments);
     }

  return (
    <div className="py-8 px-4">
      <h2 className='text-2xl font-bold mb-4 text-center text-[#342995]'>All Assignment</h2>
      <div className='md:flex justify-between items-center'>
        <select onClick={handleSearch}
          name="level"
          className="select select-bordered md:ml-5"
          defaultValue="all"
          required
        >
          <option value="">All</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <form onSubmit={(e) => {
          handleSearchs(e, searchText);
          setSearchText('');
        }} className=' lg:flex-row hidden md:flex items-center justify-center my-4'>
          <input value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className='bg-white text-gray-400 border border-gray-400 lg:w-[500px] rounded-l-full pl-4 py-[6px] ' placeholder='Search any assignment...' type="text" />
          <button className='btn bg-[#176AE5] text-white rounded-r-full md:py-3 md:px-7'><input type="submit" value="Search Now" /></button>
        </form>
      </div>
      <Helmet>
        <title>Assignments</title>
      </Helmet>

      {assignments.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-10">
          ❌ No assignments available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6">
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
