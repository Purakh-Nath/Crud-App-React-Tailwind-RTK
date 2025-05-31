"use client"

import { useSelector } from "react-redux"
import { Mail, Cake, GroupIcon as GenderIcon, Users, Info, X } from "lucide-react"

// eslint-disable-next-line react/prop-types
function ViewModal({ id, onClose, isOverlay }) {
  const totalUser = useSelector((state) => state.app.users)
  const singleUserArray =
    Array.isArray(totalUser) && id !== null && id !== undefined ? totalUser.filter((ele) => ele.id === id) : []

  if (singleUserArray.length === 0) {
    return (
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6 text-center 
          ${isOverlay ? "max-w-md w-11/12" : "w-80"} 
          transition-all duration-150 ease-in-out`}
        onClick={(e) => e.stopPropagation()}
      >
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        )}
        <Info size={40} className="mx-auto mb-4 text-gray-400 dark:text-gray-500" />
        <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-1">User Not Found</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">The user details could not be loaded.</p>
      </div>
    )
  }

  const user = singleUserArray[0]
  const userJob = user.jobTitle || "Visual Designer"

  return (
    <div
      className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 
        transition-all duration-150 ease-in-out overflow-hidden 
        ${isOverlay ? "max-w-md w-11/12" : "w-80"} 
      `}
      onClick={(e) => e.stopPropagation()}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors z-20"
          aria-label="Close modal"
        >
          <X size={22} />
        </button>
      )}

      {/* Profile Header */}
      <div className="bg-gray-50 dark:bg-gray-700/60 p-6 text-center relative">
        <img
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-lg mx-auto mb-3"
          src={`https://i.pravatar.cc/150?u=${user.id}`}
          alt={`Profile of ${user.name}`}
        />
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white leading-tight" title={user.name}>
          {user.name}
        </h3>
        <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">{userJob}</p>
      </div>

      {/* User Details Section */}
      <div className={`p-6 space-y-5 ${isOverlay ? "sm:space-y-6" : "space-y-4"}`}>
        {/* Email */}
        <div className="text-center group">
          {" "}
          {/* Centered content */}
          <Mail
            size={20} // Slightly larger icon for centered layout
            className="mb-1 text-purple-500 dark:text-purple-400 group-hover:scale-110 transition-transform inline-block" // inline-block for centering
          />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">Email Address</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 break-all" title={user.email}>
              {user.email}
            </p>
          </div>
        </div>

        {/* Age */}
        <div className="text-center group">
          {" "}
          {/* Centered content */}
          <Cake
            size={20} // Slightly larger icon for centered layout
            className="mb-1 text-purple-500 dark:text-purple-400 group-hover:scale-110 transition-transform inline-block" // inline-block for centering
          />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">Age</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{user.age} years old</p>
          </div>
        </div>

        {/* Gender */}
        <div className="text-center group">
          {" "}
          {/* Centered content */}
          {user.gender === "Male" ? (
            <GenderIcon
              size={20} // Slightly larger icon for centered layout
              className="mb-1 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform inline-block" // inline-block for centering
            />
          ) : user.gender === "Female" ? (
            <GenderIcon
              size={20} // Slightly larger icon for centered layout
              className="mb-1 text-pink-500 dark:text-pink-400 group-hover:scale-110 transition-transform inline-block" // inline-block for centering
            />
          ) : (
            <Users
              size={20} // Slightly larger icon for centered layout
              className="mb-1 text-gray-500 dark:text-gray-400 group-hover:scale-110 transition-transform inline-block" // inline-block for centering
            />
          )}
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">Gender</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{user.gender}</p>
          </div>
        </div>
      </div>

      {/* Optional Footer Action */}
      {isOverlay && (
        <div className="px-6 pb-6 pt-2">
          <button
            onClick={onClose}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Done
          </button>
        </div>
      )}
    </div>
  )
}

export default ViewModal
