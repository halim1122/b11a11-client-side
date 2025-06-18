import React, { useState, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const ViewAssignment = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const {
    _id,
    title,
    description,
    thumbnail,
    marks,
    level,
    dueDate,
    creatorEmail,
    creatorName,
  } = data;

  const [open, setOpen] = useState(false);
  const [docLink, setDocLink] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      assignmentId: _id,
      assignmentTitle: title,
      submittedBy: user?.email,
      docsLink: docLink,
      note,
      status: "pending",
      submittedAt: new Date(),
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/submissions`, submissionData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Assignment submitted successfully!", "success");
        setOpen(false);
        setDocLink("");
        setNote("");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Submission failed", "error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
     <Helmet>
               <title>
                    view-assignments
               </title>
          </Helmet>
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-primary hover:underline"
      >
        <FaArrowLeft /> Back
      </button>

      {/* Assignment details */}
      <div className="bg-white rounded-2xl shadow-md flex flex-col lg:flex-row">
        <img
          src={thumbnail}
          alt={title}
          className="w-full lg:w-1/2 object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-t-none"
        />
        <div className="p-6 lg:p-8 flex-1">
          <h1 className="text-3xl font-bold text-primary mb-4">{title}</h1>
          <div className="mb-4 space-y-2">
            <p><strong>Marks:</strong> {marks}</p>
            <p><strong>Level:</strong> {level}</p>
            <p><strong>Due Date:</strong> {dueDate}</p>
            <p className="text-gray-700">{description}</p>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <FaUserCircle className="text-2xl text-primary" />
            <div>
              <p className="font-semibold">{creatorName}</p>
              <p className="text-sm text-gray-500">{creatorEmail}</p>
            </div>
          </div>

          {/* Take Assignment Button */}
          <button
            onClick={() => setOpen(true)}
            className="mt-6 px-5 py-2 bg-primary text-white rounded hover:bg-indigo-800 transition"
          >
            Take Assignment
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-lg w-full relative">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Submit Assignment
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="url"
                required
                placeholder="Google Docs Link"
                value={docLink}
                onChange={(e) => setDocLink(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
              <textarea
                placeholder="Quick Note"
                rows="4"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-white rounded hover:bg-indigo-800"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAssignment;
