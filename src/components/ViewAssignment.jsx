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
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!docLink.trim()) {
      return Swal.fire("Error", "Google Docs link is required", "error");
    }

    setSubmitting(true);

    const submissionData = {
      assignmentId: _id,
      assignmentTitle: title,
      submittedBy: user?.email,
      docsLink: docLink.trim(),
      note,
      status: "pending",
      submittedAt: new Date(),
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/submissions`,
        submissionData
      );
      if (res.data.insertedId) {
        Swal.fire("Success!", "Assignment submitted successfully!", "success");
        setOpen(false);
        setDocLink("");
        setNote("");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Submission failed. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Helmet>
        <title>{title} | Assignment Details</title>
      </Helmet>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-primary hover:underline transition"
      >
        <FaArrowLeft /> Back
      </button>

      {/* Assignment details card */}
      <div className="bg-base-100 rounded-2xl shadow-md flex flex-col lg:flex-row overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full lg:w-1/2 h-64 lg:h-auto object-cover"
        />
        <div className="p-6 lg:p-8 flex flex-col justify-between flex-1">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-4">{title}</h1>
            <div className="mb-4 space-y-2 text-base-content">
              <p><strong>Marks:</strong> {marks}</p>
              <p><strong>Level:</strong> {level}</p>
              <p><strong>Due Date:</strong> {dueDate}</p>
              <p className="text-justify"><strong>description:</strong><br /> {description}</p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <FaUserCircle className="text-2xl text-primary" />
              <div>
                <p className="font-semibold">{creatorName}</p>
                <p className="text-sm text-base-content/60">{creatorEmail}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="mt-6 btn btn-primary w-full sm:w-auto"
          >
            Take Assignment
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-base-100 p-6 rounded-xl max-w-lg w-full relative shadow-lg">
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
                className="input input-bordered w-full"
              />
              <textarea
                placeholder="Quick Note"
                rows="4"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="textarea textarea-bordered w-full"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${submitting ? "loading" : ""}`}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit"}
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
