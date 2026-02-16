import { useEffect, useState, type ReactNode } from "react";
import type { Station } from "../api/station";
import { fetchStations } from "../api/station";
import { StationsContext } from "./StaionsContext";

export type StationsContextType = {
  stations: Station[];
  filtered: Station[];
  loading: boolean;
  error: Error | null;
  filterByCity: (city: string) => void;
};

const StationsProvider = ({ children }: { children: ReactNode }) => {
  const [stations, setStations] = useState<Station[]>([]);
  const [filtered, setFiltered] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadStations() {
      try {
        const data = await fetchStations();
        setStations(data);
        setFiltered(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    loadStations();
  }, []);

  const filterByCity = (city: string) => {
    if (!city) return setFiltered(stations);
    setFiltered(
      stations.filter((s) => s.city.toLowerCase().includes(city.toLowerCase()))
    );
  };

  return (
    <StationsContext.Provider
      value={{
        stations,
        filtered,
        loading,
        error,
        filterByCity,
      }}
    >
      {children}
    </StationsContext.Provider>
  );
};

export default StationsProvider;
