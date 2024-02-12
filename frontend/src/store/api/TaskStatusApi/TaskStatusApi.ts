import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;

/**
 * Return Task-statues API response if request get successful.
 */
export const fetchTaskStatus = createAsyncThunk("tasKStatus/fetchTaskStatus", async () => {
    const resp = await axios.get(API_URL + "/api/task-statues/");
    return resp.data;
  });