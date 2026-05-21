import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { Droplet, ShoppingBag, Award, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const { t } = useLanguage();
  const { refills, plasticSaved, tier, points } = useUser();

  const stats = [
    { label: t('refills'), value: refills, icon: Droplet, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: t('plasticSaved'), value: plasticSaved, icon: ShoppingBag, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Status', value: tier, icon: Award, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Balance', value: `${points} pts`, icon: CreditCard, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  return (
    <div className="space-y-12 py-12">
      <div className="text-center max-w-2xl mx-auto">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-6xl font-black tracking-tight mb-6 leading-[1.1]"
        >
          {t('welcome')}
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 font-medium text-xl"
        >
          {t('description')}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 group hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
              <stat.icon className={stat.color} />
            </div>
            <h3 className="font-black text-3xl mb-1 text-center">{stat.value}</h3>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest text-center">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <Link
          to="/customize"
          className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col justify-between min-h-[300px] cursor-pointer group overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-500" />
          <h3 className="text-4xl font-black max-w-[200px] leading-tight relative z-10">CRAFT YOUR PERFECT BOTTLE</h3>
          <div className="flex justify-between items-center relative z-10">
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Explore Options</p>
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-colors">→</div>
          </div>
        </Link>
        <Link
          to="/map"
          className="bg-blue-600 rounded-[2.5rem] p-10 text-white flex flex-col justify-between min-h-[300px] cursor-pointer group overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-500" />
          <h3 className="text-4xl font-black max-w-[200px] leading-tight relative z-10">FIND COFFEE REWARDS NEAR YOU</h3>
          <div className="flex justify-between items-center relative z-10">
            <p className="text-blue-200 font-bold uppercase text-[10px] tracking-[0.2em]">Open Map</p>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-colors">→</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
