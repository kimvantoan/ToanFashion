import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/product/productSlice";
import React, { useEffect } from "react";
import { fetchOrders } from "../features/order/orderSlice";
import {
  fetchMonthlyRevenue,
  fetchOrderStatusStats,
  fetchDailyOrderStats,
  fetchProductCategoryRatio,
} from "../features/chart/chartSlice";
import {getAllUsers} from "../features/user/userSlice";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.order);
  const { userList } = useSelector((state) => state.user);
  const {
    monthlyRevenue,
    orderStatusStats,
    dailyOrderStats,
    productCategoryRatio,
  } = useSelector((state) => state.chart);
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
    dispatch(fetchMonthlyRevenue());
    dispatch(fetchOrderStatusStats());
    dispatch(fetchDailyOrderStats());
    dispatch(fetchProductCategoryRatio());
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <Layout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Product</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {products.length}
                </h3>
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
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {" "}
                  {orders.length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                <ShoppingBagIcon className="text-purple-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Customers</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{userList.length}</h3>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <GroupsIcon className="text-green-500 text-xl" />
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
            <div id="revenue-chart" className="h-80">
              <ResponsiveContainer width="100%" height={330}>
                <LineChart
                  data={monthlyRevenue}
                  margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    label={{
                      value: "Tháng",
                      position: "insideBottom",
                      offset: -5,
                      fill: "#475569",
                      fontSize: 14,
                    }}
                  />
                  <YAxis
                    tickFormatter={(value) =>
                      new Intl.NumberFormat("vi-VN").format(value)
                    }
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    label={{
                      value: "Doanh thu (VNĐ)",
                      angle: -90,
                      position: "insideLeft",
                      offset: 10,
                      fill: "#475569",
                      fontSize: 14,
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 13,
                    }}
                    formatter={(value) =>
                      new Intl.NumberFormat("vi-VN").format(value) + " VNĐ"
                    }
                    labelFormatter={(label) => `Tháng ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{
                      r: 5,
                      stroke: "#3b82f6",
                      fill: "#fff",
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 7,
                      fill: "#3b82f6",
                      stroke: "#60a5fa",
                      strokeWidth: 2,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Daily Orders
            </h3>
            <div id="revenue-chart" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dailyOrderStats}
                  barCategoryGap="30%"
                  barGap={2}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    angle={-30}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: "14px", borderRadius: "8px" }}
                    formatter={(value) => [`${value} đơn`, "Số lượng"]}
                    labelFormatter={(label) => `Ngày: ${label}`}
                  />
                  <Bar
                    dataKey="totalOrders"
                    fill="#10b981"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Order Status Distribution
            </h3>
            <div
              id="order-status-chart"
              className="h-80 flex items-center justify-center"
            >
              <PieChart width={400} height={300}>
                <Pie
                  data={orderStatusStats}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {orderStatusStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Product Category Ratio
            </h3>
            <div
              id="product-category-ratio-chart"
              className="h-80 flex items-center justify-center"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productCategoryRatio}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ category }) => category}
                  >
                    {productCategoryRatio.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} sản phẩm`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
