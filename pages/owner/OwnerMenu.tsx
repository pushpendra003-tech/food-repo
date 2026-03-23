import MainLayout from "../../src/components/layout/MainLayout";
import { foods } from "../../src/data/foods";
import { useState } from 'react';
import { FoodCard } from "../../src/components/common/FoodCard";
import { Button } from "../../src/components/ui/Button";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
}

export default function OwnerMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(foods.slice(0, 12));
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: 0, category: '' });

  const categories = [...new Set(menuItems.map(item => item.category))] as string[];

  const addItem = () => {
    if (newItem.name && newItem.price > 0) {
      setMenuItems([
        {
          id: Date.now().toString(),
          ...newItem,
          image: '/api/placeholder/300/200',
          available: true
        } as MenuItem,
        ...menuItems
      ]);
      setNewItem({ name: '', description: '', price: 0, category: '' });
      setShowAddModal(false);
    }
  };

  const toggleAvailability = (id: string) => {
    setMenuItems(menuItems.map(item => 
      item.id === id 
        ? { ...item, available: !item.available }
        : item
    ));
  };

  const deleteItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Menu Management
              </h1>
              <p className="text-xl text-gray-600 mt-2">Add, edit and manage your restaurant menu items</p>
            </div>
            <div className="text-2xl font-bold text-emerald-600 bg-emerald-100 px-6 py-3 rounded-2xl">
              {menuItems.length} Items
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-3xl p-8 shadow-xl mb-12 border border-gray-100">
            <div className="flex gap-4 flex-wrap">
              <Button 
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold shadow-lg px-8 py-4 text-lg"
              >
                ➕ Add New Item
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold shadow-lg px-8 py-4 text-lg">
                📊 Menu Analytics
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold shadow-lg px-8 py-4 text-lg">
                🏷️ Categories
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="bg-white rounded-3xl p-6 shadow-xl mb-12 border border-gray-100 sticky top-4 z-10">
            <div className="flex overflow-x-auto gap-2 pb-2">
              <button className="px-6 py-3 bg-orange-100 text-orange-800 rounded-2xl font-semibold whitespace-nowrap hover:bg-orange-200 transition-all flex items-center gap-2">
                All ({menuItems.length})
              </button>
              {categories.map((category) => (
                <button key={category} className="px-6 py-3 bg-gray-100 text-gray-800 rounded-2xl font-semibold whitespace-nowrap hover:bg-gray-200 transition-all flex items-center gap-2">
                  {category} ({menuItems.filter(item => item.category === category).length})
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          {menuItems.length === 0 ? (
            <div className="text-center py-32">
              <div className="w-32 h-32 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <span className="text-5xl">🍕</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-700 mb-4">No Menu Items</h3>
              <p className="text-xl text-gray-500 mb-8 max-w-lg mx-auto">
                Add your first menu item to start receiving orders from customers
              </p>
              <Button 
                onClick={() => setShowAddModal(true)}
                className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl"
              >
                ➕ Add First Item
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {menuItems.map((item) => (
                <div key={item.id} className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all overflow-hidden border-2 border-gray-100 hover:border-orange-200">
                  <div className="h-48 bg-gradient-to-br from-orange-100 to-yellow-100 relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => toggleAvailability(item.id)}
                        className={`p-2 rounded-xl shadow-lg transition-all ${
                          item.available 
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                            : 'bg-gray-400 hover:bg-gray-500 text-white'
                        }`}
                      >
                        {item.available ? '✅' : '⭕'}
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                      <span className="text-2xl font-bold text-orange-600">₹{item.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{item.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg">
                        Edit
                      </Button>
                      <Button 
                        onClick={() => deleteItem(item.id)}
                        className="px-4 bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 text-xl">
                    ➕
                  </span>
                  Add New Menu Item
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Item Name</label>
                    <input
                      type="text"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all"
                      placeholder="Enter item name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      value={newItem.description}
                      onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                      className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all resize-vertical"
                      rows={3}
                      placeholder="Describe your delicious item"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                      <input
                        type="number"
                        value={newItem.price}
                        onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value) || 0})}
                        className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                      <select
                        value={newItem.category}
                        onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                        className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all"
                      >
                        <option value="">Select Category</option>
                        <option value="pizza">Pizza</option>
                        <option value="burger">Burger</option>
                        <option value="chinese">Chinese</option>
                        <option value="indian">Indian</option>
                        <option value="dessert">Dessert</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-6 border-t">
                    <Button 
                      onClick={addItem}
                      disabled={!newItem.name || newItem.price <= 0 || !newItem.category}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold shadow-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Item
                    </Button>
                    <Button 
                      onClick={() => setShowAddModal(false)}
                      variant="outline"
                      className="flex-1 px-8 py-4 border-2 border-gray-300 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
