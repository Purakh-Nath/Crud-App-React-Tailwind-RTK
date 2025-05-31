"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { createUser } from "../features/userDetailsSlice" // Assuming this path is correct
import { useNavigate } from "react-router-dom"
import { UserPlus, Mail, Users, Calendar, Loader2 } from "lucide-react"

function CreateForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    dispatch(createUser(formData))
      .unwrap() // Use unwrap to handle promise from createAsyncThunk
      .then(() => {
        // Optional: Show a success toast/message here
        setTimeout(() => {
          navigate("/read") // Assuming '/read' is the path to your user list
        }, 1000) // Reduced timeout for quicker navigation
      })
      .catch((error) => {
        // Optional: Show an error toast/message here
        console.error("Failed to create user:", error)
        setIsLoading(false)
      })
    // Removed the old setTimeout as navigation is handled by promise resolution
  }

  const inputFields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "e.g., Ada Lovelace",
      icon: <UserPlus size={18} className="text-gray-400 dark:text-gray-500" />,
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
        { value: "", label: "Select Gender", disabled: true },
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
      icon: <Calendar size={18} className="text-gray-400 dark:text-gray-500" />,
      required: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg p-8 sm:p-10 bg-white dark:bg-gray-800 shadow-2xl rounded-xl space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">Create New User</h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Fill in the details below to add a new profile.
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
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    className={`block w-full py-2.5 border ${field.icon ? "pl-10" : "pl-3"} pr-3 sm:text-sm rounded-lg 
                               bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 
                               text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                               focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-500 dark:focus:border-purple-500
                               disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
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
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    min={field.min}
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
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-800 disabled:bg-purple-400 disabled:cursor-not-allowed transition-colors duration-150"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                "Create User"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateForm
