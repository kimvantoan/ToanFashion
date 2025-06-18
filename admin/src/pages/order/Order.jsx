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
  Checkbox,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Pagination,
  Typography,
  InputAdornment,
  IconButton,
  TableSortLabel,
} from "@mui/material";
import { Search, Edit, Delete, FileDownload, Add } from "@mui/icons-material";
import Layout from "../../components/Layout";

const sampleOrders = [
  {
    id: "#12512B",
    date: "May 5, 4:20 PM",
    customer: "Tom Anderson",
    paymentStatus: "Paid",
    orderStatus: "Ready",
    total: "$49.90",
  },
  {
    id: "#12523C",
    date: "May 5, 4:15 PM",
    customer: "Jayden Walker",
    paymentStatus: "Paid",
    orderStatus: "Ready",
    total: "$34.36",
  },
  {
    id: "#51232A",
    date: "May 5, 4:15 PM",
    customer: "Inez Kim",
    paymentStatus: "Paid",
    orderStatus: "Ready",
    total: "$5.51",
  },
  {
    id: "#23534D",
    date: "May 5, 4:12 PM",
    customer: "Francisco Henry",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    total: "$29.74",
  },
  {
    id: "#51323C",
    date: "May 5, 4:12 PM",
    customer: "Violet Phillips",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    total: "$23.06",
  },
  {
    id: "#35622A",
    date: "May 5, 4:12 PM",
    customer: "Rosetta Becker",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    total: "$87.44",
  },
  {
    id: "#34232D",
    date: "May 5, 4:10 PM",
    customer: "Dean Love",
    paymentStatus: "Paid",
    orderStatus: "Ready",
    total: "$44.55",
  },
  {
    id: "#56212D",
    date: "May 5, 4:08 PM",
    customer: "Nettie Tyler",
    paymentStatus: "Paid",
    orderStatus: "Ready",
    total: "$36.79",
  },
  {
    id: "#76543E",
    date: "May 5, 4:08 PM",
    customer: "Lora Weaver",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    total: "$28.78",
  },
  {
    id: "#12512B",
    date: "May 5, 4:05 PM",
    customer: "Vincent Cannon",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    total: "$96.46",
  },
  {
    id: "#12523C",
    date: "May 5, 4:05 PM",
    customer: "Nettie Palmer",
    paymentStatus: "Paid",
    orderStatus: "Received",
    total: "$25.53",
  },
  {
    id: "#23534D",
    date: "May 5, 4:04 PM",
    customer: "Miguel Harris",
    paymentStatus: "Pending",
    orderStatus: "Ready",
    total: "$50.54",
  },
  {
    id: "#12523C",
    date: "May 5, 4:04 PM",
    customer: "Angel Conner",
    paymentStatus: "Pending",
    orderStatus: "Ready",
    total: "$63.47",
  },
  {
    id: "#51232A",
    date: "May 5, 4:03 PM",
    customer: "Rosalie Singleton",
    paymentStatus: "Pending",
    orderStatus: "Received",
    total: "$91.63",
  },
];

const Order = () => {
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const rowsPerPage = 10;

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelected = filteredOrders
        .slice((page - 1) * rowsPerPage, page * rowsPerPage)
        .map((order) => order.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleSelectOne = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortField(field);
  };

  const filteredOrders = useMemo(() => {
    const filtered = sampleOrders.filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === "all" ||
        order.paymentStatus.toLowerCase() === filterStatus ||
        order.orderStatus.toLowerCase() === filterStatus;
      return matchesSearch && matchesFilter;
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

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const isIndeterminate =
    selected.length > 0 && selected.length < paginatedOrders.length;
  const isAllSelected =
    paginatedOrders.length > 0 && selected.length === paginatedOrders.length;
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
            <InputLabel>Filter</InputLabel>
            <Select
              value={filterStatus}
              label="Filter"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
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
                  <TableCell className="font-semibold">Order Status</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortField === "total"}
                      direction={sortField === "total" ? sortDirection : "asc"}
                      onClick={() => handleSort("total")}
                      className="font-semibold"
                    >
                      Total
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow
                    key={`${order.id}-${order.customer}`}
                    hover
                    className={isSelected(order.id) ? "bg-blue-50" : ""}
                  >
                    <TableCell className="font-medium text-blue-600">
                      {order.id}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {order.date}
                    </TableCell>
                    <TableCell className="text-gray-900">
                      {order.customer}
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
                        label={order.orderStatus}
                        color={getStatusColor(order.orderStatus, "order")}
                        size="small"
                        className="font-medium"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{order.total}</TableCell>
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
