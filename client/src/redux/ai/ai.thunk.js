import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const chatWithAIThunk = createAsyncThunk(
  "ai/chat",
  async (message, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/ai/chat", { message });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to chat with AI");
    }
  }
);

export const getAIHistoryThunk = createAsyncThunk(
  "ai/history",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/ai/history");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to get AI history");
    }
  }
);