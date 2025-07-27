'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function SupplierAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');

  const revenueData = [
    { name: 'Mon', revenue: 8000, orders: 15 },
    { name: 'Tue', revenue: 12000, orders: 18 },
    { name: 'Wed', revenue: 9500, orders: 12 },
    { name: 'Thu', revenue: 15000, orders: 22 },
    { name: 'Fri', revenue: 11000, orders: 16 },
    { name: 'Sat', revenue: 18000, orders: 25 },
    { name: 'Sun', revenue: 16500, orders: 20 }
  ];

  const productData = [
    { category: 'Vegetables', revenue: 45000, orders: 85 },
    { category: 'Spices', revenue: 25000, orders: 45 },
    { category: 'Dairy', revenue: 30000, orders: 60 },
    { category: 'Oils', revenue: 15000, orders: 25 },
    { category: 'Grains', revenue: 20000, orders: 35 }
  ];

  const topVendors = [
    { name: 'Street Food Corner', orders: 45, revenue: 125000 },
    { name: 'Chaat Master', orders: 38, revenue: 95000 },
    { name: 'Spicy Delights', orders: 32, revenue: 89000 },
    { name: 'Tasty Treats', orders: 28, revenue: 78000 },
    { name: 'Dosa Point', orders: 22, revenue: 58000 }
  ];

  const COLORS = ['#f97316', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const stats = [
    { title: 'Total Revenue', value: '₹1,25,430', change: '+25%', color: 'green' },
    { title: 'Total Orders', value: '89', change: '+18%', color: 'blue' },
    { title: 'Active Vendors', value: '45', change: '+12%', color: 'orange' },
    { title: 'Average Order Value', value: '₹1,409', change: '+6%', color: 'purple' }
  ];

  return (
    <DashboardLayout userType="supplier">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <div className="flex space-x-2">
            {['7d', '30d', '90d', '1y'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  timeRange === range
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : range === '90d' ? 'Last 90 Days' : 'Last Year'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <i className={`ri-${index === 0 ? 'money-rupee-circle' : index === 1 ? 'file-list' : index === 2 ? 'store-2' : 'bar-chart'}-line text-xl text-gray-600`}></i>
                </div>
              </div>
              <p className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last period
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#f97316" fill="#fed7aa" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Volume</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, revenue }) => `${category} ₹${revenue.toLocaleString()}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Vendors</h3>
            <div className="space-y-4">
              {topVendors.map((vendor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{vendor.name}</h4>
                      <p className="text-sm text-gray-500">{vendor.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₹{vendor.revenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Total revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Order Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productData.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3`} style={{ backgroundColor: COLORS[index] }}></div>
                        <span className="text-sm font-medium text-gray-900">{product.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.orders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{product.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{Math.round(product.revenue / product.orders).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${Math.random() > 0.5 ? 'text-green-600' : 'text-red-600'}`}>
                        {Math.random() > 0.5 ? '+' : '-'}{Math.floor(Math.random() * 20) + 1}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">₹1,25,430</div>
              <div className="text-sm text-gray-500">This Month</div>
              <div className="text-sm text-green-600 mt-1">+25% from last month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">₹1,00,344</div>
              <div className="text-sm text-gray-500">Last Month</div>
              <div className="text-sm text-blue-600 mt-1">89 orders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">₹89,275</div>
              <div className="text-sm text-gray-500">Two Months Ago</div>
              <div className="text-sm text-orange-600 mt-1">71 orders</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}