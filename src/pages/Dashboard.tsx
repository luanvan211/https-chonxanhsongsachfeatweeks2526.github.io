import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Coins, Droplets, Trophy, History } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { bottles } = useData();

  const userBottles = bottles.filter(b => b.ownerId === user?.id);

  const stats = [
    { label: 'Tokens', value: user?.tokens || 0, icon: Coins, color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Bottles', value: userBottles.length, icon: Droplets, color: 'bg-blue-100 text-blue-700' },
    { label: 'Refills', value: 24, icon: Trophy, color: 'bg-green-100 text-green-700' },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-gray-900">Hello, {user?.name}! 👋</h2>
        <p className="text-gray-500">Here's what's happening with your Chọn xanh sống sạchs today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
            <div className={`p-4 rounded-xl ${stat.color} mr-4`}>
              <stat.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900 flex items-center">
            <History className="w-5 h-5 mr-2 text-green-600" />
            Recent Activity
          </h3>
          <button className="text-sm text-green-600 font-medium hover:underline">View All</button>
        </div>
        <div className="divide-y divide-gray-100">
          {userBottles.length > 0 ? (
            userBottles.map((bottle) => (
              <div key={bottle.id} className="p-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                    bottle.color === 'Green' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Droplets className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{bottle.type} Registered</p>
                    <p className="text-sm text-gray-500">{new Date(bottle.registeredAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className="text-green-600 font-bold">+10 Tokens</span>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-gray-500">
              <p>No activity yet. Scan a bottle to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
