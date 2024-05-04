import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/userDetailsSlice";
import { useNavigate } from "react-router-dom";

function Create() {
  const [users, setUsers] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [load,setLoad] = useState('Submit')

  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoad('Wait..')
    // console.log("...user ", users);
    dispatch(createUser(users));
    setTimeout(() => {
      navigate("/read");
    }, 2000);
  };

  return (
    <>
      <form
        className="flex flex-col w-full max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 mt-4">Personal Information</h2>
        <div className="mb-4">
          <label
           htmlFor="name"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Enter Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-3"
            required
            onChange={getUserData}
          ></input>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-3"
            required
            onChange={getUserData}
          ></input>
        </div>
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-3"
            required
            onChange={getUserData}
          >
            <option name="gender" required>
              Select Gender
            </option>
            <option name="gender" value="Male">
              Male
            </option>
            <option name="gender" value="Female">
              Female
            </option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-200 mb-2">
            Age
          </label>
          <input
            type="number"
            min="0"
            id="age"
            name="age"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-3"
            required
            onChange={getUserData}
          ></input>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center  text-right px-4 py-2 bg-indigo-500 border border-transparent rounded-md font-bold  text-lg text-white uppercase tracking-wide hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {load}
        </button>
      </form>
    </>
  );
}

export default Create;
