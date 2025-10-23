import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaStar, FaLink, FaStickyNote, FaCheckCircle, FaTimes, FaGraduationCap } from "react-icons/fa";

const GiveMarkModal = ({ submission, setSelected, refreshData }) => {
  const [feedback, setFeedback] = useState("");
  const [givenMark, setGivenMark] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMark = async (e) => {
    e.preventDefault();
    
    if (!givenMark || givenMark < 0) {
      Swal.fire("Error", "Please enter a valid mark", "error");
      return;
    }

    setIsSubmitting(true);

    const updated = {
      feedback,
      marks: parseInt(givenMark),
      status: "completed",
      markedAt: new Date(),
    };

    try {
      const res = await axios.patch(`${import.meta.env.VITE_API}/submissions/${submission._id}`, updated);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Assignment marked successfully!",
          icon: "success",
          confirmButtonColor: "#10B981",
        });
        refreshData();
        setSelected(null);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const maxMarks = 100;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl border border-gray-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-5 rounded-t-2xl sticky top-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FaGraduationCap className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Evaluate Assignment</h2>
                <p className="text-emerald-100 text-sm">Provide marks and feedback</p>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-white text-opacity-80 hover:text-opacity-100 transition-colors p-1 hover:bg-white hover:bg-opacity-10 rounded-full"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Google Docs Link */}
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <FaLink className="text-blue-600" />
              <h3 className="font-semibold text-gray-800 text-sm">Submission Link</h3>
            </div>
            <a
              href={submission.docsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 break-all text-xs bg-white px-2 py-1 rounded-lg border border-blue-200 inline-block hover:shadow-sm transition-shadow"
            >
              {submission.docsLink}
            </a>
          </div>

          {/* Student Note */}
          {submission.note && (
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
              <div className="flex items-center gap-2 mb-2">
                <FaStickyNote className="text-amber-600" />
                <h3 className="font-semibold text-gray-800 text-sm">Student's Note</h3>
              </div>
              <p className="text-gray-700 text-xs bg-white px-2 py-1 rounded-lg border border-amber-200">
                {submission.note}
              </p>
            </div>
          )}

          {/* Assignment Info */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
              <p className="text-xs text-gray-600 font-medium">Assignment</p>
              <p className="text-sm font-semibold text-gray-800 truncate">{submission.assignmentTitle}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
              <p className="text-xs text-gray-600 font-medium">Submitted By</p>
              <p className="text-sm font-semibold text-gray-800 truncate">{submission.submittedBy}</p>
            </div>
          </div>

          {/* Marking Form */}
          <form onSubmit={handleMark} className="space-y-4">
            {/* Marks Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaStar className="text-yellow-500" />
                Award Marks (0-{maxMarks})
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max={maxMarks}
                  required
                  placeholder={`Enter marks out of ${maxMarks}`}
                  value={givenMark}
                  onChange={(e) => setGivenMark(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 transition-all duration-200 outline-none text-base font-semibold"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm font-medium">
                  / {maxMarks}
                </div>
              </div>
            </div>

            {/* Progress indicator for marks */}
            {givenMark && (
              <div className="space-y-1">
                <div className="bg-gray-100 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-green-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${(givenMark / maxMarks) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>{maxMarks}</span>
                </div>
              </div>
            )}

            {/* Feedback Textarea */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaCheckCircle className="text-emerald-500" />
                Evaluation Feedback
              </label>
              <textarea
                rows="3"
                placeholder="Provide constructive feedback to help the student improve..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 transition-all duration-200 outline-none resize-none text-sm"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
              >
                <FaTimes />
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-200 flex items-center justify-center gap-2 text-sm ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Marking...
                  </>
                ) : (
                  <>
                    <FaCheckCircle />
                    Submit
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GiveMarkModal;