// src/features/users/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { TaskModel } from "../../models/TaskModel";
import { createTask, deleteTask, fetchTasks, updateTask } from "../api/TaskApi/TaskApi";

type TaskState = {
    taskData: Array<TaskModel>;
    loading: boolean;
    error: string | null;
};

const initialState: TaskState = {
    taskData: [],
    loading: false,
    error: null
};


/**
 * Created the Slice of Task.
 */
export const taskSlice = createSlice({
    name: "taskStatus",
    initialState,
    reducers: {
      addTask: (state, action: PayloadAction<TaskModel>) => {
        state.taskData.push(action.payload);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchTasks.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
          state.loading = false;
          state.taskData = action.payload;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "An error occurred";
        })
        .addCase(createTask.fulfilled, (state, action) => {
            state.loading = false;
            state.taskData.push(action.payload);
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            state.loading = false;
            const newTasks = state.taskData.map(task => {
                if (task.id === action.payload.id) {
                    return action.payload;
                }
                return task;
            });
            state.taskData = newTasks;
            
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
            state.loading = false;
            state.taskData = state.taskData.filter(task => task.id != action.payload.id);
        });

    },
  });
  export const { addTask } = taskSlice.actions;
  export const taskReducer = (state: RootState) => state.taskReducer;
  export default taskSlice.reducer;