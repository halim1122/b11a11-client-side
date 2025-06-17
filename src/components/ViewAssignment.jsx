import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";

const ViewAssignment = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  const {
    title,
    description,
    thumbnail,
    marks,
    level,
    dueDate,
    creatorEmail,
    creatorName,
  } = data;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary hover:gap-3 transition-all duration-200 mb-6 font-medium text-lg"
      >
        <FaArrowLeft className="text-primary" />
        <span>Back to Assignments</span>
      </button>

      {/* Main Card */}
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden flex flex-col lg:flex-row border border-gray-200">
        {/* Thumbnail Section */}
        <div className="lg:w-1/2 w-full h-64 lg:h-auto">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-4">{title}</h1>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-4">
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  level === "easy"
                    ? "bg-green-100 text-green-700"
                    : level === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {level.toUpperCase()} Level
              </span>

              <span className="text-sm font-semibold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                {marks} Marks
              </span>

              <span className="text-sm font-semibold px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                Due: {dueDate}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-6">
              {description}
            </p>
          </div>

          {/* Creator Info */}
          <div className="flex items-center gap-3 mt-4">
            <FaUserCircle className="text-4xl text-primary" />
            <div>
              <p className="text-sm font-semibold text-primary">
                {creatorName}
              </p>
              <p className="text-sm text-gray-500">{creatorEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAssignment;
