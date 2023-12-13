import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import taskService from "../../services/taskService";

import type { KanbanItemTypes, KanbanDataTypes } from "../../types";
import type { RootState } from "../store";

export const fetchTasks = createAsyncThunk<KanbanItemTypes[], string>(
  "tasks/fetchTasks",
  async () => {
    try {
      const result = await taskService.getAll();
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const updateTask = createAsyncThunk<boolean, any>(
  "tasks/updateTasks", 
  async(updatedData) => {
    const {source, destinationBefore, destinationNext, destinationStatus}: any = updatedData;
    const result = await taskService.updateItem(source, destinationBefore, destinationNext, destinationStatus);
    return true;
  }
)

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    isLoading: false,
    data: [] as KanbanItemTypes[],
    kanbanData: {} as KanbanDataTypes,
  },
  reducers: {
    setKanbanData(state, action: PayloadAction<KanbanDataTypes>) {
      state.kanbanData = { ...action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTasks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
  },
});

export const { setKanbanData } = taskSlice.actions;

export const getTasks = (state: RootState) => state.tasks.data;
export const getKanbanTasks = (state: RootState) => state.tasks.kanbanData;
