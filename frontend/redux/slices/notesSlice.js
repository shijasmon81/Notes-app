import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/notes", { headers: { Authorization: `Bearer ${token}` } });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const addNote = createAsyncThunk(
  "notes/addNote",
  async (noteData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/notes", noteData, { headers: { Authorization: `Bearer ${token}` } });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ note_id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(`/notes/${note_id}`, data, { headers: { Authorization: `Bearer ${token}` } });
      return { note_id, ...data };
    } catch (err) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (note_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/notes/${note_id}`, { headers: { Authorization: `Bearer ${token}` } });
      return note_id;
    } catch (err) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => { state.loading = true; })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNote.fulfilled, (state, action) => { state.notes.push(action.payload); })
      .addCase(updateNote.fulfilled, (state, action) => {
        const idx = state.notes.findIndex(n => n.note_id === action.payload.note_id);
        if (idx !== -1) state.notes[idx] = action.payload;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(n => n.note_id !== action.payload);
      });
  },
});

export default notesSlice.reducer;
