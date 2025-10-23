import { Link } from "react-router";
import { FaEye, FaEdit, FaTrashAlt, FaStar, FaUser } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AssignmentCard = ({ assignment, handleRemove }) => {
  const { _id, title, marks, level, thumbnail, creatorEmail, creatorName, description } = assignment;

  const { user } = useContext(AuthContext);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: '#1f2937',
      color: 'white'
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
                  background: '#1f2937',
                  color: 'white'
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
                background: '#1f2937',
                color: 'white'
              });
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "This is not your assignment.",
            background: '#1f2937',
            color: 'white'
          });
        }
      }
    });
  };

  const levelClass = {
    hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  };

  const levelIcons = {
    hard: "🔥",
    medium: "⚡",
    easy: "🎯"
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Thumbnail */}
      <div className="overflow-hidden relative flex-shrink-0">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${levelClass[level]}`}>
            {levelIcons[level]} {level?.charAt(0).toUpperCase() + level?.slice(1)}
          </span>
        </div>
      </div>

      {/* Content - This section will grow to fill available space */}
      <div className="p-5 space-y-4 flex-grow">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 flex-grow">
          {description || "No description available"}
        </p>

        {/* Marks & Creator */}
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {marks} Marks
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <FaUser className="text-blue-500" />
            <span className="truncate max-w-20">{creatorName || "Unknown"}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons - Fixed at the bottom */}
      <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-700 pt-4 flex-shrink-0">
        {user?.email === creatorEmail ? (
          // Owner buttons - 3 buttons in a row
          <div className="grid grid-cols-3 gap-2">
            <Link
              to={`/assignment/${_id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1 text-sm"
            >
              <FaEye className="text-xs" />
              <span className="hidden sm:inline">View</span>
            </Link>

            <Link
              to={`/assignment/update/${_id}`}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1 text-sm"
            >
              <FaEdit className="text-xs" />
              <span className="hidden sm:inline">Edit</span>
            </Link>

            <button
              onClick={() => handleDelete(_id)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1 text-sm"
            >
              <FaTrashAlt className="text-xs" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        ) : (
          // Non-owner buttons - Single centered button
          <div className="flex justify-center">
            <Link
              to={`/assignment/${_id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 w-full max-w-xs"
            >
              <FaEye />
              View Assignment
            </Link>
          </div>
        )}
        
        {!user && (
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
            Login to take action
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default AssignmentCard;