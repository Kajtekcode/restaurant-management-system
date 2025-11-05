interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  available: boolean;
}

interface MenuTableProps {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: number) => void;
}

const MenuTable: React.FC<MenuTableProps> = ({ items, onEdit, onDelete }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Description</th>
          <th className="p-2 border">Price</th>
          <th className="p-2 border">Category</th>
          <th className="p-2 border">Available</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td className="p-2 border">{item.name}</td>
            <td className="p-2 border">{item.description}</td>
            <td className="p-2 border">${item.price.toFixed(2)}</td>
            <td className="p-2 border">{item.category}</td>
            <td className="p-2 border">{item.available ? 'Yes' : 'No'}</td>
            <td className="p-2 border">
              <button onClick={() => onEdit(item)} className="bg-yellow-500 text-white p-1 rounded mr-2">Edit</button>
              <button onClick={() => onDelete(item.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MenuTable;
