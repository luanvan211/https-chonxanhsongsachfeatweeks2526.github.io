import { useLanguage } from '../context/LanguageContext';
import ShopMap from '../components/ShopMap';
import { motion } from 'framer-motion';

const MapPage = () => {
  const { t } = useLanguage();

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div className="mb-8">
        <h2 className="text-4xl font-black mb-2">{t('locateCoffeeShops')}</h2>
        <p className="text-slate-500 font-medium">Discover partners giving discounts for using your AquaLink bottle.</p>
      </div>
      <ShopMap />
    </motion.section>
  );
};

export default MapPage;
