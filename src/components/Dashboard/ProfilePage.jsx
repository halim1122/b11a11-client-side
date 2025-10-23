import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaEdit, 
  FaSave, 
  FaTimes,
  FaGraduationCap,
  FaBook,
  FaStar,
  FaAward,
  FaChartLine,
  FaBell,
  FaLock,
  FaCog
} from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';

const ProfilePage = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || '',
    bio: 'Passionate learner and collaborative student',
    department: 'Computer Science',
    semester: '5th',
    phone: '+1 234 567 8900'
  });

  // Mock data for user stats
  const userStats = [
    { icon: <FaBook />, label: 'Assignments Submitted', value: '24', color: 'blue' },
    { icon: <FaStar />, label: 'Average Rating', value: '4.8/5', color: 'yellow' },
    { icon: <FaAward />, label: 'Courses Completed', value: '12', color: 'green' },
    { icon: <FaChartLine />, label: 'Progress Score', value: '87%', color: 'purple' }
  ];

  const recentActivities = [
    { action: 'Submitted assignment', course: 'Web Development', time: '2 hours ago' },
    { action: 'Received grade', course: 'Data Structures', time: '1 day ago' },
    { action: 'Joined study group', course: 'Algorithm Design', time: '2 days ago' },
    { action: 'Completed quiz', course: 'Database Systems', time: '3 days ago' }
  ];

  const handleSave = async () => {
    try {
      await updateUserProfile(editForm.displayName, editForm.photoURL);
      setIsEditing(false);
      // Show success message
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setEditForm({
      displayName: user?.displayName || '',
      photoURL: user?.photoURL || '',
      bio: 'Passionate learner and collaborative student',
      department: 'Computer Science',
      semester: '5th',
      phone: '+1 234 567 8900'
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <Helmet>
        <title>Profile - BrainBand</title>
      </Helmet>

      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            My Profile
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Manage your personal information and track your learning journey
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-20"></div>
              
              <div className="px-6 pb-6 -mt-12">
                {/* Profile Image */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <img
                      src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=6366f1&color=fff`}
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                    />
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg">
                        <FaEdit className="text-sm" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Profile Info */}
                <div className="text-center mb-6">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.displayName}
                      onChange={(e) => setEditForm({...editForm, displayName: e.target.value})}
                      className="text-xl font-bold text-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 w-full mb-2"
                    />
                  ) : (
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {user?.displayName || 'Student User'}
                    </h2>
                  )}
                  <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                    <FaGraduationCap />
                    {editForm.department} Student
                  </p>
                </div>

                {/* Edit Actions */}
                <div className="flex gap-2 mb-6">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <FaSave className="text-sm" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <FaTimes className="text-sm" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <FaEdit className="text-sm" />
                      Edit Profile
                    </button>
                  )}
                </div>

                {/* Profile Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <FaEnvelope className="text-blue-500" />
                    <span className="text-sm">{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <FaUser className="text-green-500" />
                    <span className="text-sm">{editForm.semester} Semester</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <FaCalendarAlt className="text-purple-500" />
                    <span className="text-sm">Member since {new Date(user?.metadata?.creationTime).getFullYear()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <FaChartLine className="text-blue-500" />
                Quick Stats
              </h3>
              <div className="space-y-3">
                {userStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-${stat.color}-100 dark:bg-${stat.color}-900 rounded-lg flex items-center justify-center`}>
                        {stat.icon}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                    </div>
                    <span className="font-bold text-gray-800 dark:text-gray-200">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Bio Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <FaUser className="text-blue-500" />
                About Me
              </h3>
              {isEditing ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                  className="w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-gray-800 dark:text-gray-200 resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {editForm.bio}
                </p>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <FaBell className="text-yellow-500" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <FaBook className="text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.course} • {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Settings Quick Access */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <FaCog className="text-green-500" />
                Account Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <FaLock className="text-blue-500" />
                  <div className="text-left">
                    <p className="font-medium text-gray-800 dark:text-gray-200">Privacy</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Manage your data</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <FaBell className="text-yellow-500" />
                  <div className="text-left">
                    <p className="font-medium text-gray-800 dark:text-gray-200">Notifications</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Alert preferences</p>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;