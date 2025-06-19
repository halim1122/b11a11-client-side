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
    <div className="bg-base-100 shadow border border-primary rounded-2xl overflow-hidden p-4 max-w-3xl mx-auto transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Thumbnail + Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
        <img
          src={thumbnail}
          alt={title}
          className="w-full md:w-44 h-30 object-cover rounded-xl"
        />

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-primary">{title}</h2>
          <p className="text-base mt-1">
            Marks: <span className="font-semibold text-primary">{marks}</span>
          </p>
          <p className="text-sm mt-1">
            Level:{" "}
            <span
              className={`px-3 py-1 rounded font-medium ${levelClass[level] || "bg-base-300"}`}
            >
              {level}
            </span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <Link
          to={user ? `/assignment/${_id}` : "/auth/login"}
          className="btn btn-sm btn-outline btn-primary flex items-center gap-2 px-4 py-2 rounded-full"
        >
          <FaEye /> View
        </Link>

        <Link
          to={user ? `/assignment/update/${_id}` : "/auth/login"}
          className="btn btn-sm btn-outline btn-primary flex items-center gap-2 px-4 py-2 rounded-full"
        >
          <FaEdit /> Update
        </Link>

        <button
          onClick={() => (user ? handleDelete(_id) : navigate("/auth/login"))}
          className="btn btn-sm btn-outline btn-error flex items-center gap-2 px-4 py-2 rounded-full"
        >
          <FaTrashAlt /> Delete
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;
