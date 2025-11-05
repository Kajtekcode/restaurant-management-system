// src/pages/DashboardPage.tsx
import { useState, useEffect } from 'react';
import * as menuService from '../services/menuService';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Utensils, Clock } from 'lucide-react';

interface DashboardPageProps {
  setAuth: (auth: boolean) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ setAuth }) => {
  const [menuCount, setMenuCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await menuService.getMenu();
        setMenuCount(response.data.length);
      } catch (error) {
        console.error('Error fetching menu count', error);
      }
    };
    fetchCount();
  }, []);

  const stats = [
    { label: "Today's Reservations", value: 5, icon: Calendar, color: 'from-cyan-400 to-blue-600' },
    { label: 'Menu Items', value: menuCount, icon: Utensils, color: 'from-emerald-400 to-teal-600' },
    { label: 'Pending Orders', value: 0, icon: Clock, color: 'from-purple-400 to-pink-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-zinc-900 to-neutral-950">
      <div className="pt-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="mt-3 text-zinc-400 text-lg">
            Monitor your restaurant performance at a glance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-4xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Link to="/menu">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl text-center cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-2xl font-bold text-white mb-2">Menu Management</h3>
              <p className="text-zinc-400">View, edit, or add menu items</p>
            </motion.div>
          </Link>

          <Link to="/reservations">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl text-center cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-2xl font-bold text-white mb-2">Reservations</h3>
              <p className="text-zinc-400">Check today’s bookings and guest details</p>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
