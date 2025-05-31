"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { updateUser } from "../features/userDetailsSlice" // Assuming this path is correct
import { UserCog, Mail, Users, Calendar, Loader2, XCircle } from "lucide-react"

function Update() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { users } = useSelector((state) => state.app)

  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [initialDataLoaded, setInitialDataLoaded] = useState(false)

  useEffect(() => {
    if (id && users.length > 0) {
      const singleUser = users.find((ele) => ele.id === id) // Use find for single user
      if (singleUser) {
        setUpdateData({ ...singleUser }) // Spread to ensure all fields are copied
        setInitialDataLoaded(true)
      } else {
        // Optional: Handle case where user with ID is not found
        console.warn(`User with ID ${id} not found. Redirecting...`)
        // navigate("/read"); // Or to a 404 page
      }
    }
  }, [id, users, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    dispatch(updateUser(updateData))
      .unwrap()
      .then(() => {
        // Optional: Show a success toast/message here
        setTimeout(() => {
          navigate("/read")
        }, 1000)
      })
      .catch((error) => {
        // Optional: Show an error toast/message here
        console.error("Failed to update user:", error)
        setIsLoading(false)
      })
  }

  const inputFields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "e.g., Ada Lovelace",
      icon: <UserCog size={18} className="text-gray-400 dark:text-gray-500" />,
      required: true,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "e.g., ada@example.com",
      icon: <Mail size={18} className="text-gray-400 dark:text-gray-500" />,
      required: true,
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: [
        // The first option can be removed if gender is always pre-filled and required
        // { value: "", label: "Select Gender", disabled: true },
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Other", label: "Other" },
      ],
      icon: <Users size={18} className="text-gray-400 dark:text-gray-500" />,
      required: true,
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      placeholder: "e.g., 30",
      min: "0",
      max: "120",
      icon: <Calendar size={18} className="text-gray-400 dark:text-gray-500" />,
      required: true,
    },
  ]

  // Show a loading state or prevent rendering form until data is loaded
  if (!initialDataLoaded && users.length > 0 && id) {
    // This check ensures we wait for the user data to be potentially found
    // You might want a more sophisticated loading spinner here if users array itself is loading
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-purple-600" />
      </div>
    )
  }
  // If ID is present but user not found after users are loaded (and initialDataLoaded is still false)
  if (id && users.length > 0 && !updateData.id) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4 text-center">
        <XCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">User Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400">The user you are trying to edit does not exist.</p>
        <button
          onClick={() => navigate("/read")}
          className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Back to User List
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg p-8 sm:p-10 bg-white dark:bg-gray-800 shadow-2xl rounded-xl space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">Update User Information</h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Modify the details below for {updateData.name || "the user"}.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {inputFields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <div className="relative rounded-md shadow-sm">
                {field.icon && (
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {field.icon}
                  </div>
                )}
                {field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={updateData[field.name] || ""} // Ensure controlled component, default to "" if undefined
                    onChange={handleChange}
                    required={field.required}
                    className={`block w-full py-2.5 border ${field.icon ? "pl-10" : "pl-3"} pr-3 sm:text-sm rounded-lg 
                               bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 
                               text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                               focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-500 dark:focus:border-purple-500
                               disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {/* Add a default "Select" option if the current gender might be empty or not in the list */}
                    {field.name === "gender" && !updateData.gender && (
                      <option value="" disabled>
                        Select Gender
                      </option>
                    )}
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value} disabled={option.disabled}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={updateData[field.name] || ""} // Ensure controlled component, default to "" if undefined
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    min={field.min}
                    max={field.max}
                    required={field.required}
                    className={`block w-full py-2.5 border ${field.icon ? "pl-10" : "pl-3"} pr-3 sm:text-sm rounded-lg 
                               bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 
                               text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                               focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-500 dark:focus:border-purple-500
                               disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                )}
              </div>
            </div>
          ))}

          <div>
            <button
              type="submit"
              disabled={isLoading || !initialDataLoaded} // Disable if loading or data hasn't loaded
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-800 disabled:bg-purple-400 disabled:cursor-not-allowed transition-colors duration-150"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin mr-2" />
                  Saving Changes...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Update
