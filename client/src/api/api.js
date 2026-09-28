import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5173/api",
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    console.log("INTERCEPTOR STATUS:", error.response?.status);
    console.log("INTERCEPTOR URL:", error.config?.url);

    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        console.log("REFRESH CALLING...");

        const response = await api.post("/auth/refresh");

        console.log("REFRESH RESPONSE:", response.data);

        const newAccessToken = response.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.log(
          "REFRESH FAILED:",
          refreshError.response?.data
        );

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
