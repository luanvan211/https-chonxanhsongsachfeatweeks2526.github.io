import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Map as MapIcon,
  User,
  Settings,
  Ticket,
  Bell,
  MessageSquare,
  QrCode,
  ShoppingBag,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/map', icon: MapIcon, label: 'Map' },
    { to: '/scan', icon: QrCode, label: 'Scan' },
    { to: '/shop', icon: ShoppingBag, label: 'Shop' },
    { to: '/vouchers', icon: Ticket, label: 'Vouchers' },
    { to: '/messages', icon: MessageSquare, label: 'Messages' },
    { to: '/notifications', icon: Bell, label: 'Alerts' },
    { to: '/account', icon: User, label: 'Profile' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-green-600">Chọn xanh sống sạch</h1>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold mr-3">
              {user?.name[0].toUpperCase()}
            </div>
            <div className="text-sm font-medium text-gray-900 truncate">{user?.name}</div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-50">
          <h1 className="text-xl font-bold text-green-600">Chọn xanh sống sạch</h1>
          <button onClick={handleLogout} className="text-red-600">
            <LogOut className="w-6 h-6" />
          </button>
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {children}
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 z-50">
          {navItems.slice(0, 5).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center p-2 rounded-lg ${
                  isActive ? 'text-green-600' : 'text-gray-500'
                }`
              }
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] mt-1">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        {/* Spacer for mobile nav */}
        <div className="h-20 md:hidden"></div>
      </main>
    </div>
  );
};

export default UserLayout;
