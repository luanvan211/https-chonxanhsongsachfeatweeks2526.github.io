import { useAuth } from '../context/AuthContext';
import QRScanner from '../components/QRScanner';
import { Settings, Bell, LogOut, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const points = user.points || 0;
  const getTier = (pts: number) => {
    if (pts > 500) return 'Aqua Legend';
    if (pts > 200) return 'Aqua Hero';
    if (pts > 50) return 'Aqua Fan';
    return 'Aqua Rookie';
  };
  const tier = getTier(points);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-end">
         <div className="w-32 h-32 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-white text-4xl font-black">
            {user.name.substring(0, 2).toUpperCase()}
         </div>
         <div className="text-center md:text-left flex-1">
            <h2 className="text-4xl font-black mb-1">{user.name}</h2>
            <p className="text-slate-500 font-medium">{tier} • {points} Points</p>
         </div>
         <div className="flex gap-2">
            <Link to="/settings" className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-400 hover:text-slate-900 transition-colors">
               <Settings size={20} />
            </Link>
            <button
               onClick={logout}
               className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-400 hover:text-slate-900 transition-colors"
            >
               <LogOut size={20} />
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-8">
            <h3 className="text-xl font-black flex items-center gap-2">
               <Bell size={20} className="text-blue-500" />
               Notifications
            </h3>
            <div className="space-y-4">
               {[
                 { title: 'Goal Reached!', desc: 'You saved 10 plastic bottles this week!', time: '2h ago' },
                 { title: 'New Partner Near You', desc: 'Cong Caphe just joined the Chọn xanh sống sạch network.', time: '1d ago' },
               ].map((n, i) => (
                 <div key={i} className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="font-bold text-sm mb-1">{n.title}</p>
                    <p className="text-xs text-slate-400 font-medium">{n.desc}</p>
                    <p className="text-[10px] text-slate-300 font-black uppercase mt-4 tracking-widest">{n.time}</p>
                 </div>
               ))}
            </div>
         </div>

         <div className="space-y-8">
            <h3 className="text-xl font-black flex items-center gap-2">
               <QrCode size={20} className="text-blue-500" />
               Register New Bottle
            </h3>
            <QRScanner />
         </div>
      </div>
    </div>
  );
};

export default Profile;
