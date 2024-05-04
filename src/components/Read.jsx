// import React, { useEffect, useState } from "react";
// import { createUser, showUser } from "../features/userDetailsSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";


// function Read() {
//     const [isOpen, setIsOpen] = useState(false);
    
//     const handleDropdownClick = () => {

//       setIsOpen(!isOpen);
//     };
//   const dispatch = useDispatch();
//   const { users, loading } = useSelector((state) => state.app);
// //   console.log(allData);
//   useEffect(() => {
//     dispatch(showUser());
//   }, [createUser]);

//   if (loading) {
//     return <button disabled type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center mt-5">
//     <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
//     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
//     </svg>
//     Loading...
//     </button>;
//   }

//   return (
   
//     <div class="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-1 grid-rows-auto gap-4">
 

//      {users && users.map((user) => (<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-5">
//     <div className="flex justify-end px-4 pt-4">
//         <button
//           id="dropdownButton"
//           onClick={() => handleDropdownClick()}
//           data-dropdown-toggle="dropdown"
//           className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
//           type="button"
//         >
//           <span className="sr-only">Open dropdown</span>
//           <svg
//             className="w-5 h-5"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="currentColor"
//             viewBox="0 0 16 3"
//           >
//             <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
//           </svg>
//         </button>
//         {/* <!-- Dropdown menu --> */}

//         <div   
//           id="dropdown"
//           className={` ${isOpen ? 'block' : 'hidden'} z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
//         >
//           <ul class="py-2" aria-labelledby="dropdownButton">
//             <li>
//               <Link
//                to={''}
//                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//               >
//                 Edit
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to={''}
//                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//               >
//                 Export Data
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to={''}
//                 className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//               >
//                 Delete
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>  

      

//     <div key='' className="flex flex-col items-center pb-10">
//       <img
//         className="w-24 h-24 mb-3 rounded-full shadow-lg"
//         src="https://picsum.photos/200/300/?blur=2"
//         alt={`Profile picture of ${user.name}`}
//       />
//       <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
//         {user.name}
//       </h5>
//       <span className="text-sm text-gray-500 dark:text-gray-400">
//       {user.email}
//       </span>
//       <div className="flex mt-4 md:mt-6">
//         <Link
//           to={''}
//           className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         >
//            {user.gender}
//         </Link>
//         <Link
//          to={''}
//           className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
//         >
//           {user.age}
//         </Link>
//       </div>
//     </div>
 
//     </div>  ))}
//     </div>
//   );
// }

// export default Read;




import React, { useEffect, useState } from "react";
import { createUser, showUser ,deleteUser, searchData } from "../features/userDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ViewModal from "./ViewModal";




function Read() {
    const [id, setId] = useState();
    const [isHovered, setIsHovered] = useState(false);
    const[genderChecked, setGenderChecked] = useState('')
    

    const [activeIndex, setActiveIndex] = useState(-1); // Track active div index

  const handleDropdownClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index); // Toggle visibility
  };

  const dispatch = useDispatch();
  const { users, loading,searchData } = useSelector((state) => state.app);
//   console.log(allData);
  useEffect(() => {
    dispatch(showUser());
  }, [createUser]);

  // setTimeout(() => {

  // }, 2000);

  if (loading) {
    return <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center mt-5">
    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>
    Loading...
    </button>; 
  }
  return (
<>
  <div className="flex gap-1 justify-center">
  <div className="flex items-center mt-4  justify-center">
    <input 
     onChange={(e)=>{setGenderChecked(e.target.value)}}
    defaultChecked id="default-radio-1" type="radio"  name="gender" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
    <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">All Profiles</label>
</div>
 <div className="flex items-center mt-4 justify-center">
    <input 
    onChange={(e)=>{setGenderChecked(e.target.value)}}

    checked={genderChecked==='Male'}  id="default-radio-1" type="radio" value="Male" name="gender" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
    <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
</div>
 <div className="flex items-center  mt-4 justify-center">
    <input 
    onChange={(e)=>{setGenderChecked(e.target.value)}}
    checked={genderChecked==='Female'}  id="default-radio-1" type="radio" value="Female" name="gender" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
    <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
</div>
</div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 grid-rows-auto gap-4">
     {users &&
     users.filter((ele) => {
      if(searchData.length===0){
        return ele
      }else{
        return ele.name.toLowerCase().includes(searchData.toLowerCase())
      }
     }).filter((ele)=>{
      if(genderChecked==='Male'){
        return ele.gender === genderChecked
      }else if(genderChecked==='Female'){
        return ele.gender === genderChecked
      }else{
        return ele;
      }
     })
      .map((user,index) => (<div  key={user.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-5">
            <button
          id="dropdownButton"
          onClick={() => handleDropdownClick(index)}
          data-dropdown-toggle="dropdown"
          // inline-block
          className="flex  text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
        {/* <!-- Dropdown menu --> */}
        {/* ${isOpen ? 'block' : 'hidden'} */}



        <div   key={user.id}
          id="dropdown"
          className={`  ${index === activeIndex ? "block" : "hidden"} absolute z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
        >
          <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
              <Link 
              key={user.id}
               to={''}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                onMouseEnter={() => {setIsHovered(true);setId(user.id);}}
                onMouseLeave={() => setIsHovered(false)}
                
               
              >
                View
              </Link>
              {isHovered && <ViewModal id={id} />}
            </li>
            <li>
              <Link
                to={`/edit/${user.id}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Edit
              </Link>
            </li>
            <li>
              <Link
              onClick={()=> dispatch(deleteUser(user.id))}
                to={''}
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Delete
              </Link>
            </li>
          </ul>
        </div>
        
<div key='' className="flex flex-col items-center pb-10">
<img
  className="w-24 h-24 mb-3 rounded-full shadow-lg"
  src="https://picsum.photos/200/300/?blur=2"
  alt={`Profile picture of ${user.name}`}
/>
<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
  {user.name}
</h5>
<span className="text-sm text-gray-500 dark:text-gray-400">
{user.email}
</span>
<div className="flex mt-4 md:mt-6">
  <Link
    to={''}
    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
     {user.gender}
  </Link>
  <Link
   to={''}
    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
  >
    {user.age}
  </Link>
</div>
</div>
          </div>
          
   
        ))}
        
    </div>

    </>
  );
}

export default Read;
