import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import UserManagement from './pages/UserManagementPage';
import ChargingStationManagement from './pages/ChargingStationPage';
import Dashboard from './pages/Dashboard';
import EditChargingStationPage from './pages/EditChargingStationPage';
import TechnicalPage from './pages/TechnicalPage';
import HistoryChargingPage from './pages/HistoryChargingPage';
import EditUserPage from './pages/EditUserPage';
import HistoryUserStationPage from './pages/HistoryUserStationPage';
import AddUserPage from './pages/AddUserPage';
import AddChargingStationPage from './pages/AddChargingStationPage';
import LoginPage from './pages/LoginPage';
import PrivacyPolicy from './pages/Policy';

const ProtectedRoute: React.FC<{ children: React.ReactNode; isAuthenticated: boolean }> = ({ children, isAuthenticated }) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Lưu vào localStorage
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Xóa trạng thái đăng nhập khỏi localStorage
    localStorage.removeItem('phoneNumber'); // Xóa phoneNumber khỏi localStorage
  };

  return (
    <Router>
      <div className="flex">
        {isAuthenticated && <Sidebar onLogout={handleLogout}/>} {/* Hiện sidebar nếu đã đăng nhập */}
        <div className={isAuthenticated ? "ml-64 p-6 flex-1" : "p-6 flex-1"}>
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/charging-stations"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ChargingStationManagement />
                </ProtectedRoute>
              }
            />
            <Route path="/edit-station/:id" element={<EditChargingStationPage />} />
            <Route path="/edit-user/:id" element={<EditUserPage />} />
            <Route path="/technical-support" element={<TechnicalPage />} />
            <Route path="/history-charging/:id" element={<HistoryChargingPage />} />
            <Route path="/charging-station-history/:stationName" element={<HistoryUserStationPage />} />
            <Route path="/add-user" element={<AddUserPage />} />
            <Route path="/add-station" element={<AddChargingStationPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
