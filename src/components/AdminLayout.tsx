import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Users,
  LifeBuoy,
  Store,
  LogOut,
  ShieldCheck,
  Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/admin', icon: BarChart3, label: 'Analytics' },
    { to: '/admin/users', icon: Users, label: 'User Management' },
    { to: '/admin/shops', icon: Store, label: 'Partner Shops' },
    { to: '/admin/support', icon: LifeBuoy, label: 'Support Desk' },
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-6 flex items-center space-x-2">
          <ShieldCheck className="w-8 h-8 text-indigo-400" />
          <h1 className="text-xl font-bold tracking-tight">Chọn xanh sống sạch Admin</h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'text-slate-400 hover:bg-slate-700 hover:text-slate-100'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700 bg-slate-800/50">
          <div className="flex items-center mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-3 border-2 border-indigo-400">
              {user?.name[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-100 truncate">{user?.name}</p>
              <p className="text-xs text-slate-400 truncate">System Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-slate-400 rounded-lg hover:bg-slate-700 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-900">
        <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-8">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Management Console</h2>
            <div className="flex items-center space-x-4">
                <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-800"></span>
                </button>
            </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
