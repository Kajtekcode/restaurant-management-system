import { useState } from 'react';
import api from '../services/api';

interface NavbarProps {
  setAuth: (auth: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setAuth }) => {
  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      setAuth(false);
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Restaurant Management</h1>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
    </nav>
  );
};

export default Navbar;
