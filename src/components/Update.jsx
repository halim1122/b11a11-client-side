import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaPlus, FaCalendarAlt, FaImage, FaPenAlt, FaStar, FaRocket, FaBook, FaChartLine, FaUser, FaSpinner, FaUpload } from 'react-icons/fa';

const Update = () => {
  const { user } = useContext(AuthContext);
  const [dueDate, setDueDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const data = useLoaderData();
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const { _id, marks, title, description, level, creatorEmail } = data;

  
  // ImageBB API Key - Replace with your actual ImageBB API key
  const IMAGEBB_API_KEY = 'd159af39e747e9e3982c7d53bbbc6f36'; // Get from https://api.imgbb.com/

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      Swal.fire({
        title: 'Invalid File',
        text: 'Please select an image file (JPEG, PNG, GIF, etc.)',
        icon: 'error',
        confirmButtonColor: '#6366f1'
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        title: 'File Too Large',
        text: 'Please select an image smaller than 5MB',
        icon: 'error',
        confirmButtonColor: '#6366f1'
      });
      return;
    }

    setIsUploading(true);

    // Create form data for ImageBB
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Upload to ImageBB
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMAGEBB_API_KEY}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        const uploadedImageUrl = response.data.data.url;
        setImageUrl(uploadedImageUrl);
        setPreviewImage(uploadedImageUrl);
      }
    } catch (error) {
      console.error('Image upload error:', error);
      Swal.fire({
        title: 'Upload Failed',
        text: 'Failed to upload image. Please try again.',
        icon: 'error',
        confirmButtonColor: '#6366f1'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl('');
    setPreviewImage('');
  };

  // UPDATE functionality-------------
  const handleUpDateAssignment = (e) => {
    e.preventDefault();

    if (!imageUrl) {
          Swal.fire({
            title: 'Image Required',
            text: 'Please upload an image for your assignment',
            icon: 'warning',
            confirmButtonColor: '#6366f1'
          });
          return;
        }
    
    setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);
    const assignment = Object.fromEntries(formData.entries());

    // Convert fields to proper types
    assignment.marks = parseInt(assignment.marks);
    assignment.dueDate = dueDate;
    assignment.creatorEmail = user?.email || 'unknown';
    assignment.creatorName = user?.displayName || 'Anonymous';
    assignment.thumbnail = imageUrl;
    if (user?.email === creatorEmail) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to update this assignment",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
        background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
        color: document.documentElement.classList.contains('dark') ? 'white' : '#333333'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.put(`${import.meta.env.VITE_API}/assignment/${_id}`, assignment)
            .then(() => {
              navigate('/assignments');
              Swal.fire({
                title: "🎉 Updated Successfully!",
                text: "Your assignment has been updated.",
                icon: "success",
                background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
                color: document.documentElement.classList.contains('dark') ? 'white' : '#333333'
              });
            }).catch(error => {
              console.log(error);
              Swal.fire({
                title: "❌ Update Failed",
                text: error.message,
                icon: "error",
                confirmButtonColor: '#6366f1'
              });
            })
            .finally(() => {
              setIsSubmitting(false);
            });
        } else {
          setIsSubmitting(false);
        }
      });
    } else {
      navigate('/assignments');
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You didn't create this assignment",
        background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
        color: document.documentElement.classList.contains('dark') ? 'white' : '#333333'
      });
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <Helmet>
        <title>Update Assignment - BrainBand</title>
      </Helmet>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Header Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <FaRocket className="text-3xl text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Update Assignment
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Modify your assignment details to keep it fresh and engaging for students
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Cards Sidebar */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                  <FaPenAlt className="text-blue-600 dark:text-blue-400 text-xl" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Update Tips</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Review and improve the assignment description
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Adjust deadlines if needed
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Update difficulty level if necessary
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Refresh thumbnail for better engagement
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <FaUser className="text-yellow-300 text-xl" />
                <h3 className="font-semibold">Quick Stats</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Current Marks</span>
                  <span className="font-semibold">{marks}</span>
                </div>
                <div className="flex justify-between">
                  <span>Difficulty</span>
                  <span className="font-semibold capitalize">{level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="font-semibold text-green-300">Active</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <FaPlus className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Assignment Details</h2>
                    <p className="text-blue-100">Update all the required information</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleUpDateAssignment} className="p-8 space-y-6">
                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Assignment Title *
                  </label>
                  <div className="relative">
                    <input
                      name="title"
                      defaultValue={title}
                      type="text"
                      placeholder="Enter a compelling title for your assignment"
                      className="w-full px-4 py-4 pl-12 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 shadow-sm"
                      required
                    />
                    <FaPenAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Detailed Description *
                  </label>
                  <textarea
                    name="description"
                    defaultValue={description}
                    placeholder="Describe the assignment objectives, requirements, and expectations in detail..."
                    rows="5"
                    className="w-full px-4 py-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none transition-all duration-300 shadow-sm"
                    required
                  ></textarea>
                </motion.div>

                {/* Grid Layout for Multiple Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Marks */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Total Marks *
                    </label>
                    <div className="relative">
                      <input
                        name="marks"
                        defaultValue={marks}
                        type="number"
                        placeholder="100"
                        className="w-full px-4 py-4 pl-12 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 shadow-sm"
                        required
                      />
                      <FaStar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                    </div>
                  </motion.div>

                  {/* Difficulty Level */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Difficulty Level *
                    </label>
                    <select
                      name="level"
                      className="w-full px-4 py-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 shadow-sm appearance-none"
                      defaultValue={level}
                      required
                    >
                      <option value="easy">🎯 Easy</option>
                      <option value="medium">⚡ Medium</option>
                      <option value="hard">🔥 Hard</option>
                    </select>
                  </motion.div>
                </div>

                {/* Image Upload */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Assignment Image *
                  </label>

                  {previewImage ? (
                    // Image Preview
                    <div className="border-2 border-dashed border-green-500 rounded-xl p-4 bg-green-50 dark:bg-green-900/20 transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          ✅ Image Uploaded Successfully
                        </span>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <img
                          src={previewImage}
                          alt="Assignment preview"
                          className="w-20 h-20 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Image is ready to be used in your assignment
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Upload Area
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/20">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                        disabled={isUploading}
                      />
                      <label
                        htmlFor="image-upload"
                        className={`cursor-pointer flex flex-col items-center justify-center gap-3 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                      >
                        {isUploading ? (
                          <>
                            <FaSpinner className="text-3xl text-blue-500 animate-spin" />
                            <div>
                              <p className="font-medium text-gray-700 dark:text-gray-300">
                                Uploading Image...
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Please wait while we upload your image
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                              <FaUpload className="text-2xl text-blue-500 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-700 dark:text-gray-300">
                                Click to upload assignment image
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                PNG, JPG, GIF up to 5MB
                              </p>
                            </div>
                            <button
                              type="button"
                              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                            >
                              Choose File
                            </button>
                          </>
                        )}
                      </label>
                    </div>
                  )}
                </motion.div>


                {/* Due Date */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Due Date *
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={dueDate}
                      onChange={(date) => setDueDate(date)}
                      className="w-full px-4 py-4 pl-12 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 shadow-sm"
                      dateFormat="MMMM d, yyyy"
                      minDate={new Date()}
                      required
                    />
                    <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="pt-4"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-3">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Updating Assignment...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        <FaRocket className="text-lg" />
                        Update Assignment
                      </span>
                    )}
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Update;