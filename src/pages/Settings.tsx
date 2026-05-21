import { useLanguage } from '../context/LanguageContext';
import { Bell, Shield, Globe } from 'lucide-react';

const SettingsPage = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-4xl font-black mb-2">Settings</h2>
        <p className="text-slate-500 font-medium">Manage your account and app preferences.</p>
      </div>

      <div className="space-y-6">
         {/* Preferences */}
         <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center gap-3">
               <Globe className="text-blue-500" />
               <h3 className="font-bold">App Preferences</h3>
            </div>
            <div className="p-8 space-y-6">
               <div className="flex justify-between items-center">
                  <div>
                     <p className="font-bold">Language</p>
                     <p className="text-xs text-slate-400">Choose your preferred display language.</p>
                  </div>
                  <div className="flex gap-2">
                     <button
                       onClick={() => setLanguage('vi')}
                       className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border-2 transition-all ${language === 'vi' ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-100 text-slate-400'}`}
                     >
                       VI
                     </button>
                     <button
                       onClick={() => setLanguage('en')}
                       className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border-2 transition-all ${language === 'en' ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-100 text-slate-400'}`}
                     >
                       EN
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* Notifications */}
         <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center gap-3">
               <Bell className="text-orange-500" />
               <h3 className="font-bold">Notifications</h3>
            </div>
            <div className="p-8 space-y-6">
               <div className="flex justify-between items-center">
                  <div>
                     <p className="font-bold">Push Notifications</p>
                     <p className="text-xs text-slate-400">Receive alerts about your bottle activity.</p>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                     <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
               </div>
               <div className="flex justify-between items-center">
                  <div>
                     <p className="font-bold">Marketing Emails</p>
                     <p className="text-xs text-slate-400">Get news about new partners and products.</p>
                  </div>
                  <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                     <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
               </div>
            </div>
         </div>

         {/* Security */}
         <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center gap-3">
               <Shield className="text-green-500" />
               <h3 className="font-bold">Privacy & Security</h3>
            </div>
            <div className="p-8">
               <button className="text-sm font-bold text-blue-600 hover:underline">Change Password</button>
               <div className="h-4" />
               <button className="text-sm font-bold text-red-500 hover:underline">Delete Account</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SettingsPage;
