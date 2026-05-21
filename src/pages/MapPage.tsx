import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useData } from '../context/DataContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapPage: React.FC = () => {
  const { shops } = useData();

  return (
    <div className="h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {shops.map((shop) => (
          <Marker key={shop.id} position={[shop.lat, shop.lng]}>
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-lg text-green-700">{shop.name}</h3>
                <p className="text-gray-600">{shop.address}</p>
                <button className="mt-2 w-full bg-green-600 text-white text-xs py-1 rounded hover:bg-green-700 transition-colors">
                  Get Directions
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Search Overlay */}
      <div className="absolute top-4 left-4 z-[1000] right-4 md:right-auto md:w-80">
        <div className="bg-white rounded-xl shadow-xl p-4 border border-gray-100">
          <input
            type="text"
            placeholder="Search coffee shops..."
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-hidden"
          />
          <div className="mt-4 flex gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Nearby</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">Top Rated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
