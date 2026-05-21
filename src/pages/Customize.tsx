import { useLanguage } from '../context/LanguageContext';
import BottleCustomizer from '../components/BottleCustomizer';
import { motion } from 'framer-motion';

const Customize = () => {
  const { t } = useLanguage();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="mb-8">
        <h2 className="text-4xl font-black mb-2">{t('customizeBottle')}</h2>
        <p className="text-slate-500 font-medium">{t('description')}</p>
      </div>
      <BottleCustomizer />
    </motion.section>
  );
};

export default Customize;
