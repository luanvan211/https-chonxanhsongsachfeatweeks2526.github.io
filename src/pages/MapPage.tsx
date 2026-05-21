import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useLanguage } from '../context/LanguageContext';
import { MOCK_SHOPS } from '../types/map';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'framer-motion';

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
  const { t } = useLanguage();

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div className="mb-8">
        <h2 className="text-4xl font-black mb-2">{t('locateCoffeeShops')}</h2>
        <p className="text-slate-500 font-medium">Discover partners giving discounts for using your Chọn xanh sống sạch bottle.</p>
      </div>

      <div className="h-[600px] w-full rounded-3xl overflow-hidden shadow-lg border-2 border-slate-200">
        <MapContainer center={[10.762622, 106.660172]} zoom={13} scrollWheelZoom={true} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {MOCK_SHOPS.map((shop) => (
            <Marker key={shop.id} position={[shop.lat, shop.lng]}>
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-lg text-blue-700">{shop.name}</h3>
                  <p className="text-gray-600 text-sm">{shop.address}</p>
                  {shop.isRegistered && (
                    <div className="mt-2 p-2 bg-blue-50 border border-blue-100 rounded">
                      <p className="text-blue-600 font-bold text-xs uppercase">Partnered Shop</p>
                    </div>
                  )}
                  <button className="mt-3 w-full bg-slate-900 text-white text-xs py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors uppercase tracking-wider">
                    Get Directions
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </motion.section>
  );
};

export default MapPage;
