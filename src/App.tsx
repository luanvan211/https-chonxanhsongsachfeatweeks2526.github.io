import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import UserLayout from './components/UserLayout';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import MapPage from './pages/MapPage';
import Shop from './pages/Shop';
import ScanPage from './pages/ScanPage';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import SupportDesk from './pages/SupportDesk';

const SimplePage = ({ title }: { title: string }) => (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-500">This feature is coming soon to ReBottle!</p>
    </div>
);

const SimpleAdminPage = ({ title }: { title: string }) => (
    <div className="bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-700 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-100 mb-2">{title}</h2>
        <p className="text-slate-400">This admin tool is under construction.</p>
    </div>
);

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 text-gray-900">
            <Routes>
              <Route path="/login" element={<Login />} />

              {/* User Routes */}
              <Route element={<ProtectedRoute allowedRoles={['user']} />}>
                <Route path="/dashboard" element={<UserLayout><Dashboard /></UserLayout>} />
                <Route path="/map" element={<UserLayout><MapPage /></UserLayout>} />
                <Route path="/scan" element={<UserLayout><ScanPage /></UserLayout>} />
                <Route path="/shop" element={<UserLayout><Shop /></UserLayout>} />
                <Route path="/account" element={<UserLayout><SimplePage title="My Account" /></UserLayout>} />
                <Route path="/settings" element={<UserLayout><SimplePage title="Settings" /></UserLayout>} />
                <Route path="/vouchers" element={<UserLayout><SimplePage title="Vouchers & Rewards" /></UserLayout>} />
                <Route path="/notifications" element={<UserLayout><SimplePage title="Notifications" /></UserLayout>} />
                <Route path="/messages" element={<UserLayout><SimplePage title="Messages" /></UserLayout>} />
              </Route>

              {/* Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
                <Route path="/admin/users" element={<AdminLayout><UserManagement /></AdminLayout>} />
                <Route path="/admin/support" element={<AdminLayout><SupportDesk /></AdminLayout>} />
                <Route path="/admin/shops" element={<AdminLayout><SimpleAdminPage title="Partner Shops Management" /></AdminLayout>} />
              </Route>

              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
