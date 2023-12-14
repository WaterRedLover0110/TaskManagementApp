import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import taskService from "../../services/taskService";

import type { KanbanItemTypes, KanbanDataTypes } from "../../types";
import type { RootState } from "../store";

export const fetchTasks = createAsyncThunk<KanbanItemTypes[], string>(
  "tasks/fetchTasks",
  async (uid: string) => {
    try {
      const result = await taskService.getAll(uid);
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const moveTask = createAsyncThunk<boolean, any>(
  "tasks/updateTasks", 
  async(updatedData) => {
    try {
      const {source, destinationBefore, destinationNext, destinationStatus}: any = updatedData;
      await taskService.moveTask(source, destinationBefore, destinationNext, destinationStatus);
      return true; 
    } catch (error) {
      throw error;
    }
  }
)

export const addTask = createAsyncThunk<boolean, any>(
  "tasks/addTask", 
  async(item) => {
    try {
      await taskService.addTask(item);
      return true; 
    } catch (error) {
      throw error;
    }
  }
)

export const updateTask = createAsyncThunk<boolean, any>(
  "tasks/updateTask",
  async ({item, id}) => {
    try {
      await taskService.updateTask(item, id);
      return true; 
    } catch (error) {
      throw error;
    }
  }
)

export const deleteTask = createAsyncThunk<boolean, any>(
  "tasks/deleteTask",
  async(id) => {
    try {
      await taskService.deleteTask(id);
      return true;
    } catch (error) {
      throw error;
    }
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
