import { useState, useEffect } from 'react';
import * as reservationService from '../services/reservationService';
import ReservationFormModal from '../components/ReservationFormModal';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, Plus, Edit2, X, Trash2 } from 'lucide-react';

interface Reservation {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  guests: number;
  date: string;
  table?: number;
  status: string;
}

const ReservationsPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    fetchReservations();
  }, [selectedDate]);

  const fetchReservations = async () => {
    try {
      const response = await reservationService.getReservations(selectedDate);
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations', error);
    }
  };

  const handleAdd = () => {
    setEditingReservation(null);
    setIsModalOpen(true);
  };

  const handleEdit = (reservation: Reservation) => {
    setEditingReservation(reservation);
    setIsModalOpen(true);
  };

  const handleCancel = async (id: number) => {
    try {
      await reservationService.cancelReservation(id);
      fetchReservations();
    } catch (error) {
      console.error('Error canceling reservation', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await reservationService.deleteReservation(id);
      fetchReservations();
    } catch (error) {
      console.error('Error deleting reservation', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
      case 'canceled': return 'bg-red-500/20 text-red-300 border border-red-500/30';
      case 'completed': return 'bg-gray-500/20 text-gray-300 border border-gray-500/30';
      default: return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-zinc-900 to-neutral-950">
      <div className="pt-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Reservations Management
          </h1>
          <p className="mt-2 text-zinc-400 text-lg">
            View and manage today's reservations
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="pl-10 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAdd}
            className="group relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
            New Reservation
          </motion.button>
        </div>

        <motion.div
          className="bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider font-semibold text-zinc-400">
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Guests</th>
                <th className="px-6 py-4 text-left">Time</th>
                <th className="px-6 py-4 text-left">Table</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <motion.tbody
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.2 },
                },
              }}
            >
              {reservations.map((res) => (
                <motion.tr
                  key={res.id}
                  variants={{
                    hidden: { opacity: 0, y: 15, scale: 0.98 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  className="group border-b border-white/5 last:border-none transition-all duration-300 hover:bg-white/5 hover:border-purple-500/20"
                  whileHover={{ x: 4 }}
                >
                  <td className="px-6 py-5 font-medium text-white">{res.name}</td>
                  <td className="px-6 py-5 text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {res.guests}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-zinc-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {new Date(res.date).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-zinc-300">{res.table ?? '—'}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(res.status)}`}>
                      {res.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEdit(res)}
                        className="group/edit relative p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 transition-all hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-cyan-200"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/edit:opacity-100 transition-opacity whitespace-nowrap">
                          Edit
                        </span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCancel(res.id)}
                        className="group/cancel relative p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 transition-all hover:bg-yellow-500/20 hover:border-yellow-400 hover:text-yellow-200"
                      >
                        <X className="w-4 h-4" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/cancel:opacity-100 transition-opacity whitespace-nowrap">
                          Cancel
                        </span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(res.id)}
                        className="group/delete relative p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 transition-all hover:bg-red-500/20 hover:border-red-400 hover:text-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/delete:opacity-100 transition-opacity whitespace-nowrap">
                          Delete
                        </span>
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>

          {reservations.length === 0 && (
            <div className="p-12 text-center text-zinc-500">
              <p className="text-lg font-medium">No reservations for this date.</p>
              <p className="text-sm mt-1">Click "New Reservation" to add one.</p>
            </div>
          )}
        </motion.div>

        {isModalOpen && (
          <ReservationFormModal
            reservation={editingReservation}
            onClose={() => setIsModalOpen(false)}
            onSave={fetchReservations}
          />
        )}
      </div>
    </div>
  );
};

export default ReservationsPage;
