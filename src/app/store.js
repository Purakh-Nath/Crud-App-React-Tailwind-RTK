import {configureStore} from "@reduxjs/toolkit";
import  userDetails  from "../features/userDetailsSlice";
// import gitUser from "../features/gitUsersSlice";

export const store = configureStore({
    reducer : {
        app : userDetails,

    },


});