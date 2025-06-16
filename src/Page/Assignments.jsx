import React from 'react';
import { useLoaderData } from 'react-router';
import AssignmentCard from './AssignmentCard';

const Assignments = () => {
     const assignments = useLoaderData();
     //  console.log(assignments)
     return (<div className="py-8 px-4">
          {assignments.length === 0 ? (
               <div className="text-center text-gray-500 text-lg mt-10">
                    ❌ "No assignments available.
               </div>
          ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6">
                    {
                         assignments.map(assignment => (
                              <AssignmentCard
                                   key={assignment._id}
                                   assignment={assignment}
                              />
                         ))
                    }
               </div>
          )}
     </div>

     );
};

export default Assignments;