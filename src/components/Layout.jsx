import React from "react";
import { Outlet, Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../../supabase";

const Layout = () => {
  const { user, loading } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-xl font-bold text-gray-800">
                My App
              </Link>
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                >
                  Home
                </Link>
                <Link
                  to="/posts"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                >
                  Posts
                </Link>
                <Link
                  to="/create-post"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                >
                  Create Post
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
