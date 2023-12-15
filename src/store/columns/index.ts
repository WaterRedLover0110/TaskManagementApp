import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import columnService from "../../services/columnService";

import type { RootState } from "../store";
import type { KanbanColumnTypes } from "../../types";

export const fetchColumns = createAsyncThunk<KanbanColumnTypes[], string>(
  "columns/fetchColumns:load",
  async () => {
    try {
      const result = await columnService.getAll();
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const columnSlice = createSlice({
  name: "columns",
  initialState: {
    isLoading: false,
    data: [] as KanbanColumnTypes[],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchColumns.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchColumns.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
  },
});

export const getColumns = (state: RootState) => state.columns.data;
