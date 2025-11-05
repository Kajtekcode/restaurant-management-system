// src/App.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import api from './services/api';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MenuPage from './pages/MenuPage'; // ← NEW
import ReservationsPage from './pages/ReservationsPage';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('/auth/me');
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-zinc-900 to-neutral-950 flex items-center justify-center">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage setAuth={setIsAuthenticated} />} />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="min-h-screen bg-gradient-to-br from-slate-950 via-zinc-900 to-neutral-950">
                <Navbar setAuth={setIsAuthenticated} />
                <Routes>
                  <Route path="/dashboard" element={<DashboardPage setAuth={setIsAuthenticated} />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/reservations" element={<ReservationsPage />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;