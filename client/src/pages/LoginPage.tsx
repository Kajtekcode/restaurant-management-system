import { useState } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react'; // Optional

interface LoginPageProps {
  setAuth: (auth: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/login', { email, password });
      setAuth(true);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-zinc-900 to-neutral-950 overflow-hidden p-4">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10 animate-pulse"></div>

      {/* Glassmorphic Login Card – Centered */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative w-full max-w-md p-10 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl"
      >
        {/* Welcome Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Welcome to Restaurant Management System
          </h1>
          <p className="text-zinc-400 mt-3 text-sm font-medium">
            Sign in to manage your restaurant with elegance
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-base placeholder-transparent focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
              placeholder="Email"
            />
            <label className="absolute left-5 -top-3 bg-zinc-900 px-3 text-sm font-semibold text-cyan-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-cyan-300 peer-focus:text-sm">
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-base placeholder-transparent focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all"
              placeholder="Password"
            />
            <label className="absolute left-5 -top-3 bg-zinc-900 px-3 text-sm font-semibold text-purple-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-purple-300 peer-focus:text-sm">
              Password
            </label>
          </div>

          {/* Error */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm font-medium bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-lg"
            >
              {error}
            </motion.p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="group relative w-full px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-cyan-500/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-zinc-900 text-base"
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5">
              <LogIn className="w-5 h-5 transition-transform group-hover:scale-110" />
              Login
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;