import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


function ViewModal({id}) {
    const totalUser = useSelector((state)=> state.app.users)
    const singleUser = totalUser.filter((ele)=> ele.id===id)
    // console.log(singleUser[0].name)

  return (
    <>
    

<div data-popover id="popover-user-profile" role="tooltip" className="z-10 inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600">
    <div className="p-3">
        <div className="flex items-center justify-between mb-2">
            <a href="#">
                <img className="w-10 h-10 rounded-full" src="https://picsum.photos/200/300/?blur=2" alt="Jese Leos"></img>
            </a>
            <div>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{singleUser[0].name}</button>
            </div>
        </div>
        <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
            <Link>AGE : {singleUser[0].age}</Link>
        </p>
        <p className="mb-3 text-sm font-normal">
            <Link  className="hover:underline">{singleUser.name}</Link>
        </p>
        <p className="mb-4 text-sm">Contact : <Link href="#" className="text-blue-600 dark:text-blue-500 hover:underline">{singleUser[0].email}</Link></p>
        <ul className="flex text-sm">
            <li className="me-2">
                <Link  className="hover:underline flex  space-x-1 ">
                    <span className="font-semibold text-gray-900 dark:text-white ml-16">Gender : </span>
                    <span className=''> {singleUser[0].gender}</span>
                </Link>
            </li>
            {/* <li>
                <a href="#" class="hover:underline">
                    <span class="font-semibold text-gray-900 dark:text-white">3,758</span>
                    <span>Followers</span>
                </a>
            </li> */}
        </ul>
    </div>
    <div data-popper-arrow></div>
</div>



    </>
  )
}

export default ViewModal