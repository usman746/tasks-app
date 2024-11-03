import { createSlice } from "@reduxjs/toolkit";
import {
  addTask,
  deleteTask,
  getSingleTask,
  getTask,
  registerUser,
  updateTask,
  userLogin,
} from "./actions";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null, // for user object
  userToken, // for storing the JWT
  error: null,
  errorReg: null,
  success: false, // for monitoring the registration process.
  successLogin: false, // for monitoring the login process.
  taskSuccess: false, // for monitoring the tasks process
  taskError: null,
  taskLoading: false,
  dataTask: null,
  dataOneTask: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken"); // delete token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: (builder) => {
    // login user
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successLogin = true; // login successful
        state.userInfo = payload;
        state.userToken = payload.token;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // register user
      .addCase(registerUser.pending, (state, { payload }) => {
        state.loading = true;
        state.errorReg = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; // registration successful
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorReg = payload;
      })
      // add new task
      .addCase(addTask.pending, (state, { payload }) => {
        state.taskLoading = true;
        state.taskError = null;
      })
      .addCase(addTask.fulfilled, (state, { payload }) => {
        state.taskLoading = false;
        state.taskSuccess = true; // registration successful
      })
      .addCase(addTask.rejected, (state, { payload }) => {
        state.taskLoading = false;
        state.taskError = payload;
      })
      // update task
      .addCase(updateTask.pending, (state, { payload }) => {
        state.taskLoading = true;
        state.taskError = null;
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        state.taskLoading = false;
        state.taskSuccess = true; // registration successful
      })
      .addCase(updateTask.rejected, (state, { payload }) => {
        state.taskLoading = false;
        state.taskError = payload;
      })
      // get user tasks
      .addCase(getTask.pending, (state, { payload }) => {
        state.taskLoading = true;
        state.taskError = null;
      })
      .addCase(getTask.fulfilled, (state, { payload }) => {
        state.taskLoading = false;
        state.taskSuccess = true; // registration successful
        state.dataTask = payload;
      })
      .addCase(getTask.rejected, (state, { payload }) => {
        state.taskLoading = false;
        state.taskError = payload;
      })
      // get single user task
      .addCase(getSingleTask.pending, (state, { payload }) => {
        state.taskLoading = true;
        state.taskError = null;
      })
      .addCase(getSingleTask.fulfilled, (state, { payload }) => {
        state.taskLoading = false;
        state.taskSuccess = true; // registration successful
        state.dataOneTask = payload;
      })
      .addCase(getSingleTask.rejected, (state, { payload }) => {
        state.taskLoading = false;
        state.taskError = payload;
      })
      // delete task
      .addCase(deleteTask.pending, (state, { payload }) => {
        state.taskLoading = true;
        state.taskError = null;
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.taskLoading = false;
        state.taskSuccess = true; // registration successful
      })
      .addCase(deleteTask.rejected, (state, { payload }) => {
        state.taskLoading = false;
        state.taskError = payload;
      });
  },
});

export const { logout, setCredentials } = slice.actions;
export default slice.reducer;
