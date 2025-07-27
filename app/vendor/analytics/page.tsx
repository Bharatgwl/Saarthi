'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function VendorAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');

  const salesData = [
    { name: 'Mon', sales: 4000, orders: 12 },
    { name: 'Tue', sales: 3000, orders: 10 },
    { name: 'Wed', sales: 2000, orders: 8 },
    { name: 'Thu', sales: 2780, orders: 15 },
    { name: 'Fri', sales: 1890, orders: 6 },
    { name: 'Sat', sales: 2390, orders: 9 },
    { name: 'Sun', sales: 3490, orders: 14 }
  ];

  const expenseData = [
    { category: 'Vegetables', amount: 15000, percentage: 35 },
    { category: 'Spices', amount: 8000, percentage: 18 },
    { category: 'Dairy', amount: 6000, percentage: 14 },
    { category: 'Oils', amount: 5000, percentage: 12 },
    { category: 'Meat', amount: 9000, percentage: 21 }
  ];

  const supplierData = [
    { name: 'Fresh Vegetables Co.', orders: 25, amount: 35000 },
    { name: 'Spice Masters', orders: 15, amount: 18000 },
    { name: 'Dairy Fresh', orders: 20, amount: 22000 },
    { name: 'Oil & Ghee Suppliers', orders: 12, amount: 15000 },
    { name: 'Meat Junction', orders: 8, amount: 12000 }
  ];

  const COLORS = ['#f97316', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const stats = [
    { title: 'Total Revenue', value: '₹1,25,430', change: '+12%', color: 'green' },
    { title: 'Total Orders', value: '156', change: '+8%', color: 'blue' },
    { title: 'Average Order Value', value: '₹804', change: '+5%', color: 'orange' },
    { title: 'Monthly Growth', value: '24%', change: '+3%', color: 'purple' }
  ];

  const getStatColor = (color: string) => {
    const colors = {
      green: 'bg-green-100 text-green-800',
      blue: 'bg-blue-100 text-blue-800',
      orange: 'bg-orange-100 text-orange-800',
      purple: 'bg-purple-100 text-purple-800'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <DashboardLayout userType="vendor">
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
                  <i className={`ri-${index === 0 ? 'money-rupee-circle' : index === 1 ? 'shopping-cart' : index === 2 ? 'bar-chart' : 'trending-up'}-line text-xl text-gray-600`}></i>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#f97316" fill="#fed7aa" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Volume</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Suppliers</h3>
            <div className="space-y-4">
              {supplierData.map((supplier, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{supplier.name}</h4>
                    <p className="text-sm text-gray-500">{supplier.orders} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₹{supplier.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Total spent</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">₹45,230</div>
              <div className="text-sm text-gray-500">This Month</div>
              <div className="text-sm text-green-600 mt-1">+12% from last month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">₹40,350</div>
              <div className="text-sm text-gray-500">Last Month</div>
              <div className="text-sm text-blue-600 mt-1">156 orders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">₹38,920</div>
              <div className="text-sm text-gray-500">Two Months Ago</div>
              <div className="text-sm text-orange-600 mt-1">142 orders</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}