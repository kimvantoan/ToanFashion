import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Box,
  Typography,
  TableSortLabel,
} from "@mui/material";
import {
  Search,
  FilterList,
  Add,
  MoreVert,
  Edit,
  Delete,
} from "@mui/icons-material";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../features/product/productSlice";
import { formatPrice } from "../../utils/formatPrice";
const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const itemsPerPage = 10;

  const getTotalStock = (variants) =>
    variants.reduce(
      (total, variant) =>
        total + variant.sizes.reduce((sizeTotal, size) => sizeTotal + size.stock, 0),
      0
    );

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: "Out of Stock", color: "error" };
    if (stock < 20) return { label: `${stock} in stock`, color: "warning" };
    return { label: `${stock} in stock`, color: "success" };
  };

  const handleMenuClick = (event, productId) => {
    setAnchorEl(event.currentTarget);
    setSelectedProductId(productId);
  };
  const dispath = useDispatch();
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProductId(null);
  };

  const handleDelete = () => {
    if (selectedProductId) {
      dispath(deleteProduct(selectedProductId));
    }
    handleMenuClose();
  };
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
    setPage(1);
  };

  let processedProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortBy) {
    processedProducts = processedProducts.sort((a, b) => {
      let aValue, bValue;
      if (sortBy === "inventory") {
        aValue = getTotalStock(a.variants);
        bValue = getTotalStock(b.variants);
      } else {
        aValue = a.price - (a.price * a.discount) / 100;
        bValue = b.price - (b.price * b.discount) / 100;
      }
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    });
  }

  const paginatedProducts = processedProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const navigate = useNavigate();

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h4" className="font-bold text-gray-900">
            Products
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/add-product")}
            startIcon={<Add />}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add Product
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <TextField
              fullWidth
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              InputProps={{
                className: "pl-10",
              }}
            />
          </div>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            className="text-gray-600 border-gray-300"
          >
            Filter
          </Button>
        </div>

        {/* Products Table */}
        <Paper className="shadow-sm">
          <TableContainer>
            <Table>
              <TableHead className="bg-gray-50">
                <TableRow>
                  <TableCell className="font-semibold text-gray-700">
                    Product
                  </TableCell>
                  <TableCell className="font-semibold text-gray-700">
                    <TableSortLabel
                      active={sortBy === "inventory"}
                      direction={sortBy === "inventory" ? sortDirection : "asc"}
                      onClick={() => handleSort("inventory")}
                    >
                      Inventory
                    </TableSortLabel>
                  </TableCell>
                  <TableCell className="font-semibold text-gray-700">
                    <TableSortLabel
                      active={sortBy === "price"}
                      direction={sortBy === "price" ? sortDirection : "asc"}
                      onClick={() => handleSort("price")}
                    >
                      Price
                    </TableSortLabel>
                  </TableCell>
                  <TableCell className="font-semibold text-gray-700">
                    Rating
                  </TableCell>
                  <TableCell className="font-semibold text-gray-700">
                    Brand
                  </TableCell>
                  <TableCell className="font-semibold text-gray-700">
                    Category
                  </TableCell>
                  <TableCell className="font-semibold text-gray-700">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedProducts.map((product) => {
                  const totalStock = getTotalStock(product.variants);
                  const stockStatus = getStockStatus(totalStock);
                  return (
                    <TableRow key={product._id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={product.images[0]?.url}
                            alt={product.name}
                            className="w-12 h-12"
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.category.name}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={stockStatus.label}
                          color={stockStatus.color}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {formatPrice(product.price)}
                          </span>
                          {product.discount > 0 && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(product.discount)}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>{product.rating.toFixed(1)}</span>
                          <span className="text-sm text-gray-500">
                            ({product.numReviews} votes)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-700">{product.brand}</span>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={product.category.name}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={(e) => handleMenuClick(e, product._id)}
                          size="small"
                        >
                          <MoreVert />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box className="flex justify-between items-center p-4 border-t">
            <Typography variant="body2" className="text-gray-600">
              Showing {(page - 1) * itemsPerPage + 1} to{" "}
              {Math.min(page * itemsPerPage, processedProducts.length)} of{" "}
              {processedProducts.length} results
            </Typography>
            <Pagination
              count={Math.ceil(processedProducts.length / itemsPerPage)}
              page={page}
              onChange={(_, newPage) => setPage(newPage)}
              color="primary"
            />
          </Box>
        </Paper>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => { handleMenuClose(); navigate(`/product/${selectedProductId}`); }}>
            <Edit  className="mr-2" fontSize="small" />
            Edit
          </MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); handleDelete(); }} className="text-red-600">
            <Delete   className="mr-2" fontSize="small" />
            Delete
          </MenuItem>
        </Menu>
      </div>
    </Layout>
  );
};

export default Products;
