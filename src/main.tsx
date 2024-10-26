import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import "primeicons/primeicons.css";
import "./index.css";
import App from "./App.tsx";

const value = {
  appendTo: "self",
  ripple: true,
  locale: "en",
  localeCountry: "US",
  localeWeekStart: 0,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider value={value}>
      <App />
    </PrimeReactProvider>
  </StrictMode>
);
