import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CookiesProvider>
      <App />
      <Toaster/>
    </CookiesProvider>
  </BrowserRouter>
);
