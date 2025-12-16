import { createSlice } from "@reduxjs/toolkit";
import { chatWithAIThunk, getAIHistoryThunk } from "./ai.thunk";

const initialState = {
  aiMessages: [],
  loading: false,
  error: null,
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    addAIMessage: (state, action) => {
      state.aiMessages.push(action.payload);
    },
    clearAIMessages: (state) => {
      state.aiMessages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(chatWithAIThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(chatWithAIThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.aiMessages.push(action.payload);
      })
      .addCase(chatWithAIThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAIHistoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAIHistoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.aiMessages = action.payload;
      })
      .addCase(getAIHistoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addAIMessage, clearAIMessages } = aiSlice.actions;
export default aiSlice.reducer;