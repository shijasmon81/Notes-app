import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;
const savedUserName =
  typeof window !== "undefined" ? localStorage.getItem("user_name") : null;

const initialState = {
  user_name: savedUserName || null,
  token: token || null,
  loading: false,
  error: null,
};

// Helper function to extract readable error message
const getErrorMessage = (err) => {
  if (err?.response?.data?.detail) {
    const detail = err.response.data.detail;
    if (typeof detail === "string") return detail;
    if (typeof detail === "object" && detail.msg) return detail.msg;
    return JSON.stringify(detail); // fallback to stringifying
  }
  return "Something went wrong. Please try again.";
};

// Signup thunk
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/signup", userData);
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user_name", res.data.user_name);
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// Login thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", userData);
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user_name", res.data.user_name);
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user_name = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user_name");
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user_name = action.payload.user_name;
        state.token = action.payload.access_token;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user_name = action.payload.user_name;
        state.token = action.payload.access_token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
