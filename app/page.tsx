'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://readdy.ai/api/search-image?query=bustling%20Indian%20street%20food%20market%20with%20colorful%20spices%2C%20fresh%20vegetables%2C%20and%20traditional%20cooking%20equipment%2C%20warm%20lighting%2C%20vibrant%20atmosphere%2C%20people%20cooking%20and%20selling%20food%2C%20authentic%20street%20food%20scene%20with%20steam%20rising%20from%20hot%20dishes%2C%20crowded%20marketplace%20environment&width=1920&height=1080&seq=hero1&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Bridge the Gap Between Street Food 
              <span className="text-orange-400"> Vendors & Suppliers</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Connect directly with trusted suppliers, manage inventory in real-time, 
              and grow your street food business with our comprehensive platform.
            </p>
            <div className="flex gap-4">
              <Link 
                href="/vendor/login"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-store-2-line mr-2"></i>
                Join as Vendor
              </Link>
              <Link 
                href="/supplier/login"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-truck-line mr-2"></i>
                Join as Supplier
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600">Everything you need to streamline your street food business</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-message-3-line text-2xl text-orange-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-Time Communication</h3>
              <p className="text-gray-600">Instant messaging with suppliers, order updates, and notifications</p>
            </div>
            
            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-dashboard-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Dashboards</h3>
              <p className="text-gray-600">Separate dashboards for vendors and suppliers with analytics</p>
            </div>
            
            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-truck-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Order Tracking</h3>
              <p className="text-gray-600">Track orders from placement to delivery with real-time updates</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to get started</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            {/* For Vendors */}
            <div>
              <h3 className="text-2xl font-bold text-orange-600 mb-8 text-center">For Vendors</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold mb-2">Register & Create Profile</h4>
                    <p className="text-gray-600">Sign up and create your vendor profile with business details</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-2">Browse Suppliers</h4>
                    <p className="text-gray-600">Find trusted suppliers for your ingredients and supplies</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-2">Place Orders</h4>
                    <p className="text-gray-600">Order directly through the platform with real-time tracking</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-semibold mb-2">Manage Inventory</h4>
                    <p className="text-gray-600">Track stock levels and get alerts for low inventory</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* For Suppliers */}
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-8 text-center">For Suppliers</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold mb-2">Register & List Products</h4>
                    <p className="text-gray-600">Create your supplier profile and list your products</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-2">Receive Orders</h4>
                    <p className="text-gray-600">Get instant notifications when vendors place orders</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-2">Manage Delivery</h4>
                    <p className="text-gray-600">Update order status and coordinate delivery schedules</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-semibold mb-2">Track Performance</h4>
                    <p className="text-gray-600">Monitor sales, customer feedback, and business analytics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Street Food Business?</h2>
          <p className="text-xl text-orange-100 mb-8">Join thousands of vendors and suppliers already using our platform</p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/vendor/register"
              className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Get Started as Vendor
            </Link>
            <Link 
              href="/supplier/register"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-500 px-8 py-4 rounded-lg font-semibold text-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Get Started as Supplier
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 font-pacifico">Saarthi</h3>
              <p className="text-gray-400">Connecting street food vendors with trusted suppliers across India</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Vendors</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/vendor/login" className="hover:text-white cursor-pointer">Vendor Login</Link></li>
                <li><Link href="/vendor/register" className="hover:text-white cursor-pointer">Register</Link></li>
                <li><Link href="/features" className="hover:text-white cursor-pointer">Features</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Suppliers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/supplier/login" className="hover:text-white cursor-pointer">Supplier Login</Link></li>
                <li><Link href="/supplier/register" className="hover:text-white cursor-pointer">Register</Link></li>
                <li><Link href="/pricing" className="hover:text-white cursor-pointer">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white cursor-pointer">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white cursor-pointer">Contact Us</Link></li>
                <li><Link href="/about" className="hover:text-white cursor-pointer">About</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Saarthi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}