import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { KanbanTypeTypes } from "../../types";
import type { RootState } from "../store";
import typeService from "../../services/typeService";

export const fetchTypes = createAsyncThunk<KanbanTypeTypes[], string>(
  "types/fetchTypes:load",
  async () => {
    try {
      const result = await typeService.getAll();
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const typeSlice = createSlice({
  name: "types",
  initialState: {
    isLoading: false,
    data: [] as KanbanTypeTypes[],
  },
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(fetchTypes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTypes.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
  },
});

export const getTypes = (state: RootState) => state.types.data;
