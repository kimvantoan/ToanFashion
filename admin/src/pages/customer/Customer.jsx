import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Stack,
} from "@mui/material";
import {
  Search,
  Edit,
  Delete,
  ArrowDownward,
  ArrowUpward,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../features/order/orderSlice";
import { getAllUsers } from "../../features/user/userSlice";
import { formatPrice } from "../../utils/formatPrice";
import { useNavigate } from "react-router-dom";
export default function CustomerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("desc");
  const { userList } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  const CountOrder = (userId) => {
    return orders.filter((order) => order.userId._id === userId).length;
  };

  const getSpentAmount = (userId) => {
    return orders
      .filter((order) => order.userId._id === userId)
      .reduce((total, order) => total + order.totalAmount, 0);
  };

  const filteredUsers = useMemo(() => {
    let users = userList;
    if (searchQuery) {
      users = users.filter(
        (user) =>
          user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortField) {
      users = [...users].sort((a, b) => {
        let aValue, bValue;
        if (sortField === "orders") {
          aValue = CountOrder(a._id);
          bValue = CountOrder(b._id);
        } else if (sortField === "spent") {
          aValue = getSpentAmount(a._id);
          bValue = getSpentAmount(b._id);
        }
        if (sortDirection === "asc") return aValue - bValue;
        return bValue - aValue;
      });
    }
    return users;
  }, [userList, searchQuery, sortField, sortDirection, orders]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 600, color: "#1a1a1a" }}
          >
            Khách hàng
          </Typography>
        </Box>

        {/* Search and Filter */}
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <TextField
            size="small"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flexGrow: 1, maxWidth: 400 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#666", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        {/* Customer Table */}
        <Paper elevation={1} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#fafafa" }}>
                  <TableCell
                    sx={{ fontWeight: 600, color: "#666", fontSize: "14px" }}
                  >
                    Tên khách hàng
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, color: "#666", fontSize: "14px" }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "#666",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSort("orders")}
                  >
                    Số đơn&nbsp;
                    {sortField === "orders" &&
                      (sortDirection === "asc" ? (
                        <ArrowUpward
                          fontSize="inherit"
                          sx={{ verticalAlign: "middle", fontSize: 16 }}
                        />
                      ) : (
                        <ArrowDownward
                          fontSize="inherit"
                          sx={{ verticalAlign: "middle", fontSize: 16 }}
                        />
                      ))}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "#666",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSort("spent")}
                  >
                    Đã chi&nbsp;
                    {sortField === "spent" &&
                      (sortDirection === "asc" ? (
                        <ArrowUpward
                          fontSize="inherit"
                          sx={{ verticalAlign: "middle", fontSize: 16 }}
                        />
                      ) : (
                        <ArrowDownward
                          fontSize="inherit"
                          sx={{ verticalAlign: "middle", fontSize: 16 }}
                        />
                      ))}
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, color: "#666", fontSize: "14px" }}
                  >
                    Thao tác
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((customer) => (
                  <TableRow
                    key={customer._id}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                      "&:last-child td": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 500, color: "#1a1a1a" }}
                        >
                          {customer.username}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: "#666" }}>
                        {customer.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: "#1a1a1a" }}>
                        {CountOrder(customer._id)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{ color: "#1a1a1a", fontWeight: 500 }}
                      >
                        {formatPrice(getSpentAmount(customer._id))}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/customer/${customer._id}`)}
                          sx={{ border: "1px solid #e0e0e0", color: "blue" }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{ border: "1px solid #e0e0e0", color: "red" }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
}
