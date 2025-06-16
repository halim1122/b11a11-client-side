import { Link } from "react-router";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";

const AssignmentCard = ({ assignment, handleDelete }) => {
  const { _id, title, marks, level, thumbnail } = assignment;

  return (
    <div
      className="bg-white shadow-[#342995] shadow border border-[#342995] rounded-2xl overflow-hidden p-4 w-full max-w-3xl mx-auto transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Thumbnail + Info Section */}
      <div className="flex flex-col md:flex-row items-center md:items-stretch gap-4">
        <img
          src={thumbnail}
          alt={title}
          className="w-full flex-1 md:w-44 h-30 object-cover rounded-xl border border-[#342995]"
        />

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-[#342995]">{title}</h2>
          <p className="text-gray-700 mt-1">
            Marks: <span className="font-semibold text-[#342995]">{marks}</span>
          </p>
          <p className="text-sm mt-1">
            Level:{" "}
            <span
              className={`px-2 py-1 rounded font-medium ${
                level === "hard"
                  ? "bg-red-100 text-red-700"
                  : level === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {level}
            </span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <Link
          to={`/assignments/${_id}`}
          className="btn btn-sm border border-[#342995] text-[#342995] hover:bg-[#342995] hover:text-white flex items-center gap-1 px-4 py-2 rounded-full"
        >
          <FaEye /> View
        </Link>

        <Link
          to={`/assignments/update/${_id}`}
          className="btn btn-sm border border-[#342995] text-[#342995] hover:bg-[#342995] hover:text-white flex items-center gap-1 px-4 py-2 rounded-full"
        >
          <FaEdit /> Update
        </Link>

        <button
          onClick={() => handleDelete?.(_id)}
          className="btn btn-sm border border-red-500 text-red-600 hover:bg-red-600 hover:text-white flex items-center gap-1 px-4 py-2 rounded-full"
        >
          <FaTrashAlt /> Delete
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;
