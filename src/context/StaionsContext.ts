import { createContext } from "react";
import type { StationsContextType } from "./StationProvider";

export const StationsContext = createContext<StationsContextType | undefined>(
  undefined
);
