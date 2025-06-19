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
      const res = await axios.patch(`${import.meta.env.VITE_API}/submissions/${submission._id}`, updated);
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
    <div className="fixed inset-0 bg-base-300 bg-opacity-60 flex items-center justify-center z-50 px-4">
      <div className="bg-base-100 w-full max-w-md sm:max-w-lg p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4 text-primary">Mark Assignment</h2>

        <div className="text-sm sm:text-base space-y-2 text-base-content">
          <p>
            <strong>Google Docs:</strong>{" "}
            <a
              href={submission.docsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary break-all"
            >
              View Document
            </a>
          </p>
          <p>
            <strong>Note:</strong> {submission.note || "No notes provided."}
          </p>
        </div>

        <form onSubmit={handleMark} className="mt-4 space-y-3">
          <input
            type="number"
            required
            placeholder="Enter marks"
            value={givenMark}
            onChange={(e) => setGivenMark(e.target.value)}
            className="input input-bordered w-full"
          />
          <textarea
            rows="3"
            placeholder="Feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="textarea textarea-bordered w-full"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setSelected(null)}
              type="button"
              className="btn btn-outline btn-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
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
