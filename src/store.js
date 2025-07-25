import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counterslice";
import postSlice from "./features/postSlice";
import createPostSlice from "./features/createpostSlice";
const store = configureStore({
  reducer: {
    counter: counterSlice,
    posts: postSlice, // Ensure postSlice is imported from the correct file
    createPost: createPostSlice,
  },
});

export default store;
