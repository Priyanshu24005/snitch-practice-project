import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkApi) => {
    try {
      const response = await api.post("/auth/register", data);
      localStorage.setItem("accessToken", response.data.data.accessToken);

      const me = await api.get("/auth/me");
      return me.data.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkApi) => {
    try {
      const response = await api.post("/auth/login", data);
      localStorage.setItem("accessToken", response.data.data.accessToken);

      const me = await api.get("/auth/me");
      return me.data.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);



export const getUser = createAsyncThunk(
  "/auth/me",
  async (_, thunkApi) => {
    try {
      console.log("GET USER CALLED");

      const response = await api.get("/auth/me");

      console.log("GET USER RESPONSE:", response.data);

      return response.data;
    } catch (error) {
      console.log("GET USER ERROR:", error.response?.data);
      console.log("STATUS:", error.response?.status);

      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
