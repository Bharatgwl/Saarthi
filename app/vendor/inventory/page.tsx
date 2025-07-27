'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';

export default function VendorInventory() {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Onions', quantity: 45, unit: 'kg', minStock: 20, price: 35, supplier: 'Fresh Vegetables Co.', lastUpdated: '2024-01-15' },
    { id: 2, name: 'Tomatoes', quantity: 12, unit: 'kg', minStock: 15, price: 60, supplier: 'Fresh Vegetables Co.', lastUpdated: '2024-01-15' },
    { id: 3, name: 'Potatoes', quantity: 30, unit: 'kg', minStock: 25, price: 28, supplier: 'Fresh Vegetables Co.', lastUpdated: '2024-01-14' },
    { id: 4, name: 'Garam Masala', quantity: 8, unit: 'kg', minStock: 5, price: 400, supplier: 'Spice Masters', lastUpdated: '2024-01-14' },
    { id: 5, name: 'Cooking Oil', quantity: 25, unit: 'L', minStock: 10, price: 180, supplier: 'Oil & Ghee Suppliers', lastUpdated: '2024-01-13' },
    { id: 6, name: 'Chicken', quantity: 5, unit: 'kg', minStock: 8, price: 320, supplier: 'Meat Junction', lastUpdated: '2024-01-12' },
    { id: 7, name: 'Milk', quantity: 15, unit: 'L', minStock: 20, price: 65, supplier: 'Dairy Fresh', lastUpdated: '2024-01-11' },
    { id: 8, name: 'Paneer', quantity: 3, unit: 'kg', minStock: 5, price: 450, supplier: 'Dairy Fresh', lastUpdated: '2024-01-11' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    unit: 'kg',
    minStock: '',
    price: '',
    supplier: ''
  });

  const [filterStatus, setFilterStatus] = useState('All');

  const getStockStatus = (quantity: number, minStock: number) => {
    if (quantity <= minStock) return 'low';
    if (quantity <= minStock * 1.5) return 'medium';
    return 'high';
  };

  const getStockColor = (status: string) => {
    switch (status) {
      case 'low': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInventory = inventory.filter(item => {
    const status = getStockStatus(item.quantity, item.minStock);
    return filterStatus === 'All' || 
           (filterStatus === 'Low Stock' && status === 'low') ||
           (filterStatus === 'Medium Stock' && status === 'medium') ||
           (filterStatus === 'High Stock' && status === 'high');
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      id: Date.now(),
      name: newItem.name,
      quantity: parseInt(newItem.quantity),
      unit: newItem.unit,
      minStock: parseInt(newItem.minStock),
      price: parseFloat(newItem.price),
      supplier: newItem.supplier,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setInventory(prev => [...prev, item]);
    setShowAddModal(false);
    setNewItem({ name: '', quantity: '', unit: 'kg', minStock: '', price: '', supplier: '' });
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      quantity: item.quantity.toString(),
      unit: item.unit,
      minStock: item.minStock.toString(),
      price: item.price.toString(),
      supplier: item.supplier
    });
  };

  const handleUpdateItem = (e: React.FormEvent) => {
    e.preventDefault();
    setInventory(prev => prev.map(item => 
      item.id === editingItem.id 
        ? {
            ...item,
            name: newItem.name,
            quantity: parseInt(newItem.quantity),
            unit: newItem.unit,
            minStock: parseInt(newItem.minStock),
            price: parseFloat(newItem.price),
            supplier: newItem.supplier,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : item
    ));
    setEditingItem(null);
    setNewItem({ name: '', quantity: '', unit: 'kg', minStock: '', price: '', supplier: '' });
  };

  const handleDeleteItem = (id: number) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <DashboardLayout userType="vendor">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-line"></i>
            <span>Add Item</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="ri-archive-line text-xl text-blue-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inventory.filter(item => getStockStatus(item.quantity, item.minStock) === 'low').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <i className="ri-alert-line text-xl text-red-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i className="ri-money-rupee-circle-line text-xl text-green-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Suppliers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(inventory.map(item => item.supplier)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <i className="ri-truck-line text-xl text-purple-600"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex space-x-4 mb-6">
            {['All', 'Low Stock', 'Medium Stock', 'High Stock'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filterStatus === status
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInventory.map((item) => {
                  const status = getStockStatus(item.quantity, item.minStock);
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">Min: {item.minStock} {item.unit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{item.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{(item.quantity * item.price).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.supplier}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStockColor(status)}`}>
                          {status === 'low' ? 'Low Stock' : status === 'medium' ? 'Medium Stock' : 'High Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleEditItem(item)}
                          className="text-blue-600 hover:text-blue-900 mr-3 cursor-pointer"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button 
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {(showAddModal || editingItem) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h3>
              <form onSubmit={editingItem ? handleUpdateItem : handleAddItem} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem(prev => ({ ...prev, quantity: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit
                    </label>
                    <div className="relative">
                      <select
                        value={newItem.unit}
                        onChange={(e) => setNewItem(prev => ({ ...prev, unit: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-8"
                      >
                        <option value="kg">kg</option>
                        <option value="L">L</option>
                        <option value="pcs">pcs</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Min Stock
                    </label>
                    <input
                      type="number"
                      value={newItem.minStock}
                      onChange={(e) => setNewItem(prev => ({ ...prev, minStock: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit Price (₹)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newItem.price}
                      onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supplier
                  </label>
                  <input
                    type="text"
                    value={newItem.supplier}
                    onChange={(e) => setNewItem(prev => ({ ...prev, supplier: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors whitespace-nowrap"
                  >
                    {editingItem ? 'Update' : 'Add'} Item
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingItem(null);
                      setNewItem({ name: '', quantity: '', unit: 'kg', minStock: '', price: '', supplier: '' });
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}