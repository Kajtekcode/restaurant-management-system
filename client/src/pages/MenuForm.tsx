import { useState, useEffect } from 'react';
import * as menuService from '../services/menuService';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">{item ? 'Edit Item' : 'Add Item'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Price</label>
            <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} className="mr-2" />
              Available
            </label>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 bg-gray-500 text-white p-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuForm;
