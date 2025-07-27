'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { websocketService } from '../../../lib/websocket';

export default function VendorOrders() {
  const [orders, setOrders] = useState([
    { id: 'ORD-001', supplier: 'Fresh Vegetables Co.', items: 'Onions (50kg), Tomatoes (30kg), Potatoes (25kg)', amount: 2450, status: 'Delivered', date: '2024-01-15', location: 'Delhi' },
    { id: 'ORD-002', supplier: 'Spice Masters', items: 'Garam Masala (5kg), Turmeric (2kg), Cumin (3kg)', amount: 1200, status: 'In Transit', date: '2024-01-14', location: 'Mumbai' },
    { id: 'ORD-003', supplier: 'Oil & Ghee Suppliers', items: 'Cooking Oil (20L), Ghee (5kg)', amount: 3200, status: 'Processing', date: '2024-01-13', location: 'Delhi' },
    { id: 'ORD-004', supplier: 'Meat Junction', items: 'Chicken (15kg), Mutton (10kg)', amount: 4800, status: 'Delivered', date: '2024-01-12', location: 'Bangalore' },
    { id: 'ORD-005', supplier: 'Dairy Fresh', items: 'Milk (40L), Paneer (8kg), Curd (5kg)', amount: 1800, status: 'Delivered', date: '2024-01-11', location: 'Delhi' }
  ]);

  const [filterStatus, setFilterStatus] = useState('All');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    supplierId: '',
    items: '',
    notes: ''
  });

  const [suppliers] = useState([
    { id: 'SUP-001', name: 'Fresh Vegetables Co.', location: 'Delhi', rating: 4.8 },
    { id: 'SUP-002', name: 'Spice Masters', location: 'Mumbai', rating: 4.5 },
    { id: 'SUP-003', name: 'Oil & Ghee Suppliers', location: 'Delhi', rating: 4.7 },
    { id: 'SUP-004', name: 'Meat Junction', location: 'Bangalore', rating: 4.6 },
    { id: 'SUP-005', name: 'Dairy Fresh', location: 'Delhi', rating: 4.9 }
  ]);

  useEffect(() => {
    websocketService.connect();
    websocketService.on('orderUpdate', (data) => {
      setOrders(prev => prev.map(order => 
        order.id === data.orderId ? { ...order, status: data.status } : order
      ));
    });

    return () => {
      websocketService.disconnect();
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = filterStatus === 'All' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const handleNewOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedSupplier = suppliers.find(s => s.id === newOrder.supplierId);
    const order = {
      id: `ORD-${Date.now()}`,
      supplier: selectedSupplier?.name || '',
      items: newOrder.items,
      amount: Math.floor(Math.random() * 5000) + 1000,
      status: 'Processing',
      date: new Date().toISOString().split('T')[0],
      location: selectedSupplier?.location || ''
    };
    
    setOrders(prev => [order, ...prev]);
    setShowNewOrderModal(false);
    setNewOrder({ supplierId: '', items: '', notes: '' });
  };

  return (
    <DashboardLayout userType="vendor">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <button 
            onClick={() => setShowNewOrderModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-line"></i>
            <span>New Order</span>
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex space-x-4 mb-6">
            {['All', 'Processing', 'In Transit', 'Delivered', 'Cancelled'].map(status => (
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        <div className="font-medium">{order.supplier}</div>
                        <div className="text-xs text-gray-400">{order.location}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {order.items}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{order.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-orange-600 hover:text-orange-900 mr-3 cursor-pointer">
                        <i className="ri-eye-line"></i>
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 mr-3 cursor-pointer">
                        <i className="ri-message-line"></i>
                      </button>
                      {order.status === 'Processing' && (
                        <button className="text-red-600 hover:text-red-900 cursor-pointer">
                          <i className="ri-close-line"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showNewOrderModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Place New Order</h3>
              <form onSubmit={handleNewOrder} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Supplier
                  </label>
                  <div className="relative">
                    <select
                      value={newOrder.supplierId}
                      onChange={(e) => setNewOrder(prev => ({ ...prev, supplierId: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-8"
                      required
                    >
                      <option value="">Choose a supplier</option>
                      {suppliers.map(supplier => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.name} - {supplier.location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Items Needed
                  </label>
                  <textarea
                    value={newOrder.items}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, items: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    rows={3}
                    placeholder="List items with quantities..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={newOrder.notes}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    rows={2}
                    placeholder="Additional notes..."
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Place Order
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewOrderModal(false)}
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