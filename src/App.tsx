import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { UserProvider, useUser } from './context/UserContext';
import { CartProvider, useCart } from './context/CartContext';
import Home from './pages/Home';
import Customize from './pages/Customize';
import MapPage from './pages/MapPage';
import Admin from './pages/Admin';
import Shop from './pages/Shop';
import Profile from './pages/Profile';
import SettingsPage from './pages/Settings';
import { Droplet, User as UserIcon, LogIn, Settings, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const { isLoggedIn, tier } = useUser();
  const { cart } = useCart();
  const location = useLocation();

  const tabs = [
    { name: 'home', path: '/' },
    { name: 'customize', path: '/customize' },
    { name: 'map', path: '/map' },
    { name: 'shop', path: '/shop' },
    { name: 'profile', path: '/profile' },
    { name: 'admin', path: '/admin' },
  ];

  const cartCount = cart.reduce((a, b) => a + b.qty, 0);

  return (
    <header className="p-4 bg-white/80 backdrop-blur-md shadow-sm flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <Droplet className="text-white" />
        </div>
        <h1 className="text-xl font-black tracking-tight uppercase">AquaLink</h1>
      </Link>

      <nav className="flex items-center gap-8">
        <ul className="hidden xl:flex gap-6 font-bold text-slate-400 uppercase text-[10px] tracking-widest">
          {tabs.map((tab) => (
            <li key={tab.name} className="relative py-2">
              <Link
                to={tab.path}
                className={`transition-all ${location.pathname === tab.path ? 'text-blue-600' : 'hover:text-slate-900'}`}
              >
                {t(tab.name as any)}
              </Link>
              {location.pathname === tab.path && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 border-l pl-8">
          <button
            onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
            className="text-[10px] font-black px-2 py-1 border-2 border-slate-900 rounded hover:bg-slate-900 hover:text-white transition-colors uppercase"
          >
            {language.toUpperCase()}
          </button>

          <Link to="/shop" className="relative text-slate-400 hover:text-slate-900 transition-colors">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
             <Link to="/profile" className="flex items-center gap-2 bg-slate-100 p-1 pr-3 rounded-full">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  <UserIcon size={14} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider">{tier.split(' ')[1]}</span>
             </Link>
          ) : (
            <button className="text-slate-400 hover:text-slate-900">
              <LogIn size={20} />
            </button>
          )}

          <Link to="/settings" className="text-slate-400 hover:text-slate-900">
            <Settings size={20} />
          </Link>
        </div>
      </nav>
    </header>
  );
};

function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-slate-50 text-slate-900 w-full flex flex-col font-sans">
              <Navbar />
              <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/customize" element={<Customize />} />
                  <Route path="/map" element={<MapPage />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </main>
              <footer className="p-8 border-t bg-white mt-auto">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                  <p>© 2024 AQUALINK BRAND • BORN IN VIETNAM</p>
                  <div className="flex gap-8">
                    <p className="hover:text-slate-900 cursor-pointer transition-colors">Privacy</p>
                    <p className="hover:text-slate-900 cursor-pointer transition-colors">Terms</p>
                  </div>
                </div>
              </footer>
            </div>
          </Router>
        </CartProvider>
      </UserProvider>
    </LanguageProvider>
  )
}

export default App
