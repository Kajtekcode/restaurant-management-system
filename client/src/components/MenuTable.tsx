interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  available: boolean;
}

import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';

interface MenuTableProps {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: number) => void;
}

const MenuTable: React.FC<MenuTableProps> = ({ items, onEdit, onDelete }) => {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <table className="w-full text-sm">
        {/* Header */}
        <thead>
          <tr className="border-b border-white/10 text-xs uppercase tracking-wider font-semibold text-zinc-400">
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Description</th>
            <th className="px-6 py-4 text-left">Price</th>
            <th className="px-6 py-4 text-left">Category</th>
            <th className="px-6 py-4 text-left">Available</th>
            <th className="px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>

        {/* Body — NO WHITESPACE BETWEEN <tr> AND <td> */}
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
          {items.map((item) => (
            <motion.tr
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 15, scale: 0.98 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              className="group border-b border-white/5 last:border-none transition-all duration-300 hover:bg-white/5 hover:border-cyan-500/20"
              whileHover={{ x: 4 }}
            >
              <td className="px-6 py-5 font-medium text-white">{item.name}</td>
              <td className="px-6 py-5 text-zinc-400 max-w-xs truncate">{item.description || '—'}</td>
              <td className="px-6 py-5 text-emerald-400 font-semibold">${item.price.toFixed(2)}</td>
              <td className="px-6 py-5 text-zinc-300">{item.category || '—'}</td>
              <td className="px-6 py-5">
                <motion.span
                  animate={item.available ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ repeat: item.available ? Infinity : 0, duration: 2 }}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                    item.available
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    {item.available && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    )}
                    <span
                      className={`relative inline-flex h-2 w-2 rounded-full ${
                        item.available ? 'bg-emerald-400' : 'bg-red-400'
                      }`}
                    ></span>
                  </span>
                  {item.available ? 'Yes' : 'No'}
                </motion.span>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onEdit(item)}
                    className="group/edit relative p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 transition-all hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-cyan-200"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/edit:opacity-100 transition-opacity whitespace-nowrap">
                      Edit Item
                    </span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDelete(item.id)}
                    className="group/delete relative p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 transition-all hover:bg-red-500/20 hover:border-red-400 hover:text-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/delete:opacity-100 transition-opacity whitespace-nowrap">
                      Delete Item
                    </span>
                  </motion.button>
                </div>
              </td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="p-12 text-center text-zinc-500">
          <p className="text-lg font-medium">No menu items yet.</p>
          <p className="text-sm mt-1">Click "Add New Item" to get started.</p>
        </div>
      )}
    </motion.div>
  );
};

export default MenuTable;