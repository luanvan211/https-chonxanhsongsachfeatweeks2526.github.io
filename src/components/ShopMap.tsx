import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { MOCK_SHOPS, type CoffeeShop } from '../types/map';
import { MapPin, Phone, Ticket, X, Navigation, CheckCircle2 } from 'lucide-react';

const ShopMap: React.FC = () => {
  const { t } = useLanguage();
  const [selectedShop, setSelectedShop] = useState<CoffeeShop | null>(null);

  return (
    <div className="relative h-[600px] w-full rounded-3xl overflow-hidden bg-slate-100 border-2 border-slate-200">
      {/* Mock Map Background */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Map Pins */}
      <div className="relative h-full w-full">
        {MOCK_SHOPS.map((shop) => (
          <motion.button
            key={shop.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            onClick={() => setSelectedShop(shop)}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${((shop.lng - 106.6) * 500) % 80 + 20}%`,
              top: `${((shop.lat - 10.7) * 500) % 80 + 20}%`
            }}
          >
            <div className={`p-2 rounded-full shadow-lg ${shop.isRegistered ? 'bg-blue-600 text-white' : 'bg-slate-400 text-white'}`}>
              <MapPin size={24} />
            </div>
          </motion.button>
        ))}
      </div>

      {/* User Location Marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
           <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-xl animate-pulse" />
           <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping" />
        </div>
      </div>

      {/* Shop Detail Overlay */}
      <AnimatePresence>
        {selectedShop && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-0 inset-x-0 bg-white p-6 rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] z-20"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                   <h3 className="text-xl font-black">{selectedShop.name}</h3>
                   {selectedShop.isRegistered && <CheckCircle2 size={18} className="text-blue-500" />}
                </div>
                <p className="text-slate-400 text-sm font-medium">{selectedShop.address}</p>
              </div>
              <button
                onClick={() => setSelectedShop(null)}
                className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                {selectedShop.isRegistered ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
                       <Ticket size={16} />
                       {t('vouchers')}
                    </div>
                    {selectedShop.vouchers?.map(v => (
                      <div key={v.id} className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex justify-between items-center group cursor-pointer hover:bg-blue-600 transition-all">
                        <div>
                          <p className="font-black group-hover:text-white transition-colors">{v.discount}</p>
                          <p className="text-xs font-bold text-blue-400 group-hover:text-blue-200 transition-colors">{v.title}</p>
                        </div>
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                           <CheckCircle2 size={16} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-sm uppercase tracking-wider mb-2">
                       <Phone size={16} />
                       {t('contactInfo')}
                    </div>
                    <p className="font-black text-slate-700">{selectedShop.contact}</p>
                    <p className="text-xs text-slate-400 mt-2 italic">This shop is not yet a registered partner. Discounts may not apply.</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                 <button className="flex-1 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors p-4">
                    <Navigation size={18} />
                    Get Directions
                 </button>
                 <button className="flex-1 border-2 border-slate-200 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors p-4">
                    Website
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map UI Controls */}
      <div className="absolute top-6 right-6 flex flex-col gap-2">
         <button className="p-3 bg-white rounded-xl shadow-lg text-slate-600 hover:text-blue-600 transition-colors">
            <Navigation size={20} />
         </button>
      </div>
    </div>
  );
};

export default ShopMap;
