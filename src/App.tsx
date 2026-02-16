import { useStations } from "./hooks/useStaions";
import Loader from "./components/Loader/Loader";
import CityFilter from "./components/CityFilter/CityFilter";
import MapView from "./components/MapView/MapView";
import Error from "./components/Error/Error";

const App = () => {
  const { filtered, loading, error, filterByCity } = useStations();

  if (loading) return <Loader />;
  if (error) return <Error message={error.message} />;

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute top-4 left-16 z-20 bg-gray-50">
        <CityFilter onFilter={filterByCity} />
      </div>

      <MapView stations={filtered} />
    </div>
  );
};

export default App;
