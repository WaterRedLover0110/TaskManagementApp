import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { KanbanUrgencyTypes } from "../../types";
import type { RootState } from "../store";
import urgencyService from "../../services/urgencyService";

export const fetchUrgency = createAsyncThunk<KanbanUrgencyTypes[], string>(
  "urgency/fetchUrgency:load",
  async () => {
    try {
      const result = await urgencyService.getAll();
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const urgencySlice = createSlice({
  name: "urgency",
  initialState: {
    isLoading: false,
    data: [] as KanbanUrgencyTypes[],
  },
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(fetchUrgency.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUrgency.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
  },
});

export const getUrgency = (state: RootState) => state.urgency.data;
