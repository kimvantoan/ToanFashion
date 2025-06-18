import React from 'react'
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TextField,
  Button,
  Chip,
  Rating,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Box,
  Typography,
  TableSortLabel,
} from "@mui/material"
import { Search, FilterList, FileDownload, Add, MoreVert, Edit, Delete } from "@mui/icons-material"
import Layout from '../../components/Layout'
import { useNavigate } from 'react-router-dom'

// Mock data based on your schema
const mockProducts = [
  {
    _id: "1",
    name: "Men Grey Hoodie",
    slug: "men-grey-hoodie",
    description: "Comfortable grey hoodie for men",
    price: 49.9,
    discount: 0,
    images: [{ url: "/placeholder.svg?height=50&width=50", public_id: "hoodie1" }],
    category: { name: "Hoodies" },
    brand: "Nike",
    variants: [
      {
        color: "Black",
        sizes: [
          { size: "S", stock: 20 },
          { size: "M", stock: 30 },
          { size: "L", stock: 25 },
          { size: "XL", stock: 21 },
        ],
      },
    ],
    rating: 5.0,
    numReviews: 32,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    _id: "2",
    name: "Women Striped T-Shirt",
    slug: "women-striped-t-shirt",
    description: "Stylish striped t-shirt for women",
    price: 34.9,
    discount: 10,
    images: [{ url: "/placeholder.svg?height=50&width=50", public_id: "tshirt1" }],
    category: { name: "T-Shirts" },
    brand: "Adidas",
    variants: [
      {
        color: "White",
        sizes: [
          { size: "S", stock: 15 },
          { size: "M", stock: 20 },
          { size: "L", stock: 21 },
        ],
      },
    ],
    rating: 4.8,
    numReviews: 24,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
  },
  {
    _id: "3",
    name: "Women White T-Shirt",
    slug: "women-white-t-shirt",
    description: "Classic white t-shirt for women",
    price: 40.9,
    discount: 0,
    images: [{ url: "/placeholder.svg?height=50&width=50", public_id: "tshirt2" }],
    category: { name: "T-Shirts" },
    brand: "H&M",
    variants: [
      {
        color: "White",
        sizes: [
          { size: "S", stock: 25 },
          { size: "M", stock: 30 },
          { size: "L", stock: 23 },
        ],
      },
    ],
    rating: 5.0,
    numReviews: 54,
    createdAt: "2024-01-12",
    updatedAt: "2024-01-19",
  },
  {
    _id: "4",
    name: "Men White T-Shirt",
    slug: "men-white-t-shirt",
    description: "Basic white t-shirt for men",
    price: 49.9,
    discount: 5,
    images: [{ url: "/placeholder.svg?height=50&width=50", public_id: "tshirt3" }],
    category: { name: "T-Shirts" },
    brand: "Uniqlo",
    variants: [
      {
        color: "White",
        sizes: [
          { size: "M", stock: 15 },
          { size: "L", stock: 17 },
        ],
      },
    ],
    rating: 4.5,
    numReviews: 31,
    createdAt: "2024-01-08",
    updatedAt: "2024-01-16",
  },
  {
    _id: "5",
    name: "Women Red T-Shirt",
    slug: "women-red-t-shirt",
    description: "Vibrant red t-shirt for women",
    price: 34.9,
    discount: 15,
    images: [{ url: "/placeholder.svg?height=50&width=50", public_id: "tshirt4" }],
    category: { name: "T-Shirts" },
    brand: "Zara",
    variants: [
      {
        color: "Red",
        sizes: [
          { size: "S", stock: 12 },
          { size: "M", stock: 20 },
        ],
      },
    ],
    rating: 4.9,
    numReviews: 22,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-14",
  },
]
const Products = () => {
    const [products] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const [anchorEl, setAnchorEl] = useState(null)
  // Add these new state variables
  const [sortBy, setSortBy] = useState(null)
  const [sortDirection, setSortDirection] = useState("asc")

  const itemsPerPage = 10
  const totalPages = Math.ceil(products.length / itemsPerPage)
    const navigate = useNavigate()
  // Calculate total stock for each product
  const getTotalStock = (variants) => {
    return variants.reduce((total, variant) => {
      return total + variant.sizes.reduce((sizeTotal, size) => sizeTotal + size.stock, 0)
    }, 0)
  }

  // Get stock status
  const getStockStatus = (stock) => {
    if (stock === 0) return { label: "Out of Stock", color: "error" }
    if (stock < 20) return { label: "Low Stock", color: "warning"  }
    return { label: `${stock} in stock`, color: "success" }
  }

  // Handle menu
  const handleMenuClick = (event, productId) => {
    setAnchorEl(event.currentTarget)
    setSelectedProductId(productId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedProductId(null)
  }

  // Add this new function
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("asc")
    }
    setPage(1) // Reset to first page when sorting
  }

  // Filter and sort products
  let processedProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Apply sorting
  if (sortBy) {
    processedProducts = processedProducts.sort((a, b) => {
      let aValue
      let bValue

      if (sortBy === "inventory") {
        aValue = getTotalStock(a.variants)
        bValue = getTotalStock(b.variants)
      } else {
        // price
        aValue = a.price - (a.price * a.discount) / 100
        bValue = b.price - (b.price * b.discount) / 100
      }

      if (sortDirection === "asc") {
        return aValue - bValue
      } else {
        return bValue - aValue
      }
    })
  }

  const paginatedProducts = processedProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage)
  return (
    <Layout>
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="font-bold text-gray-900">
          Products
        </Typography>
        <div className="flex gap-3">
          <Button variant="contained" onClick={() => navigate("/add-product")} startIcon={<Add />} className="bg-blue-600 hover:bg-blue-700">
            Add Product
          </Button>
        </div>
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
        <Button variant="outlined" startIcon={<FilterList />} className="text-gray-600 border-gray-300">
          Filter
        </Button>
      </div>

      {/* Products Table */}
      <Paper className="shadow-sm">
        <TableContainer>
          <Table>
            <TableHead className="bg-gray-50">
              <TableRow>
                <TableCell className="font-semibold text-gray-700">Product</TableCell>
                <TableCell className="font-semibold text-gray-700">
                  <TableSortLabel
                    active={sortBy === "inventory"}
                    direction={sortBy === "inventory" ? sortDirection : "asc"}
                    onClick={() => handleSort("inventory")}
                    className="font-semibold text-gray-700"
                  >
                    Inventory
                  </TableSortLabel>
                </TableCell>
                <TableCell className="font-semibold text-gray-700">
                  <TableSortLabel
                    active={sortBy === "price"}
                    direction={sortBy === "price" ? sortDirection : "asc"}
                    onClick={() => handleSort("price")}
                    className="font-semibold text-gray-700"
                  >
                    Price
                  </TableSortLabel>
                </TableCell>
                <TableCell className="font-semibold text-gray-700">Rating</TableCell>
                <TableCell className="font-semibold text-gray-700">Brand</TableCell>
                <TableCell className="font-semibold text-gray-700">Category</TableCell>
                <TableCell className="font-semibold text-gray-700">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProducts.map((product) => {
                const totalStock = getTotalStock(product.variants)
                const stockStatus = getStockStatus(totalStock)
                const finalPrice = product.price - (product.price * product.discount) / 100

                return (
                  <TableRow key={product._id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar src={product.images[0]?.url} alt={product.name} className="w-12 h-12" />
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.category.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip label={stockStatus.label} color={stockStatus.color} size="small" variant="outlined" />
                    </TableCell>
                  
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">${finalPrice.toFixed(2)}</span>
                        {product.discount > 0 && (
                          <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{product.rating.toFixed(1)}</span>
                        <span className="text-sm text-gray-500">({product.numReviews} votes)</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-700">{product.brand}</span>
                    </TableCell>
                    <TableCell>
                      <Chip label={product.category.name} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleMenuClick(e, product._id)} size="small">
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box className="flex justify-between items-center p-4 border-t">
          <Typography variant="body2" className="text-gray-600">
            Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, processedProducts.length)} of{" "}
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
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>
          <Edit className="mr-2" fontSize="small" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose} className="text-red-600">
          <Delete className="mr-2" fontSize="small" />
          Delete
        </MenuItem>
      </Menu>
    </div>
    </Layout>
  )
}

export default Products