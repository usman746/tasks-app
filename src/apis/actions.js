import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = import.meta.env.VITE_BASE_URL;
const redirect_url = import.meta.env.VITE_FRONTEND_URL;

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendURL}/auth/login`,
        { email, password },
        config
      );
      // store user's token in local storage
      localStorage.setItem("userToken", data.token);
      return data;
    } catch (error) {
      console.log(error);
      // return custom error message from API if any
      if (error.response && error.response.data.detail) {
        return rejectWithValue(error.response.data.detail);
      } else if (error.response && error.response.data.password) {
        return rejectWithValue(error.response.data.password);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendURL}/auth/register`,
        {
          name,
          email,
          password,
        },
        config
      );
      return data;
    } catch (error) {
      console.log("error ", error);
      // return custom error message from backend if present
      if (error.response && error.response.data.errors) {
        return rejectWithValue(error.response.data.errors.email[0]);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks",
  async (
    { title, description, status, dueDate, userToken },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.post(
        `${backendURL}/tasks`,
        {
          title,
          description,
          status,
          dueDate,
        },
        config
      );
      return data;
    } catch (error) {
      console.log("error ", error);
      // return custom error message from backend if present
      if (error.response && error.response.data.errors) {
        return rejectWithValue(error.response.data.errors.email[0]);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async (
    { title, description, status, dueDate, userToken, id },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        `${backendURL}/tasks/${id}`,
        {
          title,
          description,
          status,
          dueDate,
        },
        config
      );
      return data;
    } catch (error) {
      console.log("error ", error);
      // return custom error message from backend if present
      if (error.response && error.response.data.errors) {
        return rejectWithValue(error.response.data.errors.email[0]);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getTask = createAsyncThunk(
  "tasks/get",
  async ({ userToken }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(`${backendURL}/tasks`, config);
      return data;
    } catch (error) {
      console.log("error ", error);
      // return custom error message from backend if present
      if (error.response && error.response.data.errors) {
        return rejectWithValue(error.response.data.errors.email[0]);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getSingleTask = createAsyncThunk(
  "tasks/getone",
  async ({ userToken, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(`${backendURL}/tasks/${id}`, config);
      return data;
    } catch (error) {
      console.log("error ", error);
      // return custom error message from backend if present
      if (error.response && error.response.data.errors) {
        return rejectWithValue(error.response.data.errors.email[0]);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async ({ userToken, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.delete(`${backendURL}/tasks/${id}`, config);
      return data;
    } catch (error) {
      console.log("error ", error);
      // return custom error message from backend if present
      if (error.response && error.response.data.errors) {
        return rejectWithValue(error.response.data.errors.email[0]);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
