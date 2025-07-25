import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

// async thunk for fetching posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data, error } = await supabase.from("posts").select("*");
  if (error) throw error;
  return data;
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addPost, removePost } = postSlice.actions;
export default postSlice.reducer;
