import { useEffect, useState } from "react";
import {
  Button,
  Chip,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Pagination,
  Tab,
  Tabs,
  Box,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocalOffer as CouponIcon,
  LocalShipping,
} from "@mui/icons-material";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import {
  fetchVouchers,
  deleteVoucher,
} from "../../features/voucher/voucherSlice";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../../utils/formatDate";

const Voucher = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const { vouchers } = useSelector((state) => state.voucher);
  useEffect(() => {
    dispatch(fetchVouchers());
  }, [dispatch]);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setCurrentPage(1);
  };

  const getFilteredVouchers = () => {
    let filtered = vouchers;
    const now = new Date();
    // Filter by tab
    if (activeTab === 1) {
        filtered = filtered.filter(
        (voucher) =>
          voucher.active === true && now <= new Date(voucher.endDate)
      );
    } else if (activeTab === 2) {
      filtered = filtered.filter(
        (voucher) =>
          voucher.active === false && now <= new Date(voucher.endDate)
      );
    } else if (activeTab === 3) {
      filtered = filtered.filter(
        (voucher) => now > new Date(voucher.endDate)
      );
    }
    // Filter by type
    if (filterValue === "percent") {
      filtered = filtered.filter((voucher) => voucher.discountType === "percent");
    } else if (filterValue === "fixed") {
      filtered = filtered.filter((voucher) => voucher.discountType === "fixed");
    }
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (voucher) =>
          voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          voucher.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  };

  const filteredVouchers = getFilteredVouchers();
  const totalPages = Math.ceil(filteredVouchers.length / itemsPerPage);
  const paginatedVouchers = filteredVouchers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusChip = (voucher) => {
    const now = new Date();
    const endDate = new Date(voucher.endDate);
    if (now > endDate) {
      return (
        <Chip
          label="Expired"
          size="small"
          sx={{
            backgroundColor: "#f3f4f6",
            color: "#6b7280",
            fontWeight: 500,
            fontSize: "0.75rem",
          }}
        />
      );
    }
    if (voucher.active) {
      return (
        <Chip
          label="Active"
          size="small"
          sx={{
            backgroundColor: "#dcfce7",
            color: "#166534",
            fontWeight: 500,
            fontSize: "0.75rem",
          }}
        />
      );
    }
    return (
      <Chip
        label="Inactive"
        size="small"
        sx={{
          backgroundColor: "#fef9c3",
          color: "#92400e",
          fontWeight: 500,
          fontSize: "0.75rem",
        }}
      />
    );
  };
  const navigate = useNavigate();
  const getCouponIcon = (voucher) => {
    return (
      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-100">
        <CouponIcon className="text-blue-600" fontSize="small" />
      </div>
    );
  };

  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto p-6 bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Coupons</h1>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/voucher/add")}
            sx={{
              backgroundColor: "#3b82f6",
              "&:hover": {
                backgroundColor: "#2563eb",
              },
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Create
          </Button>
        </div>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
                color: "#6b7280",
              },
              "& .Mui-selected": {
                color: "#3b82f6 !important",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#3b82f6",
              },
            }}
          >
            <Tab label="All Coupons" />
            <Tab label="Active Coupons" />
            <Tab label="Inactive Coupons" />
            <Tab label="Expired Coupons" />
          </Tabs>
        </Box>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              displayEmpty
              sx={{ backgroundColor: "white" }}
            >
              <MenuItem value="all">Filter</MenuItem>
              <MenuItem value="percent">Percentage</MenuItem>
              <MenuItem value="fixed">Fixed Amount</MenuItem>
            </Select>
          </FormControl>

          <div className="flex-1 relative">
            <TextField
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <SearchIcon className="text-gray-400 mr-2" fontSize="small" />
                ),
              }}
              sx={{ backgroundColor: "white" }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Table Header */}
          <div className="grid grid-cols-11 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-700">
            <div className="col-span-4">Coupon Code</div>
            <div className="col-span-2">Usage</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-3">Date</div>
            <div className="col-span-1">Action</div>
          </div>

          {/* Table Body */}
          {paginatedVouchers.map((voucher, idx) => (
            <div
              key={`${voucher._id}-${idx}`}
              className="grid grid-cols-11 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50"
            >
              <div className="col-span-4 flex items-center gap-3">
                {getCouponIcon(voucher)}
                <div>
                  <div className="font-medium text-gray-900">
                    {voucher.name}
                  </div>
                  <div className="text-sm text-gray-500">{voucher.code}</div>
                </div>
              </div>

              <div className="col-span-2 flex items-center">
                <span className="text-gray-900">{voucher.usedCount} times</span>
              </div>

              <div className="col-span-1 flex items-center">
                {getStatusChip(voucher)}
              </div>

              <div className="col-span-3 flex items-center">
                <span className="text-gray-600 text-sm">
                  {formatDate(voucher.startDate)} -{" "}
                  {formatDate(voucher.endDate)}
                </span>
              </div>

              {/* Action column */}
              <div className="col-span-1 flex items-center gap-2">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => navigate(`/voucher/edit/${voucher._id}`)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => {
                    dispatch(deleteVoucher(voucher._id));
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-2">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, page) => setCurrentPage(page)}
              color="primary"
              size="small"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#6b7280",
                },
                "& .Mui-selected": {
                  backgroundColor: "#3b82f6 !important",
                  color: "white",
                },
              }}
            />
          </div>
          <div className="text-sm text-gray-600">
            {filteredVouchers.length} Results
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Voucher;
