import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./features/counterslice";
import { Link } from "react-router-dom";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to My App
        </h1>
        <p className="text-gray-600 mb-8">
          A simple React app with Redux, Supabase, and authentication.
        </p>
      </div>

      {/* Counter Section */}
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <h2 className="text-xl font-semibold mb-4">Counter</h2>
        <div className="text-3xl font-bold text-blue-600 mb-4">{count}</div>
        <div className="space-x-4">
          <button
            onClick={() => dispatch(increment())}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Increment
          </button>
          <button
            onClick={() => dispatch(decrement())}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Decrement
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/posts"
          className="bg-blue-500 text-white p-6 rounded-lg hover:bg-blue-600 text-center block"
        >
          <h3 className="text-lg font-semibold">View Posts</h3>
          <p className="text-blue-100">See all your posts</p>
        </Link>

        <Link
          to="/create-post"
          className="bg-purple-500 text-white p-6 rounded-lg hover:bg-purple-600 text-center block"
        >
          <h3 className="text-lg font-semibold">Create Post</h3>
          <p className="text-purple-100">Write a new post</p>
        </Link>
      </div>
    </div>
  );
}
export default App;
