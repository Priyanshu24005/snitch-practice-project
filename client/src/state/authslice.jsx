import { createSlice } from "@reduxjs/toolkit";
import { getUser, loginUser, registerUser } from "../api/auth.api";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: true, 
  },

  reducers: {
    removeUser: (state) => {
      localStorage.removeItem("accessToken");
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // register and login: payload is the user
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })

      // page refresh check
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      });
  },
});

export const { removeUser } = authSlice.actions;
export default authSlice.reducer;