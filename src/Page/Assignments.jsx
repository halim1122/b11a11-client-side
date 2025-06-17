import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import AssignmentCard from './AssignmentCard';
import { Helmet } from 'react-helmet-async';

const Assignments = () => {
  const initialAssignments = useLoaderData();
  const [assignments, setAssignments] = useState(initialAssignments);

  const handleRemove = (id) => {
    const remaining = assignments.filter(item => item._id !== id); // ✅ fixed here
    setAssignments(remaining);
  };

  return (
    <div className="py-8 px-4">
      <Helmet>
                <title>
                     Assignments
                </title>
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
