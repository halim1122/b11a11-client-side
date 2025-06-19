import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const MySubmittedAssignments = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`${import.meta.env.VITE_API}/submissions`,{
        headers: {
          authorization: `Bearer ${user?.accessToken}`
        }
      }, {
        params: {
          submittedBy: user.email,  // user এর সাবমিশন আনতে
        }
      })
      .then((res) => {
        setAssignments(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch submissions:", err);
      });
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto p-4">
  <Helmet>
    <title>my-submitted-assignments</title>
  </Helmet>

  <h2 className="text-2xl font-bold mb-6 text-primary">
    My Submitted Assignments
  </h2>

  {assignments.length > 0 ? (
    <div className="overflow-x-auto bg-base-100 border border-gray-300 shadow rounded-lg">
      <table className="table w-full table-zebra">
        <thead className="bg-primary text-primary-content">
          <tr>
            <th className="p-3 text-left whitespace-nowrap">Title</th>
            <th className="p-3 text-left whitespace-nowrap">Status</th>
            <th className="p-3 text-left whitespace-nowrap">Total Marks</th>
            <th className="p-3 text-left whitespace-nowrap">Obtained Marks</th>
            <th className="p-3 text-left whitespace-nowrap">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr
              key={assignment._id}
              className="hover:bg-base-200 transition-all"
            >
              <td className="p-3">
                {assignment.assignmentTitle || "Untitled"}
              </td>
              <td className="p-3 capitalize">{assignment.status}</td>
              <td className="p-3">{assignment.marks ?? "--"}</td>
              <td className="p-3">{assignment.givenMark ?? "--"}</td>
              <td className="p-3">{assignment.feedback ?? "--"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-base-content/50">No submitted assignments found.</p>
  )}
</div>
  );
};

export default MySubmittedAssignments;
