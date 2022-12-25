import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { IGeo } from "../utilities/interfaces";

interface IProps {
  ipData: IGeo | null | undefined;
}

function ChangeView({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const Map: React.FC<IProps> = ({ ipData }) => {
  return (
    <MapContainer
      center={[ipData?.location.lat || 0, ipData?.location.lng || 0]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "66.6666666%" }}
    >
      <ChangeView
        center={[ipData?.location.lat || 0, ipData?.location.lng || 0]}
        zoom={20}
      />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[ipData?.location.lat || 0, ipData?.location.lng || 0]}>
        <Popup>
          Hello from {ipData?.location.city} <br />
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
