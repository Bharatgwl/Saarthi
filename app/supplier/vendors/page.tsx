'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';

export default function SupplierVendors() {
  const [vendors, setVendors] = useState([
    { id: 'VEN-001', name: 'Street Food Corner', location: 'Delhi', distance: '2.5 km', contact: '+91 9876543210', email: 'owner@streetfoodcorner.com', totalOrders: 45, totalSpent: 125000, lastOrder: '2024-01-15', status: 'Active', rating: 4.8 },
    { id: 'VEN-002', name: 'Spicy Delights', location: 'Mumbai', distance: '1420 km', contact: '+91 9876543211', email: 'contact@spicydelights.com', totalOrders: 32, totalSpent: 89000, lastOrder: '2024-01-14', status: 'Active', rating: 4.5 },
    { id: 'VEN-003', name: 'Tasty Treats', location: 'Delhi', distance: '3.2 km', contact: '+91 9876543212', email: 'info@tastytreats.com', totalOrders: 28, totalSpent: 78000, lastOrder: '2024-01-13', status: 'Active', rating: 4.6 },
    { id: 'VEN-004', name: 'Food Paradise', location: 'Bangalore', distance: '2140 km', contact: '+91 9876543213', email: 'orders@foodparadise.com', totalOrders: 15, totalSpent: 45000, lastOrder: '2024-01-12', status: 'Inactive', rating: 4.3 },
    { id: 'VEN-005', name: 'Chaat Master', location: 'Delhi', distance: '1.8 km', contact: '+91 9876543214', email: 'chaatmaster@gmail.com', totalOrders: 38, totalSpent: 95000, lastOrder: '2024-01-11', status: 'Active', rating: 4.7 },
    { id: 'VEN-006', name: 'Dosa Point', location: 'Chennai', distance: '2200 km', contact: '+91 9876543215', email: 'dosapoint@mail.com', totalOrders: 22, totalSpent: 58000, lastOrder: '2024-01-10', status: 'Active', rating: 4.4 },
    { id: 'VEN-007', name: 'Biryani Hub', location: 'Hyderabad', distance: '1560 km', contact: '+91 9876543216', email: 'biryani@hub.com', totalOrders: 19, totalSpent: 52000, lastOrder: '2024-01-09', status: 'Active', rating: 4.6 }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('totalSpent');
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const filteredVendors = vendors
    .filter(vendor => 
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.contact.includes(searchTerm)
    )
    .filter(vendor => 
      filterStatus === 'All' || vendor.status === filterStatus
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'totalSpent':
          return b.totalSpent - a.totalSpent;
        case 'totalOrders':
          return b.totalOrders - a.totalOrders;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        default:
          return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`ri-star-${i <= rating ? 'fill' : 'line'} text-yellow-400 text-xs`}
        />
      );
    }
    return stars;
  };

  const handleContactVendor = (vendor: any) => {
    setSelectedVendor(vendor);
    setShowMessageModal(true);
  };

  const handleSendMessage = (vendorId: string, message: string) => {
    console.log('Sending message to vendor:', vendorId, message);
    setShowMessageModal(false);
    setSelectedVendor(null);
  };

  return (
    <DashboardLayout userType="supplier">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Vendor Management</h1>
          <div className="flex space-x-2">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-download-line"></i>
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Vendors</p>
                <p className="text-2xl font-bold text-gray-900">{vendors.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="ri-store-2-line text-xl text-blue-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Vendors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {vendors.filter(v => v.status === 'Active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i className="ri-check-line text-xl text-green-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{vendors.reduce((sum, v) => sum + v.totalSpent, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <i className="ri-money-rupee-circle-line text-xl text-purple-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length).toFixed(1)}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <i className="ri-star-fill text-xl text-yellow-600"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search vendors by name, location, or contact..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm pr-8"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm pr-8"
                >
                  <option value="totalSpent">Sort by Revenue</option>
                  <option value="totalOrders">Sort by Orders</option>
                  <option value="name">Sort by Name</option>
                  <option value="distance">Sort by Distance</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                        <div className="text-sm text-gray-500">{vendor.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vendor.location}</div>
                      <div className="text-sm text-gray-500">{vendor.distance}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vendor.contact}</div>
                      <div className="text-sm text-gray-500">{vendor.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vendor.totalOrders}</div>
                      <div className="text-sm text-gray-500">Last: {vendor.lastOrder}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{vendor.totalSpent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-900">{vendor.rating}</span>
                        <div className="flex">
                          {getRatingStars(vendor.rating)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(vendor.status)}`}>
                        {vendor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleContactVendor(vendor)}
                        className="text-blue-600 hover:text-blue-900 mr-3 cursor-pointer"
                      >
                        <i className="ri-message-line"></i>
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 mr-3 cursor-pointer">
                        <i className="ri-eye-line"></i>
                      </button>
                      <button className="text-green-600 hover:text-green-900 cursor-pointer">
                        <i className="ri-phone-line"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showMessageModal && selectedVendor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact {selectedVendor.name}
              </h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <i className="ri-phone-line text-gray-400"></i>
                  <span className="text-sm">{selectedVendor.contact}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-mail-line text-gray-400"></i>
                  <span className="text-sm">{selectedVendor.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-map-pin-line text-gray-400"></i>
                  <span className="text-sm">{selectedVendor.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-shopping-cart-line text-gray-400"></i>
                  <span className="text-sm">{selectedVendor.totalOrders} orders • ₹{selectedVendor.totalSpent.toLocaleString()}</span>
                </div>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const message = (e.target as any).message.value;
                handleSendMessage(selectedVendor.id, message);
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Hi, thank you for your continued business..."
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Send Message
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMessageModal(false)}
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