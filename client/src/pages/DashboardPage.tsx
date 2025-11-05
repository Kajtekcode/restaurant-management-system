import { useState, useEffect } from 'react';
import * as menuService from '../services/menuService';
import MenuTable from '../components/MenuTable';
import MenuForm from './MenuForm';
import Navbar from '../components/Navbar';

interface DashboardPageProps {
  setAuth: (auth: boolean) => void;
}

interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  available: boolean;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ setAuth }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await menuService.getMenu();
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items', error);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await menuService.deleteItem(id);
      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting item', error);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchMenuItems();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar setAuth={setAuth} />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Menu Dashboard</h1>
        <button onClick={handleAdd} className="mb-4 bg-green-500 text-white p-2 rounded">Add New Item</button>
        {showForm && <MenuForm item={editingItem} onClose={handleFormClose} />}
        <MenuTable items={menuItems} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default DashboardPage;
