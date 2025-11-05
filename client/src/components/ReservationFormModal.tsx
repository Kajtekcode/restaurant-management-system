import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as reservationService from '../services/reservationService';
import { X, CheckCircle } from 'lucide-react';

interface ReservationFormModalProps {
  reservation: any | null;
  onClose: () => void;
  onSave: () => void;
}

const ReservationFormModal = ({ reservation, onClose, onSave }: ReservationFormModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: 1,
    date: new Date().toISOString(),
    table: 0,
    status: 'confirmed',
  });

  useEffect(() => {
    if (reservation) {
      setFormData({
        name: reservation.name,
        phone: reservation.phone || '',
        email: reservation.email || '',
        guests: reservation.guests,
        date: reservation.date,
        table: reservation.table || 0,
        status: reservation.status,
      });
    }
  }, [reservation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (reservation) {
        await reservationService.updateReservation(reservation.id, formData);
      } else {
        await reservationService.createReservation(formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving reservation', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative bg-zinc-900/80 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl p-8 w-full max-w-xl" // Wider max-w-xl
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {reservation ? 'Edit Reservation' : 'New Reservation'}
          </h2>
          <p className="text-zinc-400 text-base mt-2">Enter guest details below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="peer w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-base placeholder-transparent focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              placeholder="Name"
            />
            <label className="absolute left-5 -top-3 bg-zinc-900 px-3 text-sm font-semibold text-cyan-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-cyan-300 peer-focus:text-sm">
              Name
            </label>
          </div>

          {/* Phone */}
          <div className="relative">
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="peer w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-base placeholder-transparent focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
              placeholder="Phone"
            />
            <label className="absolute left-5 -top-3 bg-zinc-900 px-3 text-sm font-semibold text-emerald-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-emerald-300 peer-focus:text-sm">
              Phone
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="peer w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-base placeholder-transparent focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
              placeholder="Email"
            />
            <label className="absolute left-5 -top-3 bg-zinc-900 px-3 text-sm font-semibold text-purple-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-purple-300 peer-focus:text-sm">
              Email
            </label>
          </div>

          {/* Guests */}
          <div className="relative">
            <input
              name="guests"
              type="number"
              value={formData.guests}
              onChange={handleChange}
              required
              min="1"
              className="peer w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-base placeholder-transparent focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
              placeholder="Guests"
            />
            <label className="absolute left-5 -top-3 bg-zinc-900 px-3 text-sm font-semibold text-amber-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-amber-300 peer-focus:text-sm">
              Guests
            </label>
          </div>

          {/* Date & Time */}
          <div className="relative">
            <input
              name="date"
              type="datetime-local"
              value={formData.date.slice(0, 16)}
              onChange={handleChange}
              required
              className="peer w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-base placeholder-transparent focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all"
            />
            <label className="absolute left-5 -top-3 bg-zinc-900 px-3 text-sm font-semibold text-indigo-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-indigo-300 peer-focus:text-sm">
              Date & Time
            </label>
          </div>

          {/* Table */}
          <div className="relative">
            <input
              name="table"
              type="number"
              value={formData.table}
              onChange={handleChange}
              className="peer w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-base placeholder-transparent focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all"
              placeholder="Table"
            />
            <label className="absolute left-5 -top-3 bg-zinc-900 px-3 text-sm font-semibold text-pink-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-pink-300 peer-focus:text-sm">
              Table
            </label>
          </div>

          {/* Status */}
          <div className="relative">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="peer w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-base focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all appearance-none"
            >
              <option value="confirmed" className="bg-zinc-800 text-emerald-300">Confirmed</option>
              <option value="canceled" className="bg-zinc-800 text-red-300">Canceled</option>
              <option value="completed" className="bg-zinc-800 text-cyan-300">Completed</option>
            </select>
            <label className="absolute left-5 -top-3 bg-zinc-900 px-3 text-sm font-semibold text-teal-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-teal-300 peer-focus:text-sm">
              Status
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-7 py-3 bg-white/5 border border-white/10 text-zinc-300 rounded-xl font-semibold text-base hover:bg-white/10 hover:text-white transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-cyan-500/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-zinc-900 text-base"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
                Save Reservation
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ReservationFormModal;