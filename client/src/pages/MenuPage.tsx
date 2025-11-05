// src/pages/MenuPage.tsx
import { useState, useEffect } from 'react';
import * as menuService from '../services/menuService';
import MenuTable from '../components/MenuTable';
import MenuForm from './MenuForm';
import { motion } from 'framer-motion';

interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  available: boolean;
}

const MenuPage = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await menuService.getMenu();
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching menu:', err);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await menuService.deleteItem(id);
      fetchItems();
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  return (
    <div className="pt-20 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
          Menu Management
        </h1>
        <p className="mt-2 text-zinc-400 text-lg">Add, edit, or remove menu items</p>
      </motion.div>

      <button
        onClick={() => {
          setEditingItem(null);
          setShowForm(true);
        }}
        className="group relative mb-8 inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all"
      >
        <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add New Item
      </button>

      {showForm && (
        <MenuForm
          item={editingItem}
          onClose={() => {
            setShowForm(false);
            fetchItems();
          }}
        />
      )}

      <MenuTable items={items} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default MenuPage;