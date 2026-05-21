import { motion } from 'framer-motion';
import { MOCK_SHOPS } from '../types/map';
import { Coffee, TrendingUp, Users, Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

const Admin = () => {
  const shops = MOCK_SHOPS;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black mb-2">Admin Dashboard</h2>
          <p className="text-slate-500 font-medium">Manage partners and view application analytics.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Add New Shop
        </button>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <Coffee size={24} />
             </div>
             <span className="text-green-500 font-bold text-sm">+12%</span>
          </div>
          <h3 className="text-3xl font-black">24</h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Total Partner Shops</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                <Users size={24} />
             </div>
             <span className="text-green-500 font-bold text-sm">+5%</span>
          </div>
          <h3 className="text-3xl font-black">1,240</h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Active Users</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <TrendingUp size={24} />
             </div>
             <span className="text-green-500 font-bold text-sm">+18%</span>
          </div>
          <h3 className="text-3xl font-black">5,420</h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Total Refills</p>
        </div>
      </div>

      {/* Shops Management */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
           <h3 className="text-xl font-black">Partner Coffee Shops</h3>
           <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-600">All</button>
              <button className="px-4 py-2 hover:bg-slate-50 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-400 transition-colors">Registered</button>
              <button className="px-4 py-2 hover:bg-slate-50 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-400 transition-colors">Pending</button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-4">Shop Name</th>
                <th className="px-8 py-4">Location</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Vouchers</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {shops.map((shop) => (
                <motion.tr key={shop.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <p className="font-bold text-slate-900">{shop.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">ID: {shop.id}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm text-slate-600">{shop.address}</p>
                  </td>
                  <td className="px-8 py-6">
                    {shop.isRegistered ? (
                       <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit text-[10px] font-black uppercase tracking-wider">
                          <CheckCircle size={12} />
                          Active
                       </div>
                    ) : (
                       <div className="flex items-center gap-1.5 text-slate-400 bg-slate-100 px-3 py-1 rounded-full w-fit text-[10px] font-black uppercase tracking-wider">
                          <XCircle size={12} />
                          Unregistered
                       </div>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-slate-700">{shop.vouchers?.length || 0} active</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                          <Edit size={18} />
                       </button>
                       <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 size={18} />
                       </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
