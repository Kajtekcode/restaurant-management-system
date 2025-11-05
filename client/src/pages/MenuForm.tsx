import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as menuService from '../services/menuService';
import { X, CheckCircle } from 'lucide-react';

interface MenuFormProps {
  item: { id: number; name: string; description?: string; price: number; category?: string; available: boolean } | null;
  onClose: () => void;
}

const MenuForm: React.FC<MenuFormProps> = ({ item, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description || '');
      setPrice(item.price);
      setCategory(item.category || '');
      setAvailable(item.available);
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { name, description, price, category, available };
    try {
      if (item) {
        await menuService.updateItem(item.id, data);
      } else {
        await menuService.createItem(data);
      }
      onClose();
    } catch (error) {
      console.error('Error saving item', error);
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
        className="relative bg-zinc-900/80 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl p-8 w-full max-w-lg"
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
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            {item ? 'Edit Menu Item' : 'Add Menu Item'}
          </h2>
          <p className="text-zinc-400 text-base mt-2">Enter item details below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="peer w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-base placeholder-transparent focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
              placeholder="Name"
            />
            <label className="absolute left-5 -top-3 bg-zinc-900 px-3 text-sm font-semibold text-emerald-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-emerald-300 peer-focus:text-sm">
              Name
            </label>
          </div>

          {/* Description */}
          <div className="relative">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="peer w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-base placeholder-transparent focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all resize-none"
              placeholder="Description"
            />
            <label className="absolute left-5 -top-3 bg-zinc-900 px-3 text-sm font-semibold text-teal-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-teal-300 peer-focus:text-sm">
              Description
            </label>
          </div>

          {/* Price */}
          <div className="relative">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
              step="0.01"
              min="0"
              className="peer w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-base placeholder-transparent focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              placeholder="Price"
            />
            <label className="absolute left-5 -top-3 bg-zinc-900 px-3 text-sm font-semibold text-cyan-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-cyan-300 peer-focus:text-sm">
              Price ($)
            </label>
          </div>

          {/* Category */}
          <div className="relative">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="peer w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-base placeholder-transparent focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
              placeholder="Category"
            />
            <label className="absolute left-5 -top-3 bg-zinc-900 px-3 text-sm font-semibold text-purple-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-purple-300 peer-focus:text-sm">
              Category
            </label>
          </div>

          {/* Available */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
              className="w-5 h-5 accent-emerald-500 rounded focus:ring-emerald-400 focus:ring-2"
            />
            <label className="text-zinc-300 text-base font-medium">Available for order</label>
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
              className="group relative px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-emerald-500/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-zinc-900 text-base"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
                {item ? 'Update Item' : 'Add Item'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default MenuForm;
