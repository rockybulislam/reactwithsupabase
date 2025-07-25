import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

// Async thunk for adding a post to Supabase
export const addPostToSupabase = createAsyncThunk(
  "createPost/addPost",
  async (postData, { rejectWithValue }) => {
    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const postWithUser = {
        ...postData,
        user_id: user?.id,
      };

      const { data, error } = await supabase
        .from("posts")
        .insert([postWithUser])
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const createPostSlice = createSlice({
  name: "createPost",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetForm: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPostToSupabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPostToSupabase.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(addPostToSupabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetForm } = createPostSlice.actions;
export default createPostSlice.reducer;
