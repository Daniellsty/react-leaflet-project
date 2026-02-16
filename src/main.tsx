import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import StationsProvider from "./context/StationProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StationsProvider>
    <App />
  </StationsProvider>,
);
