import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const AttemdedAssignments = () => {
  const { user } = useContext(AuthContext);
  const [myAssignments, setMyAssignments] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/submissions?email=${user.email}`)
      .then((res) => {
        setMyAssignments(res.data);
      })
      .catch((err) => console.error(err));
  }, [user?.email]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
        My Submitted Assignments
      </h2>

      {myAssignments.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full table-auto text-sm md:text-base">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Total Marks</th>
                <th className="p-4 text-left">Obtained</th>
                <th className="p-4 text-left">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {myAssignments.map((assignment) => (
                <tr key={assignment._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4">{assignment.assignmentTitle || "Untitled"}</td>
                  <td className="p-4 capitalize">{assignment.status || "pending"}</td>
                  <td className="p-4">{assignment.marks || "N/A"}</td>
                  <td className="p-4">
                    {assignment.status === "completed"
                      ? assignment.givenMark ?? "0"
                      : "--"}
                  </td>
                  <td className="p-4">
                    {assignment.status === "completed"
                      ? assignment.feedback || "No feedback"
                      : "--"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">You haven’t submitted any assignments yet.</p>
      )}
    </div>
  );
};

export default AttemdedAssignments;
