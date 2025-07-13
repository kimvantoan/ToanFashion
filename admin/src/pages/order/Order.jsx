import React from "react";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Pagination,
  Typography,
  InputAdornment,
  TableSortLabel,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import Layout from "../../components/Layout";

import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../features/order/orderSlice";
import { useEffect } from "react";
import formatDate from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";
import {useNavigate} from "react-router-dom"
const Order = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [deliveryFilter, setDeliveryFilter] = useState("all");

  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const rowsPerPage = 10;

  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  console.log(orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortField(field);
  };

  const filteredOrders = useMemo(() => {
    const filtered = orders.filter((order) => {
      const matchesSearch =
        order.userId.username
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order._id?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPayment =
        paymentFilter === "all" ||
        order.paymentStatus?.toLowerCase() === paymentFilter;

      const matchesDelivery =
        deliveryFilter === "all" ||
        order.deliveryStatus?.toLowerCase() === deliveryFilter;

      return matchesSearch && matchesPayment && matchesDelivery;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle date sorting
      if (sortField === "date") {
        aValue = new Date(aValue).getTime().toString();
        bValue = new Date(bValue).getTime().toString();
      }

      // Handle total sorting (remove $ and convert to number)
      if (sortField === "total") {
        aValue = Number.parseFloat(aValue.replace("$", "")).toString();
        bValue = Number.parseFloat(bValue.replace("$", "")).toString();
      }

      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return filtered;
  }, [searchTerm, filterStatus, sortField, sortDirection]);

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

  const getStatusColor = (status, type) => {
    if (type === "payment") {
      return status === "Paid" ? "success" : "warning";
    } else {
      switch (status) {
        case "Ready":
          return "warning";
        case "Shipped":
          return "info";
        case "Received":
          return "primary";
        default:
          return "default";
      }
    }
  };
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h4" className="font-bold text-gray-900">
              Orders
            </Typography>
          </div>

          {/* Filters and Search */}
          <div className="flex gap-4 mb-6">
            <FormControl size="small" className="min-w-32">
              <InputLabel>Payment</InputLabel>
              <Select
                value={paymentFilter}
                label="Payment"
                onChange={(e) => setPaymentFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" className="min-w-32">
              <InputLabel>Delivery</InputLabel>
              <Select
                value={deliveryFilter}
                label="Delivery"
                onChange={(e) => setDeliveryFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="ready">Ready</MenuItem>
                <MenuItem value="shipped">Shipped</MenuItem>
                <MenuItem value="received">Received</MenuItem>
              </Select>
            </FormControl>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              className="flex-1 max-w-md"
            />
          </div>

          {/* Data Table */}
          <Paper className="shadow-sm">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow className="bg-gray-50">
                    <TableCell>
                      <TableSortLabel
                        active={sortField === "id"}
                        direction={sortField === "id" ? sortDirection : "asc"}
                        onClick={() => handleSort("id")}
                        className="font-semibold"
                      >
                        Order
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortField === "date"}
                        direction={sortField === "date" ? sortDirection : "asc"}
                        onClick={() => handleSort("date")}
                        className="font-semibold"
                      >
                        Date
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortField === "customer"}
                        direction={
                          sortField === "customer" ? sortDirection : "asc"
                        }
                        onClick={() => handleSort("customer")}
                        className="font-semibold"
                      >
                        Customer
                      </TableSortLabel>
                    </TableCell>
                    <TableCell className="font-semibold">
                      Payment status
                    </TableCell>
                    <TableCell className="font-semibold">
                      Order Status
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortField === "total"}
                        direction={
                          sortField === "total" ? sortDirection : "asc"
                        }
                        onClick={() => handleSort("total")}
                        className="font-semibold"
                      >
                        Total
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={`${order._id}`}  onClick={() => navigate(`/order/${order._id}`)} hover>
                      <TableCell className="font-medium text-blue-600">
                        {order._id}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {formatDate(order.createdAt)}
                      </TableCell>
                      <TableCell className="text-gray-900">
                        {order.userId.username}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={order.paymentStatus}
                          color={getStatusColor(order.paymentStatus, "payment")}
                          size="small"
                          className="font-medium"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={order.deliveryStatus}
                          color={getStatusColor(order.deliveryStatus, "order")}
                          size="small"
                          className="font-medium"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatPrice(order.totalAmount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <Typography variant="body2" className="text-gray-600">
              {filteredOrders.length} Results
            </Typography>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, newPage) => setPage(newPage)}
              color="primary"
              showFirstButton
              showLastButton
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
