import React, { useState, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { FaArrowLeft, FaUserCircle, FaStar, FaClock, FaPaperPlane, FaLink, FaStickyNote } from "react-icons/fa";
import { MdAssignment, MdEmojiPeople } from "react-icons/md";
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [docLink, setDocLink] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmission = async (e) => {
    e.preventDefault();

    if (!docLink.trim()) {
      Swal.fire("Error", "Google Docs link is required", "error");
      return;
    }

    setIsSubmitting(true);

    const submissionData = {
      assignmentId: _id,
      assignmentTitle: title,
      submittedBy: user?.email,
      docsLink: docLink.trim(),
      note: note.trim(),
      status: "pending",
      submittedAt: new Date(),
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/submissions`,
        submissionData
      );
      
      if (response.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Assignment submitted successfully!",
          icon: "success",
          confirmButtonColor: "#3B82F6",
          background: "#1F2937",
          color: "white"
        });
        setIsModalOpen(false);
        setDocLink("");
        setNote("");
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire("Error", "Submission failed. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getDifficultyBadge = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <Helmet>
        <title>{title} | Assignment Details</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-x-1 border border-gray-100 group"
          >
            <FaArrowLeft className="text-blue-600 group-hover:text-blue-700 transition-colors" />
            <span className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
              Back to Assignments
            </span>
          </button>
          
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-100">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <MdAssignment className="text-white text-sm" />
            </div>
            <span className="font-semibold text-gray-700">Assignment Details</span>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-2/5 relative group">
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-80 lg:h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <div className={`px-4 py-2 rounded-full border-2 backdrop-blur-sm bg-white/90 ${getDifficultyBadge(level)} font-semibold flex items-center gap-2`}>
                  <FaStar className={getDifficultyColor(level)} />
                  {level}
                </div>
                <div className="px-4 py-2 rounded-full border-2 backdrop-blur-sm bg-white/90 border-blue-200 text-blue-800 font-semibold flex items-center gap-2">
                  <FaClock className="text-blue-600" />
                  {dueDate}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col">
              <div className="flex-1">
                {/* Title */}
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
                  {title}
                </h1>

                {/* Marks & Details */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="bg-blue-50 rounded-2xl px-6 py-4 border-2 border-blue-100">
                    <div className="text-2xl font-bold text-blue-700">{marks}</div>
                    <div className="text-sm text-blue-600 font-medium">Total Marks</div>
                  </div>
                  
                  <div className="bg-green-50 rounded-2xl px-6 py-4 border-2 border-green-100">
                    <div className="text-2xl font-bold text-green-700">{level}</div>
                    <div className="text-sm text-green-600 font-medium">Difficulty</div>
                  </div>
                  
                  <div className="bg-orange-50 rounded-2xl px-6 py-4 border-2 border-orange-100">
                    <div className="text-2xl font-bold text-orange-700">{dueDate}</div>
                    <div className="text-sm text-orange-600 font-medium">Due Date</div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    Assignment Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg bg-gray-50 rounded-2xl p-6 border-2 border-gray-100">
                    {description}
                  </p>
                </div>

                {/* Creator Info */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <MdEmojiPeople className="text-blue-600 text-xl" />
                    Assignment Creator
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <FaUserCircle className="text-white text-3xl" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">{creatorName}</p>
                      <p className="text-gray-600">{creatorEmail}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full lg:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg"
                >
                  <FaPaperPlane className="text-xl" />
                  Take This Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full relative shadow-2xl border border-gray-200 transform animate-slideUp">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-3xl">
              <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-3">
                <FaPaperPlane className="text-xl" />
                Submit Assignment
              </h2>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmission} className="p-6 space-y-6">
              {/* Docs Link Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FaLink className="text-blue-600" />
                  Google Docs Link *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://docs.google.com/document/d/..."
                  value={docLink}
                  onChange={(e) => setDocLink(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                />
              </div>

              {/* Note Textarea */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FaStickyNote className="text-green-600" />
                  Additional Notes (Optional)
                </label>
                <textarea
                  placeholder="Any additional information for the evaluator..."
                  rows="4"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-0.5 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </div>
                  ) : (
                    "Submit Assignment"
                  )}
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