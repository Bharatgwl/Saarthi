"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import websocketService from "../../../lib/websocket";

export default function SupplierOrders() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      vendor: "Street Food Corner",
      vendorLocation: "Delhi",
      items: "Onions (50kg), Tomatoes (30kg), Potatoes (25kg)",
      amount: 2450,
      status: "Processing",
      date: "2024-01-15",
      priority: "High",
    },
    {
      id: "ORD-002",
      vendor: "Spicy Delights",
      vendorLocation: "Mumbai",
      items: "Garam Masala (5kg), Turmeric (2kg), Cumin (3kg)",
      amount: 1200,
      status: "Shipped",
      date: "2024-01-14",
      priority: "Medium",
    },
    {
      id: "ORD-003",
      vendor: "Tasty Treats",
      vendorLocation: "Delhi",
      items: "Cooking Oil (20L), Ghee (5kg)",
      amount: 3200,
      status: "Delivered",
      date: "2024-01-13",
      priority: "Low",
    },
    {
      id: "ORD-004",
      vendor: "Food Paradise",
      vendorLocation: "Bangalore",
      items: "Chicken (15kg), Mutton (10kg)",
      amount: 4800,
      status: "Processing",
      date: "2024-01-12",
      priority: "High",
    },
    {
      id: "ORD-005",
      vendor: "Chaat Master",
      vendorLocation: "Delhi",
      items: "Milk (40L), Paneer (8kg), Curd (5kg)",
      amount: 1800,
      status: "Delivered",
      date: "2024-01-11",
      priority: "Medium",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const userId = null; // change this later to real user logic
    const userType = "supplier";
    if (userId) {
      websocketService.connect(userId, userType);
    }
    websocketService.onOrderUpdate((data) => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === data.orderId ? { ...order, status: data.status } : order
        )
      );
    });

    return () => {
      websocketService.disconnect();
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const handleStatusUpdate = (order: any) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setShowStatusModal(true);
  };

  const handleUpdateStatus = () => {
    if (selectedOrder && newStatus) {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === selectedOrder.id
            ? { ...order, status: newStatus }
            : order
        )
      );

      websocketService.sendOrderUpdate({
        orderId: selectedOrder.id,
        status: newStatus,
        vendorId: selectedOrder.vendor,
      });

      setShowStatusModal(false);
      setSelectedOrder(null);
    }
  };

  return (
    <DashboardLayout userType="supplier">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Orders Management
          </h1>
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
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="ri-file-list-line text-xl text-blue-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    orders.filter((order) => order.status === "Processing")
                      .length
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <i className="ri-time-line text-xl text-yellow-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Shipped</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter((order) => order.status === "Shipped").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="ri-truck-line text-xl text-blue-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    orders.filter((order) => order.status === "Delivered")
                      .length
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i className="ri-check-line text-xl text-green-600"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex space-x-4 mb-6">
            {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    filterStatus === status
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
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
                        <div className="font-medium">{order.vendor}</div>
                        <div className="text-xs text-gray-400">
                          {order.vendorLocation}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {order.items}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{order.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                          order.priority
                        )}`}
                      >
                        {order.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleStatusUpdate(order)}
                        className="text-blue-600 hover:text-blue-900 mr-3 cursor-pointer"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button className="text-green-600 hover:text-green-900 mr-3 cursor-pointer">
                        <i className="ri-message-line"></i>
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 cursor-pointer">
                        <i className="ri-eye-line"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showStatusModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Update Order Status
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order: {selectedOrder?.id}
                  </label>
                  <p className="text-sm text-gray-600">
                    Vendor: {selectedOrder?.vendor}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Status
                  </label>
                  <div className="space-y-2">
                    {["Processing", "Shipped", "Delivered", "Cancelled"].map(
                      (status) => (
                        <label key={status} className="flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value={status}
                            checked={newStatus === status}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="mr-2"
                          />
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              status
                            )}`}
                          >
                            {status}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleUpdateStatus}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Update Status
                  </button>
                  <button
                    onClick={() => setShowStatusModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
