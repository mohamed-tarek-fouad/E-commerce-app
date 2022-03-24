import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "use",
  initialState: {
    users: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getUserStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      getUserSuccess: (state, action) => {
        state.isFetching = false;
        state.users = action.payload;
      },
      getUserFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
      deleteUserStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      deleteUserSuccess: (state, action) => {
        state.isFetching = false;
        state.users.splice(
          state.users.findIndex((item) => item._id === action.payload),
          1
        );
      },
      deleteUserFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
      updateUserStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      updateUserSuccess: (state, action) => {
        state.isFetching = false;
        state.products[
          state.products.findIndex((item) => item._id === action.payload.id)
        ] = action.payload.product;
      },
      updateUserFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },

    },
});
export const { getUserStart,getUserSuccess,getUserFailure,deleteUserStart,deleteUserSuccess,deleteUserFailure,updateUserStart,updateUserSuccess,updateUserFailure } = usersSlice.actions;
export default usersSlice.reducer;