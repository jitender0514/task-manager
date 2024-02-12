import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';
import { EditFormData } from "../../../types/FormTypes";



const API_URL = import.meta.env.VITE_API_URL;

/**
 * Return Tasks API response if request get successful.
 */
export const fetchTasks = createAsyncThunk("task/fetchTasks", async () => {
    const resp = await axios.get(API_URL + "/api/tasks/");
    return resp.data;
  });


/**
 * Return Tasks API (Create) response if request get successful.
 */
export const createTask = createAsyncThunk("task/createTask", async (data:FormData|EditFormData) => {
    const resp = await axios.post(API_URL + "/api/tasks/", data);
    toast.success("Success Created new Task!!", {position: "top-center"});
    return resp.data;
  });


  /**
 * Return Tasks API (Update) response if request get successful.
 */
export const updateTask = createAsyncThunk("task/updateTask", async ({id, data}: {id:number|string, data:FormData|EditFormData}) => {
    const resp = await axios.put(`${API_URL}/api/tasks/${id}/`, data);
    toast.success("Success Updated!!", {position: "top-center"});
    return resp.data;
  });


/**
 * Return Tasks API (Delete) response if request get successful.
 */
export const deleteTask = createAsyncThunk("task/deleteTask", async (id:number|string) => {
    await axios.delete(`${API_URL}/api/tasks/${id}/`);
    toast.success("Success deleted!!", {position: "top-center"});
    return {'id': id};
  });