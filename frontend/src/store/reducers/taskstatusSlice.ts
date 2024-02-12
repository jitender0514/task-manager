// src/features/users/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { TaskStatusModel } from "../../models/TaskStatusModel";
import { fetchTaskStatus } from "../api/TaskStatusApi/TaskStatusApi";

type TaskStatusState = {
  taskStatusData: Array<TaskStatusModel>;
  loading: boolean;
  error: string | null;
};

const initialState: TaskStatusState = {
  taskStatusData: [],
  loading: false,
  error: null,
};

/**
 * Created the Slice of TaskStatus.
 */
export const taskStatusSlice = createSlice({
  name: "taskStatus",
  initialState,
  reducers: {
    addTaskStatus: (state, action: PayloadAction<TaskStatusModel>) => {
      state.taskStatusData.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.taskStatusData = action.payload;
      })
      .addCase(fetchTaskStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});
export const { addTaskStatus } = taskStatusSlice.actions;
export const taskStatusReducer = (state: RootState) => state.taskStatusReducer;
export default taskStatusSlice.reducer;
