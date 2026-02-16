import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import StationsProvider from "./context/StationProvider";

createRoot(document.getElementById("root")!).render(
  <StationsProvider>
    <App />
  </StationsProvider>,
);
