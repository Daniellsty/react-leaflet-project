import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Station } from "../../api/station";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface Props {
  stations: Station[];
}

const defaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const MapView = ({ stations }: Props) => {
  return (
    <MapContainer
      center={[51.1657, 10.4515]}
      zoom={6}
      style={{ height: "100vh", width: "100vw", zIndex: 0 }}
    >
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {stations.map((st) => (
        <Marker key={st.id} position={[st.lat, st.lng] as [number, number]}>
          <Popup>
            {st.name} — {st.city}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
