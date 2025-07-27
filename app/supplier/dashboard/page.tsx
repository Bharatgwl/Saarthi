
'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SupplierDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 89,
    pendingOrders: 15,
    totalRevenue: 125430,
    activeProducts: 45
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: 'ORD-001', vendor: 'Street Food Corner', items: 'Onions (50kg), Tomatoes (30kg)', amount: 2450, status: 'Processing', date: '2024-01-15' },
    { id: 'ORD-002', vendor: 'Spicy Delights', items: 'Garam Masala (5kg), Turmeric (2kg)', amount: 1200, status: 'Shipped', date: '2024-01-14' },
    { id: 'ORD-003', vendor: 'Tasty Treats', items: 'Cooking Oil (20L), Ghee (5kg)', amount: 3200, status: 'Delivered', date: '2024-01-13' },
    { id: 'ORD-004', vendor: 'Food Paradise', items: 'Chicken (15kg), Mutton (10kg)', amount: 4800, status: 'Processing', date: '2024-01-12' },
    { id: 'ORD-005', vendor: 'Chaat Master', items: 'Milk (40L), Paneer (8kg)', amount: 1800, status: 'Delivered', date: '2024-01-11' }
  ]);

  const [revenueData] = useState([
    { name: 'Jan', revenue: 8000 },
    { name: 'Feb', revenue: 12000 },
    { name: 'Mar', revenue: 9500 },
    { name: 'Apr', revenue: 15000 },
    { name: 'May', revenue: 11000 },
    { name: 'Jun', revenue: 18000 },
    { name: 'Jul', revenue: 16500 }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout userType="supplier">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Supplier Dashboard</h1>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-add-line"></i>
            <span>Add Product</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="ri-file-list-line text-xl text-blue-600"></i>
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+18% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <i className="ri-time-line text-xl text-yellow-600"></i>
              </div>
            </div>
            <p className="text-sm text-yellow-600 mt-2">Need processing</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i className="ri-money-rupee-circle-line text-xl text-green-600"></i>
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+25% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeProducts}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <i className="ri-product-hunt-line text-xl text-purple-600"></i>
              </div>
            </div>
            <p className="text-sm text-purple-600 mt-2">In inventory</p>
          </div>
        </div>

        {/* Charts and Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#dbeafe" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 p-4 rounded-lg flex items-center space-x-3 transition-colors cursor-pointer">
                <i className="ri-add-circle-line text-xl"></i>
                <span>Add New Product</span>
              </button>
              <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 p-4 rounded-lg flex items-center space-x-3 transition-colors cursor-pointer">
                <i className="ri-truck-line text-xl"></i>
                <span>Update Delivery Status</span>
              </button>
              <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 p-4 rounded-lg flex items-center space-x-3 transition-colors cursor-pointer">
                <i className="ri-message-line text-xl"></i>
                <span>Message Vendors</span>
              </button>
              <button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 p-4 rounded-lg flex items-center space-x-3 transition-colors cursor-pointer">
                <i className="ri-bar-chart-line text-xl"></i>
                <span>View Analytics</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <button className="text-orange-600 hover:text-orange-700 text-sm font-medium cursor-pointer">
                View All
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.vendor}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
