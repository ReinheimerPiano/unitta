import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const Root = import.meta.env.PROD ? (
  <StrictMode>
    <App />
  </StrictMode>
) : (
  <App />
);

createRoot(document.getElementById("root")!).render(Root);
