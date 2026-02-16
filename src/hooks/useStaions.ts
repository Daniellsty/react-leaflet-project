import { useContext } from "react";
import { StationsContext } from "../context/StaionsContext";

export function useStations() {
  const context = useContext(StationsContext);
  if (!context) {
    throw new Error("useStations must be used within StationsProvider");
  }
  return context;
}
