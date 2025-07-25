import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostToSupabase, clearError } from "./features/createpostSlice";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.createPost);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      return;
    }

    const postData = {
      title: title.trim(),
      content: description.trim(),
      created_at: new Date().toISOString(),
    };

    console.log("Attempting to add post:", postData);

    try {
      const result = await dispatch(addPostToSupabase(postData)).unwrap();
      console.log("Post added successfully:", result);
      // Clear form on success
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Failed to add post:", error);
    }
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
          <button onClick={handleClearError} className="text-sm underline mt-2">
            Dismiss
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter post title"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 h-24 resize-none"
            placeholder="Enter post description"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !title.trim() || !description.trim()}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding Post..." : "Add Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
