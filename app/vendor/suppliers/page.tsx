'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';

export default function VendorSuppliers() {
  const [userLocation, setUserLocation] = useState('Delhi');
  const [suppliers, setSuppliers] = useState([
    { id: 'SUP-001', name: 'Fresh Vegetables Co.', location: 'Delhi', distance: '2.5 km', rating: 4.8, products: ['Vegetables', 'Fruits'], phone: '+91 9876543210', email: 'contact@freshveggies.com', priceRange: '₹20-100/kg', deliveryTime: '2-3 hours' },
    { id: 'SUP-002', name: 'Spice Masters', location: 'Delhi', distance: '3.2 km', rating: 4.5, products: ['Spices', 'Masalas'], phone: '+91 9876543211', email: 'info@spicemasters.com', priceRange: '₹100-500/kg', deliveryTime: '4-5 hours' },
    { id: 'SUP-003', name: 'Oil & Ghee Suppliers', location: 'Delhi', distance: '1.8 km', rating: 4.7, products: ['Oils', 'Ghee', 'Dairy'], phone: '+91 9876543212', email: 'sales@oilghee.com', priceRange: '₹150-300/L', deliveryTime: '3-4 hours' },
    { id: 'SUP-004', name: 'Dairy Fresh', location: 'Delhi', distance: '4.1 km', rating: 4.9, products: ['Milk', 'Paneer', 'Curd'], phone: '+91 9876543213', email: 'orders@dairyfresh.com', priceRange: '₹50-450/unit', deliveryTime: '1-2 hours' },
    { id: 'SUP-005', name: 'Grain Traders', location: 'Delhi', distance: '5.3 km', rating: 4.6, products: ['Rice', 'Wheat', 'Pulses'], phone: '+91 9876543214', email: 'contact@graintraders.com', priceRange: '₹40-120/kg', deliveryTime: '6-8 hours' },
    { id: 'SUP-006', name: 'Mumbai Spice Hub', location: 'Mumbai', distance: '1420 km', rating: 4.3, products: ['Spices', 'Condiments'], phone: '+91 9876543215', email: 'mumbai@spicehub.com', priceRange: '₹80-400/kg', deliveryTime: '2-3 days' },
    { id: 'SUP-007', name: 'Bangalore Meat Co.', location: 'Bangalore', distance: '2140 km', rating: 4.4, products: ['Meat', 'Chicken', 'Fish'], phone: '+91 9876543216', email: 'orders@bangaloremeat.com', priceRange: '₹200-800/kg', deliveryTime: '1-2 days' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('distance');
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

  const categories = ['All', 'Vegetables', 'Fruits', 'Spices', 'Dairy', 'Oils', 'Meat', 'Grains'];

  const filteredSuppliers = suppliers
    .filter(supplier => 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.products.some(product => product.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(supplier => 
      filterCategory === 'All' || 
      supplier.products.some(product => product.toLowerCase().includes(filterCategory.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const nearbySuppliers = filteredSuppliers.filter(supplier => 
    supplier.location === userLocation
  );

  const distantSuppliers = filteredSuppliers.filter(supplier => 
    supplier.location !== userLocation
  );

  const handleContactSupplier = (supplier: any) => {
    setSelectedSupplier(supplier);
  };

  const handleSendMessage = (supplierId: string, message: string) => {
    console.log('Sending message to supplier:', supplierId, message);
    setSelectedSupplier(null);
  };

  const getRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`ri-star-${i <= rating ? 'fill' : 'line'} text-yellow-400`}
        />
      );
    }
    return stars;
  };

  return (
    <DashboardLayout userType="vendor">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <i className="ri-map-pin-line"></i>
            <span>Your Location: {userLocation}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search suppliers, products, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm pr-8"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm pr-8"
                >
                  <option value="distance">Sort by Distance</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
            </div>
          </div>

          {nearbySuppliers.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i className="ri-map-pin-fill text-orange-500 mr-2"></i>
                Nearby Suppliers ({nearbySuppliers.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nearbySuppliers.map(supplier => (
                  <div key={supplier.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-600">{supplier.rating}</span>
                        <div className="flex text-xs">
                          {getRatingStars(supplier.rating)}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <i className="ri-map-pin-line mr-2"></i>
                        <span>{supplier.location} • {supplier.distance}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-time-line mr-2"></i>
                        <span>{supplier.deliveryTime}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-money-rupee-circle-line mr-2"></i>
                        <span>{supplier.priceRange}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1">
                        {supplier.products.map(product => (
                          <span key={product} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleContactSupplier(supplier)}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-lg text-sm transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-message-line mr-1"></i>
                        Contact
                      </button>
                      <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-3 rounded-lg text-sm transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-eye-line mr-1"></i>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {distantSuppliers.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i className="ri-truck-line text-blue-500 mr-2"></i>
                Other Suppliers ({distantSuppliers.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {distantSuppliers.map(supplier => (
                  <div key={supplier.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-600">{supplier.rating}</span>
                        <div className="flex text-xs">
                          {getRatingStars(supplier.rating)}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <i className="ri-map-pin-line mr-2"></i>
                        <span>{supplier.location} • {supplier.distance}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-time-line mr-2"></i>
                        <span>{supplier.deliveryTime}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-money-rupee-circle-line mr-2"></i>
                        <span>{supplier.priceRange}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1">
                        {supplier.products.map(product => (
                          <span key={product} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleContactSupplier(supplier)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-message-line mr-1"></i>
                        Contact
                      </button>
                      <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-3 rounded-lg text-sm transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-eye-line mr-1"></i>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {selectedSupplier && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact {selectedSupplier.name}
              </h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <i className="ri-phone-line text-gray-400"></i>
                  <span className="text-sm">{selectedSupplier.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-mail-line text-gray-400"></i>
                  <span className="text-sm">{selectedSupplier.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-map-pin-line text-gray-400"></i>
                  <span className="text-sm">{selectedSupplier.location}</span>
                </div>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const message = (e.target as any).message.value;
                handleSendMessage(selectedSupplier.id, message);
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Hi, I'm interested in your products..."
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
                    onClick={() => setSelectedSupplier(null)}
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