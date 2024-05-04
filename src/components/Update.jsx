import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateUser } from '../features/userDetailsSlice';



function Update() {
    const dispatch = useDispatch();
    const [load,setLoad] = useState('Submit')
    const navigate = useNavigate();
    const {id} = useParams();
    const [update,setUpdate] = useState({});
    const {users,loading} = useSelector((state)=> state.app)

    useEffect(() => {
      if (id) {
        const singleUser = users.filter((ele) => ele.id === id);
        setUpdate(singleUser[0]);
      }
    }, [id, users]);

  
    

    // const newData = (e) => {
    //     setUpdate({...update, [e.target.name] : e.target.value})
    //     // console.log("Updated :",update)
    // }
    const newData = (e) => setUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }));

     
    // console.log(update);
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoad('Wait..')
        // console.log("...user ", users);
        dispatch(updateUser(update));
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
        <h2 className="text-2xl font-bold mb-4 mt-4">Update Information</h2>
        <div className="mb-4">
          <label
           htmlFor="name"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={update ? update.name : ''}
            // value={update.name}
            onChange={newData}

            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-3"
            required
            // onChange={newData}
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
            value={update ? update.email : ''}
            // value={update.email}
            onChange={newData}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-3"
            required

            // onChange={newData}
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
            value={update ? update.gender : ''}
            // value={update.gender}
            id="gender"
            name="gender"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-3"
            required
            onChange={newData}
          >
             {update && (
    <>
      {/* Option for Male regardless of condition */}
      <option value="Male" selected={update?.gender === "Male"}>Male</option>
  <option value="Female" selected={update?.gender === "Female"}>Female</option>
     
      {/* <option value="Male" defaultValue={update.gender === "Male"}>
        Male
      </option> */}
      {/* Option for Female regardless of condition
      <option value="Female" defaultValue={update.gender === "Female"}>
        Female
      </option>   */}
    </>
  )}
          </select>
        </div>



             {/* <select
            id="gender"
            name="gender"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-3"
            required
            onChange={newData}
          >
            <option name="gender" required   value={update && update.gender} >
            Select Gender
            </option>
            <option name="gender"   value="Male">
            Male
            </option>
       
            <option name="gender"   value="Female">
           Female
            </option>
          </select>  */}


        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-200 mb-2">
            Age
          </label>
          <input
            type="number"
            min="0"
            id="age"
            value={update ? update.age : ''}
            // value={update.age}
            // maxLength={2}
            max={100}
            name="age"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-3"

            required
    
            onChange={newData}
          ></input>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 py-2 bg-indigo-500 border border-transparent rounded-md font-bold text-lg text-white uppercase tracking-wide hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
        {load}
        </button>
      </form>
    </>
  )
}

export default Update