import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { type CustomizationState, COLORS, CHARMS } from '../types/customization';
import { Check, Edit3, Sparkles, Upload, Image as ImageIcon, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const BottleCustomizer: React.FC = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [config, setConfig] = useState<CustomizationState>({
    type: 'metal',
    color: COLORS[0].value,
    charms: [],
    engraving: '',
  });

  const toggleCharm = (id: string) => {
    setConfig(prev => ({
      ...prev,
      charms: prev.charms?.includes(id)
        ? prev.charms.filter(c => c !== id)
        : [...(prev.charms || []), id]
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-8">
      {/* Visual Preview */}
      <div className="bg-white rounded-3xl p-12 shadow-xl flex items-center justify-center min-h-[500px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 opacity-50" />

        <motion.div
          layout
          className="relative z-10 w-48 h-80 rounded-[3rem] border-8 border-slate-200 shadow-2xl overflow-hidden"
          style={{ backgroundColor: config.color }}
        >
          {/* Bottle Cap */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-12 bg-slate-800 rounded-t-xl mt-[-8px]" />

          {/* Custom Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
             {config.image && (
               <motion.img
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 src={config.image}
                 className="w-24 h-24 object-contain mb-4"
               />
             )}
             {config.type === 'metal' && config.engraving && (
               <motion.span
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="text-white/40 font-serif text-xl rotate-90 whitespace-nowrap"
               >
                 {config.engraving}
               </motion.span>
             )}

             {config.type === 'tritan' && (
               <div className="flex flex-wrap gap-2 justify-center">
                 {config.charms?.map(charmId => (
                   <motion.span
                    key={charmId}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-2xl"
                   >
                     {CHARMS.find(c => c.id === charmId)?.icon}
                   </motion.span>
                 ))}
               </div>
             )}
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
          <button
            onClick={() => setConfig(p => ({ ...p, type: 'metal' }))}
            className={`px-4 py-2 rounded-full font-bold transition-all ${config.type === 'metal' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400'}`}
          >
            {t('metal')}
          </button>
          <button
            onClick={() => setConfig(p => ({ ...p, type: 'tritan' }))}
            className={`px-4 py-2 rounded-full font-bold transition-all ${config.type === 'tritan' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400'}`}
          >
            {t('tritan')}
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="text-blue-500" />
            {t('customizeBottle')}
          </h3>

          <div className="space-y-8">
            {/* Color Selection */}
            <section>
              <h4 className="text-sm font-uppercase tracking-wider text-slate-400 font-bold mb-4 uppercase">Colors</h4>
              <div className="flex gap-4">
                {COLORS.map(color => (
                  <button
                    key={color.value}
                    onClick={() => setConfig(p => ({ ...p, color: color.value }))}
                    className={`w-10 h-10 rounded-full border-4 transition-transform ${config.color === color.value ? 'border-blue-500 scale-110' : 'border-transparent hover:scale-105'}`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </section>

            {/* Type Specific Options */}
            <AnimatePresence mode="wait">
              {config.type === 'metal' ? (
                <motion.section
                  key="metal-opts"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h4 className="text-sm font-uppercase tracking-wider text-slate-400 font-bold mb-4 uppercase flex items-center gap-2">
                    <Edit3 size={16} /> Laser Engraving
                  </h4>
                  <input
                    type="text"
                    value={config.engraving}
                    onChange={(e) => setConfig(p => ({ ...p, engraving: e.target.value }))}
                    placeholder="Enter text here..."
                    className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors bg-white text-slate-900"
                    maxLength={15}
                  />
                </motion.section>
              ) : (
                <motion.section
                  key="tritan-opts"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h4 className="text-sm font-uppercase tracking-wider text-slate-400 font-bold mb-4 uppercase">Charms</h4>
                  <div className="grid grid-cols-4 gap-4">
                    {CHARMS.map(charm => (
                      <button
                        key={charm.id}
                        onClick={() => toggleCharm(charm.id)}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${config.charms?.includes(charm.id) ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:border-slate-200'}`}
                      >
                        <span className="text-2xl">{charm.icon}</span>
                        <span className="text-xs font-bold text-slate-500">{charm.name}</span>
                        {config.charms?.includes(charm.id) && <Check size={12} className="text-blue-500" />}
                      </button>
                    ))}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* Image Upload */}
            <section>
              <h4 className="text-sm font-uppercase tracking-wider text-slate-400 font-bold mb-4 uppercase flex items-center gap-2">
                <Upload size={16} /> Custom Graphic
              </h4>
              <div className="flex gap-4">
                <label className="flex-1 border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all text-slate-400 hover:text-blue-600">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (re) => setConfig(p => ({ ...p, image: re.target?.result as string }));
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <ImageIcon size={24} />
                  <span className="text-xs font-bold uppercase tracking-widest">Upload Image</span>
                </label>
                {config.image && (
                  <button
                    onClick={() => setConfig(p => ({ ...p, image: undefined }))}
                    className="px-4 border-2 border-slate-100 rounded-xl text-slate-400 hover:text-red-500 hover:border-red-100 transition-all text-[10px] font-black uppercase tracking-widest"
                  >
                    Remove
                  </button>
                )}
              </div>
            </section>

            <button
              onClick={() => {
                addToCart({
                  id: `custom-${Date.now()}`,
                  name: `Custom Chọn xanh sống sạch ${config.type === 'metal' ? 'Metal' : 'Tritan'}`,
                  price: config.type === 'metal' ? 450000 : 250000,
                  qty: 1,
                  customization: config
                });
                navigate('/shop');
              }}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottleCustomizer;
