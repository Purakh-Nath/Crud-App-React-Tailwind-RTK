import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// Creating Action
export const createUser = createAsyncThunk( "createUser", async (data , {rejectWithValue})=> {
    // console.log("Data ", data)
    const url = import.meta.env.VITE_MOCK_API + `/crud`;

    const response = await fetch(url,
   { method : "POST",
   headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    
   }
    )

    try {
        const result = await response.json();
        return result;
        
    } catch (error) {
        return rejectWithValue(error)
        
    }
} )

// Read Action

export const showUser = createAsyncThunk("showUser", async (data,{rejectWithValue}) => {
  const url = import.meta.env.VITE_MOCK_API + `/crud`;
  const response = await fetch(url,
  // { method : "POST",
  // headers: {
  //  "Content-Type": "application/json",
  //  },
  //  body: JSON.stringify(data),
   
  // }
  )
  try {
    const result = await response.json();
    // console.log(result)
    return result;
    
} catch (error) {
    return rejectWithValue(error)
    
}
   

})



// Delete User

export const deleteUser = createAsyncThunk("deleteUser", async (id,{rejectWithValue}) => {
  const url = import.meta.env.VITE_MOCK_API + `/crud/${id}`;
  const response = await fetch(url,
  { method : "DELETE",
  // headers: {
  //  "Content-Type": "application/json",
  //  },
  //  body: JSON.stringify(data),
   
  }
  )
  try {
    const result = await response.json();
    // console.log(result)
    return result;
    
} catch (error) {
    return rejectWithValue(error)
    
}
   

})

// Update Action

export const updateUser = createAsyncThunk( "updateUser", async (data , {rejectWithValue})=> {
  // console.log("updatedData ", data)
  const url = import.meta.env.VITE_MOCK_API + `/crud/${data.id}`;

  const response = await fetch(url,
 { method : "PUT",
 headers: {
  "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
  
 }
  )

  try {
      const result = await response.json();
      return result;
      
  } catch (error) {
      return rejectWithValue(error)
      
  }
} )



export const userDetails = createSlice({
  name: 'userDetails',
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData : [],

  },
  reducers : {
    searchData : (state,action) => {
      // console.log(action.payload)
      state.searchData = action.payload
    },
  },


  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Something went wrong';
      })
      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Something went wrong';
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const {id} = action.payload
        if(id){
          state.users = state.users.filter((user)=> user.id !== id)
        }
        // state.users = action.payload
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Something went wrong';
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.users.push(action.payload);
        state.users = state.users.map((ele) => (
          ele.id === action.payload.id ? action.payload : ele

        ))
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Something went wrong';
      });
  },
});

export default userDetails.reducer;
export const {searchData} =  userDetails.actions;


// export const userDetails = createSlice({
//     name : "userDetails",
//     initialState : {
//         users : [],
//         loading : false,
//         error : null, 
//     },


//         extraReducers: {
//             [createUser.pending]: (state) => {
//               state.loading = true; // Directly update loading here
//             },
//             [createUser.fulfilled]: (state, action) => {
//               state.loading = false;
//               state.users.push(action.payload);
//             },
//             [createUser.rejected]: (state, action) => {
//               state.loading = false;
//               state.error = action.payload.message || "Something went wrong"; // Extract error message
//             },
//           },
          
   
   
// });


// export default userDetails.reducer