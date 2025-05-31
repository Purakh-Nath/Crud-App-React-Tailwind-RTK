"use client"

import { useEffect, useState } from "react"
import { showUser, deleteUser } from "../features/userDetailsSlice" // Assuming this path is correct
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ViewModal from "./ViewModal"
import { MoreVertical, Eye, Edit3, Trash2, Users, XCircle } from "lucide-react"
import { useMobile } from "../hooks/use-mobile"

const MODAL_WIDTH_APPROX = 288 // Approx. width of ViewModal (w-72 = 18rem * 16px/rem)
const MODAL_GAP = 8 // 8px gap

function Read() {
  const [modalTargetId, setModalTargetId] = useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false) // Changed from isViewLinkHovered
  const [genderChecked, setGenderChecked] = useState("")
  const [activeIndex, setActiveIndex] = useState(-1)
  const [modalPositionStyle, setModalPositionStyle] = useState({}) // For desktop popover style

  const isMobile = useMobile() // Hook to detect mobile state
  const dispatch = useDispatch()
  const { users, loading, searchData } = useSelector((state) => state.app)

  useEffect(() => {
    dispatch(showUser())
  }, [dispatch])

  const handleDropdownClick = (index) => {
    const newActiveIndex = index === activeIndex ? -1 : index
    setActiveIndex(newActiveIndex)
    if (newActiveIndex === -1 || newActiveIndex !== activeIndex) {
      setIsViewModalOpen(false) // Close modal if dropdown closes or changes
    }
  }

  const openViewModal = (userId, event) => {
    setModalTargetId(userId)
    setIsViewModalOpen(true)

    if (!isMobile && event) {
      // Only calculate popover position for desktop
      const cardElement = event.currentTarget.closest(".user-card-wrapper")
      if (cardElement) {
        const cardRect = cardElement.getBoundingClientRect()
        const spaceOnLeft = cardRect.left
        const spaceOnRight = window.innerWidth - cardRect.right
        let positionClass = ""

        if (spaceOnLeft >= MODAL_WIDTH_APPROX + MODAL_GAP) {
          positionClass = "right-[calc(100%_+_8px)]" // Position left of card
        } else if (spaceOnRight >= MODAL_WIDTH_APPROX + MODAL_GAP) {
          positionClass = "left-[calc(100%_+_8px)]" // Position right of card
        } else {
          positionClass = spaceOnRight > spaceOnLeft ? "left-[calc(100%_+_8px)]" : "right-[calc(100%_+_8px)]"
        }
        setModalPositionStyle({ positionClass: positionClass, topClass: "top-4" })
      }
    } else {
      setModalPositionStyle({}) // Reset for mobile or if event is missing
    }
  }

  const closeViewModal = () => {
    setIsViewModalOpen(false)
  }

  const filteredUsers = users
    .filter((ele) => {
      if (searchData.length === 0) {
        return ele
      } else {
        return ele.name.toLowerCase().includes(searchData.toLowerCase())
      }
    })
    .filter((ele) => {
      if (genderChecked === "Male" || genderChecked === "Female") {
        return ele.gender === genderChecked
      } else {
        return ele
      }
    })

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-150px)] bg-gray-100 dark:bg-gray-900 p-4">
        <svg
          className="animate-spin h-12 w-12 text-purple-600 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">Loading Users...</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Please wait a moment.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <fieldset className="mb-8 p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl">
          <legend className="text-xl font-semibold text-gray-800 dark:text-white px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center">
            <Users size={20} className="mr-2 text-purple-600 dark:text-purple-400" />
            Filter by Gender
          </legend>
          <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center mt-4">
            {["All Profiles", "Male", "Female"].map((genderOption) => {
              const value = genderOption === "All Profiles" ? "" : genderOption
              return (
                <div key={genderOption} className="flex items-center">
                  <input
                    id={`radio-${genderOption.toLowerCase().replace(" ", "-")}`}
                    type="radio"
                    value={value}
                    name="gender"
                    checked={genderChecked === value}
                    onChange={(e) => setGenderChecked(e.target.value)}
                    className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                  />
                  <label
                    htmlFor={`radio-${genderOption.toLowerCase().replace(" ", "-")}`}
                    className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer"
                  >
                    {genderOption}
                  </label>
                </div>
              )
            })}
          </div>
        </fieldset>

        {filteredUsers.length === 0 && !loading && (
          <div className="text-center py-12">
            <XCircle size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">No Users Found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map((user, index) => (
            <div
              key={user.id}
              className="user-card-wrapper relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
              <div className="absolute top-3 right-3 z-20">
                <button
                  onClick={() => handleDropdownClick(index)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <MoreVertical size={20} />
                </button>
                {activeIndex === index && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-xl py-1 border dark:border-gray-600 origin-top-right z-10"
                    onMouseLeave={isMobile ? undefined : closeViewModal} // Close popover on mouse leave for desktop
                  >
                    <button // Changed Link to button for better semantics if it's an action
                      onClick={(e) => openViewModal(user.id, e)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <Eye size={16} className="mr-2" /> View
                    </button>
                    <Link
                      to={`/edit/${user.id}`}
                      onMouseEnter={isMobile ? undefined : closeViewModal} // Close popover on mouse enter for desktop
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <Edit3 size={16} className="mr-2" /> Edit
                    </Link>
                    <button
                      onClick={() => dispatch(deleteUser(user.id))}
                      onMouseEnter={isMobile ? undefined : closeViewModal} // Close popover on mouse enter for desktop
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-700 dark:hover:text-red-100"
                    >
                      <Trash2 size={16} className="mr-2" /> Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Desktop Popover Modal */}
              {!isMobile && isViewModalOpen && modalTargetId === user.id && activeIndex === index && (
                <div
                  className={`absolute z-30 transition-opacity duration-150 
                    ${modalPositionStyle.positionClass || ""} 
                    ${modalPositionStyle.topClass || "top-4"}
                  `}
                >
                  <ViewModal id={modalTargetId} onClose={closeViewModal} isOverlay={false} />
                </div>
              )}

              <div className="flex flex-col items-center p-6 pt-10 text-center">
                <img
                  className="w-24 h-24 mb-4 rounded-full shadow-md border-2 border-purple-300 dark:border-purple-600 object-cover"
                  src={`https://i.pravatar.cc/150?u=${user.id}`}
                  alt={`Profile of ${user.name}`}
                />
                <h5
                  className="mb-1 text-xl font-semibold text-gray-900 dark:text-white truncate w-full"
                  title={user.name}
                >
                  {user.name}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400 truncate w-full" title={user.email}>
                  {user.email}
                </span>
                <div className="flex mt-5 space-x-3">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-center text-indigo-700 bg-indigo-100 rounded-full dark:bg-indigo-900 dark:text-indigo-200">
                    {user.gender}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-center text-pink-700 bg-pink-100 rounded-full dark:bg-pink-900 dark:text-pink-200">
                    Age: {user.age}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Overlay Modal */}
        {isMobile && isViewModalOpen && modalTargetId && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeViewModal} // Close on backdrop click
          >
            <ViewModal id={modalTargetId} onClose={closeViewModal} isOverlay={true} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Read
