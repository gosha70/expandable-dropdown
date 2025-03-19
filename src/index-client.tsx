// src/index-client.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.js";

const rootElem = document.getElementById("root");
if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(<App />);
}
