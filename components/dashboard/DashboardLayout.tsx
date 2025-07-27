'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'vendor' | 'supplier';
}

export default function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('userType');
    router.push('/');
  };

  const vendorMenuItems = [
    { href: '/vendor/dashboard', icon: 'ri-dashboard-line', label: 'Dashboard' },
    { href: '/vendor/orders', icon: 'ri-shopping-cart-line', label: 'Orders' },
    { href: '/vendor/inventory', icon: 'ri-archive-line', label: 'Inventory' },
    { href: '/vendor/suppliers', icon: 'ri-truck-line', label: 'Suppliers' },
    { href: '/vendor/messages', icon: 'ri-message-3-line', label: 'Messages' },
    { href: '/vendor/analytics', icon: 'ri-bar-chart-line', label: 'Analytics' }
  ];

  const supplierMenuItems = [
    { href: '/supplier/dashboard', icon: 'ri-dashboard-line', label: 'Dashboard' },
    { href: '/supplier/orders', icon: 'ri-file-list-line', label: 'Orders' },
    { href: '/supplier/products', icon: 'ri-product-hunt-line', label: 'Products' },
    { href: '/supplier/vendors', icon: 'ri-store-line', label: 'Vendors' },
    { href: '/supplier/messages', icon: 'ri-message-3-line', label: 'Messages' },
    { href: '/supplier/analytics', icon: 'ri-line-chart-line', label: 'Analytics' }
  ];

  const menuItems = userType === 'vendor' ? vendorMenuItems : supplierMenuItems;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-orange-600 font-pacifico">
                Saarthi
              </Link>
              <div className="hidden md:flex items-center space-x-1 text-sm text-gray-500">
                <span>/</span>
                <span className="capitalize">{userType} Dashboard</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  <i className="ri-notification-3-line text-xl"></i>
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">New order received</p>
                            <p className="text-xs text-gray-500">2 minutes ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Order delivered successfully</p>
                            <p className="text-xs text-gray-500">1 hour ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Low inventory alert</p>
                            <p className="text-xs text-gray-500">3 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.businessName}</p>
                </div>
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-orange-600"></i>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  <i className="ri-logout-box-line text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-6">
            <div className="px-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors cursor-pointer"
                >
                  <i className={`${item.icon} text-xl mr-3`}></i>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
}