import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const GiveMarkModal = ({ submission, setSelected, refreshData }) => {
  const [feedback, setFeedback] = useState("");
  const [givenMark, setGivenMark] = useState("");

  const handleMark = async (e) => {
    e.preventDefault();

    const updated = {
      feedback,
      marks: parseInt(givenMark),
      status: "completed",
      markedAt: new Date(),
    };

    try {
      const res = await axios.patch(`http://localhost:3000/submissions/${submission._id}`, updated);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Assignment marked successfully!", "success");
        refreshData();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md sm:max-w-lg p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4 text-primary">Mark Assignment</h2>
        <div className="text-sm sm:text-base space-y-2">
          <p>
            <strong>Google Docs:</strong>{" "}
            <a href={submission.docsLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">
              View Document
            </a>
          </p>
          <p><strong>Note:</strong> {submission.note || "No notes provided."}</p>
        </div>

        <form onSubmit={handleMark} className="mt-4 space-y-3">
          <input
            type="number"
            required
            placeholder="Enter marks"
            value={givenMark}
            onChange={(e) => setGivenMark(e.target.value)}
            className="w-full px-4 py-2 border rounded text-sm sm:text-base"
          />
          <textarea
            rows="3"
            placeholder="Feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full px-4 py-2 border rounded text-sm sm:text-base"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setSelected(null)}
              type="button"
              className="px-4 py-2 border rounded hover:bg-gray-100 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-primary text-white rounded hover:bg-indigo-800 text-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GiveMarkModal;
