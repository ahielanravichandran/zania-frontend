import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { worker } from "../src/service/browser.ts";

async function enableMocking() {
  return worker.start({
    // Optionally handle unmatched requests
    onUnhandledRequest: "bypass",
  });
}
enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});

worker.start();
