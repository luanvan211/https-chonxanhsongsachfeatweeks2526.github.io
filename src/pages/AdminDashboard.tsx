import React from 'react';
import { useData } from '../context/DataContext';
import { Users, Droplets, Store, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { users, bottles, shops } = useData();

  const stats = [
    { label: 'Total Users', value: users.length + 1240, icon: Users, trend: '+12%', up: true },
    { label: 'Active Bottles', value: bottles.length + 850, icon: Droplets, trend: '+5%', up: true },
    { label: 'Partner Shops', value: shops.length, icon: Store, trend: '0%', up: true },
    { label: 'Avg. Daily Refills', value: '3.2k', icon: TrendingUp, trend: '-2%', up: false },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white">Analytics Overview</h2>
          <p className="text-slate-400">Real-time performance metrics for ReBottle Ecosystem</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-700 rounded-xl text-indigo-400">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${
                stat.up ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
              }`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-slate-700">
            <h3 className="font-bold text-slate-200">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase tracking-widest text-slate-500 bg-slate-800/50">
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                  <th className="px-6 py-4 font-semibold">Location</th>
                  <th className="px-6 py-4 font-semibold">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {[1,2,3,4,5].map((i) => (
                  <tr key={i} className="hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-slate-600 mr-3"></div>
                      <span className="text-sm font-medium">User #{i}482</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Refill</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">Sustainable Brew</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{i * 2} mins ago</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-xl">
          <h3 className="font-bold text-slate-200 mb-6">Distribution by Region</h3>
          <div className="space-y-6">
            {[
              { name: 'London Central', value: 65, color: 'bg-indigo-500' },
              { name: 'Manchester', value: 42, color: 'bg-emerald-500' },
              { name: 'Bristol', value: 28, color: 'bg-amber-500' },
              { name: 'Edinburgh', value: 15, color: 'bg-rose-500' },
            ].map((region) => (
              <div key={region.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400 font-medium">{region.name}</span>
                  <span className="text-white font-bold">{region.value}%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full ${region.color}`} style={{ width: `${region.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
