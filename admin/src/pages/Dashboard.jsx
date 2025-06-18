import React from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Layout from "../components/Layout";
const Dashboard = () => {
  return (
    <Layout>
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">$84,254</h3>
              <p className="text-sm text-green-600 mt-2">
                <i className="fas fa-arrow-up mr-1"></i>
                +8.4% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <AttachMoneyIcon className="text-blue-500 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">1,463</h3>
              <p className="text-sm text-green-600 mt-2">
                <i className="fas fa-arrow-up mr-1"></i>
                +12.5% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
              <ShoppingBagIcon className="text-purple-500 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">New Customers</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">385</h3>
              <p className="text-sm text-green-600 mt-2">
                <i className="fas fa-arrow-up mr-1"></i>
                +4.7% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
            <GroupsIcon className="text-green-500 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">3.42%</h3>
              <p className="text-sm text-red-600 mt-2">
                <i className="fas fa-arrow-down mr-1"></i>
                -1.2% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
              <TrendingUpIcon className="text-red-500 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Revenue Overview
          </h3>
          <div id="revenue-chart" className="h-80"></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Sales Analytics
          </h3>
          <div id="sales-chart" className="h-80"></div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
          <button className="text-blue-500 hover:text-blue-600 text-sm font-medium !rounded-button whitespace-nowrap">
            View All Orders
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 text-sm">#ORD-7246</td>
                <td className="py-3 text-sm">John Smith</td>
                <td className="py-3 text-sm">Premium Package</td>
                <td className="py-3 text-sm">$59.99</td>
                <td className="py-3">
                  <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 text-sm">#ORD-7245</td>
                <td className="py-3 text-sm">Emma Wilson</td>
                <td className="py-3 text-sm">Basic Plan</td>
                <td className="py-3 text-sm">$29.99</td>
                <td className="py-3">
                  <span className="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
                    Pending
                  </span>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 text-sm">#ORD-7244</td>
                <td className="py-3 text-sm">Michael Brown</td>
                <td className="py-3 text-sm">Pro Subscription</td>
                <td className="py-3 text-sm">$99.99</td>
                <td className="py-3">
                  <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 text-sm">#ORD-7243</td>
                <td className="py-3 text-sm">Sarah Davis</td>
                <td className="py-3 text-sm">Custom Solution</td>
                <td className="py-3 text-sm">$199.99</td>
                <td className="py-3">
                  <span className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                    Cancelled
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 text-sm">#ORD-7242</td>
                <td className="py-3 text-sm">James Johnson</td>
                <td className="py-3 text-sm">Standard Plan</td>
                <td className="py-3 text-sm">$49.99</td>
                <td className="py-3">
                  <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Dashboard;
