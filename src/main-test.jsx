import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Simple test component
function TestApp() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>React App Test</h1>
      <p>If you can see this, React is working!</p>
      <button onClick={() => alert("Button clicked!")}>Test Button</button>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TestApp />
  </StrictMode>
);
