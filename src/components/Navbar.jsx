"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { searchData } from "../features/userDetailsSlice" // Assuming this path is correct
import { PlusCircle, Users, SearchIcon, LayoutGrid } from "lucide-react"

function Navbar() {
  const totalUserCount = useSelector((state) => state.app.users.length)
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    dispatch(searchData(searchTerm))
  }, [searchTerm, dispatch])

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo/Brand and Main Links */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center text-purple-600 dark:text-purple-400">
              <LayoutGrid size={28} className="mr-2" />
              <span className="font-bold text-xl">Users</span>
            </Link>
            <div className="hidden md:flex items-baseline space-x-4 ml-10">
              <Link
                to="/"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <PlusCircle size={18} className="mr-2" />
                Create User
              </Link>
              <Link
                to="/read"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Users size={18} className="mr-2" />
                All Users
                <span className="ml-1.5 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold leading-none text-purple-600 dark:text-purple-300 bg-purple-100 dark:bg-gray-700 rounded-full">
                  {totalUserCount}
                </span>
              </Link>
            </div>
          </div>

          {/* Right side: Search Input */}
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search users
              </label>
              <div className="relative text-gray-400 focus-within:text-gray-600 dark:focus-within:text-gray-300">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={18} aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 pl-10 pr-3 text-sm placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  placeholder="Search Profiles..."
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button (Optional - for future expansion if more links are added) */}
          {/* <div className="md:hidden"> ... </div> */}
        </div>
      </div>

      {/* Mobile Menu Links (if implementing a burger menu) */}
      <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-300 px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            <PlusCircle size={18} className="mr-2" />
            Create User
          </Link>
          <Link
            to="/read"
            className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-300 px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            <Users size={18} className="mr-2" />
            All Users
            <span className="ml-1.5 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold leading-none text-purple-600 dark:text-purple-300 bg-purple-100 dark:bg-gray-700 rounded-full">
              {totalUserCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
