import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import GiveMarkModal from "./GiveMarkModal";
import { Helmet } from "react-helmet-async";
import Loading from '../Auth/Loading';

const PendingAssignments = () => {
  const { user } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!user?.email) return; // Avoid rendering Loading inside useEffect

    axios.get(`${import.meta.env.VITE_API}/submissions?status=pending`)
      .then(res => {
        setSubmissions(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch submissions:", err);
      });
  }, [user]);

  if (!user?.email) return <Loading />; // Show loading while user data is loading

  return (
    <div className="max-w-[2100px] min-h-screen mx-auto px-4 py-10">
      <Helmet>
        <title>Pending Assignments</title>
      </Helmet>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-6 text-center sm:text-left">
        Pending Assignments
      </h2>

      {submissions.length > 0 ? (
        <div className="overflow-x-auto bg-base-100 border border-gray-300 shadow rounded-lg">
          <table className="min-w-full table-auto text-sm sm:text-base">
            <thead className="bg-primary text-primary-content">
              <tr>
                <th className="p-3 sm:p-4 text-left">Title</th>
                <th className="p-3 sm:p-4 text-left">Marks</th>
                <th className="p-3 sm:p-4 text-left">Examinee</th>
                <th className="p-3 sm:p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr
                  key={sub._id}
                  className="border-b hover:bg-base-200 transition-all"
                >
                  <td className="p-3 sm:p-4">{sub.assignmentTitle ?? "Untitled"}</td>
                  <td className="p-3 sm:p-4">{sub.marks ?? "N/A"}</td>
                  <td className="p-3 sm:p-4 break-words">{sub.submittedBy ?? "Unknown"}</td>
                  <td className="p-3 sm:p-4 text-center">
                    {sub.submittedBy !== user.email ? (
                      <button
                        onClick={() => setSelected(sub)}
                        className="btn btn-success btn-sm"
                      >
                        Give Mark
                      </button>
                    ) : (
                      <span className="text-gray-400 italic text-sm">Own Submission</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">No pending assignments found.</p>
      )}

      {selected && (
        <GiveMarkModal
          submission={selected}
          setSelected={setSelected}
          refreshData={() => {
            setSubmissions(prev => prev.filter(sub => sub._id !== selected._id));
            setSelected(null);
          }}
        />
      )}
    </div>
  );
};

export default PendingAssignments;
