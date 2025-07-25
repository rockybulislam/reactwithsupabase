import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabase";
import { useAuth } from "./hooks/useAuth";

const LoginPage = () => {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Redirect if already logged in
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setMessage("");

    try {
      if (isSignUp) {
        // Sign up new user
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
        setMessage("Check your email for verification link!");
      } else {
        // Sign in existing user
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        // No need to set message, user will be redirected
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Successfully signed out!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        {isSignUp ? "Sign Up" : "Sign In"}
      </h2>

      {message && (
        <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
          {message}
        </div>
      )}

      <form onSubmit={handleAuth}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={authLoading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50 mb-4"
        >
          {authLoading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="w-full text-blue-500 hover:underline mb-2"
      >
        {isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </button>

      <button
        onClick={handleSignOut}
        className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
};

export default LoginPage;
