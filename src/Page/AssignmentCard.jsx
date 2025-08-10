import { Link, useNavigate } from "react-router"; // 'react-router-dom' ব্যবহার করো
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const AssignmentCard = ({ assignment, handleRemove }) => {
  const { _id, title, marks, level, thumbnail, creatorEmail } = assignment;

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (user?.email === creatorEmail) {
          axios
            .delete(`${import.meta.env.VITE_API}/assignment/${id}`)
            .then((res) => {
              if (res.data.deletedCount) {
                Swal.fire({
                  title: "Deleted successfully",
                  icon: "success",
                  draggable: true,
                });
                handleRemove(id);
              }
            })
            .catch((error) => {
              console.error(error);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to delete assignment.",
              });
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "This is not your assignment.",
          });
        }
      }
    });
  };

  // level color based on difficulty, DaisyUI classes
  const levelClass = {
    hard: "bg-error text-error-content",
    medium: "bg-warning text-warning-content",
    easy: "bg-success text-success-content",
  };

  return (
   <div className="bg-white w-full rounded-2xl border border-gray-200 shadow-lg overflow-hidden max-w-sm mx-auto transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
  {/* Thumbnail */}
  <div className="overflow-hidden">
    <img
      src={thumbnail}
      alt={title}
      className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105"
    />
  </div>

  {/* Content */}
  <div className="p-5 space-y-4">
    {/* Title */}
    <h2 className="text-xl font-bold text-gray-800 text-center">{title}</h2>

    {/* Marks & Level */}
    <div className="flex justify-between items-center">
      <p className="text-gray-600">
        Marks: <span className="font-semibold text-indigo-600">{marks}</span>
      </p>
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          levelClass[level] || "bg-gray-100 text-gray-700"
        }`}
      >
      {level}
      </span>
    </div>
  </div>

  {/* Action Buttons */}
  <div className=" join flex justify-center mb-4 border-t border-gray-100 pt-4">
    <Link
      to={`/assignment/${_id}`}
      className="btn join-item bg-indigo-50 text-indigo-600 hover:bg-indigo-100 flex items-center px-8 border border-gray-300"
    >
      <FaEye />
    </Link>

    <Link
      to={user ? `/assignment/update/${_id}` : "/auth/login"}
      className="btn join-item bg-indigo-50 text-indigo-600 hover:bg-indigo-100 flex items-center px-8 border border-gray-300"
    >
      <FaEdit />
    </Link>

    <button
      onClick={() => (user ? handleDelete(_id) : navigate("/auth/login"))}
      className="btn join-item bg-red-50 text-red-600 hover:bg-red-100 flex items-center px-8 border border-gray-300"
    >
      <FaTrashAlt />
    </button>
  </div>
</div>


  );
};

export default AssignmentCard;
