import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import App from "./App";

// Find the root element in your HTML
const rootElement = document.getElementById("root");

// Create a root using createRoot
const root = createRoot(rootElement);

// Render your app inside the root
root.render(<App />);