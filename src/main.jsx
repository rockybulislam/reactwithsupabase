import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: 'blue' }}>🎉 Netlify Deploy Test</h1>
      <p>If you see this, React is working on Netlify!</p>
      <div style={{ backgroundColor: '#f0f8ff', padding: '15px', margin: '20px 0', borderRadius: '5px' }}>
        <h3>Environment Variables Check:</h3>
        <p><strong>Supabase URL:</strong> {import.meta.env.VITE_SUPABASE_URL || '❌ NOT LOADED'}</p>
        <p><strong>Supabase Key:</strong> {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ LOADED' : '❌ NOT LOADED'}</p>
      </div>
      <div style={{ backgroundColor: '#fff3cd', padding: '15px', margin: '20px 0', borderRadius: '5px' }}>
        <h3>Debug Info:</h3>
        <p><strong>Node ENV:</strong> {import.meta.env.MODE}</p>
        <p><strong>Current URL:</strong> {window.location.href}</p>
      </div>
    </div>
  </StrictMode>
);
