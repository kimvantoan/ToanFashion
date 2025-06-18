import { useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Box,
  Grid,
  Avatar,
  CircularProgress,
  Button,
} from "@mui/material"
import { CalendarToday, LocationOn, CreditCard, LocalShipping, Inventory2,Receipt, ArrowBack } from "@mui/icons-material"

// Mock data based on your schema
const mockOrder = {
  _id: "674a1b2c3d4e5f6789012345",
  userId: "674a1b2c3d4e5f6789012346",
  items: [
    {
      productId: "674a1b2c3d4e5f6789012347",
      name: "Áo thun nam basic",
      color: "Đen",
      size: "L",
      quantity: 2,
      price: 299000,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      productId: "674a1b2c3d4e5f6789012348",
      name: "Quần jean slim fit",
      color: "Xanh đậm",
      size: "32",
      quantity: 1,
      price: 599000,
      image: "/placeholder.svg?height=80&width=80",
    },
  ],
  shippingAddress: {
    fullName: "Nguyễn Văn A",
    phone: "0123456789",
    street: "123 Đường ABC",
    city: "Hồ Chí Minh",
    district: "Quận 1",
    ward: "Phường Bến Nghé",
    note: "Giao hàng giờ hành chính",
  },
  paymentMethod: "COD",
  paymentStatus: "unpaid",
  deliveryStatus: "processing",
  totalAmount: 1197000,
  voucher: null,
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T10:30:00Z",
}

const deliveryStatusOptions = [
  { value: "processing", label: "Đang xử lý", color: "warning" },
  { value: "shipped", label: "Đã giao vận", color: "info" },
  { value: "delivered", label: "Đã giao hàng", color: "success" },
  { value: "cancelled", label: "Đã hủy", color: "error" },
]

const paymentStatusConfig = {
  unpaid: { label: "Chưa thanh toán", color: "error" },
  paid: { label: "Đã thanh toán", color: "success" },
}

const paymentMethodLabels = {
  COD: "Thanh toán khi nhận hàng",
  PayPal: "PayPal",
  VNPAY: "VNPAY",
}

function OrderDetail() {
  const [deliveryStatus, setDeliveryStatus] = useState(mockOrder.deliveryStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusUpdate = (event) => {
    const newStatus = event.target.value
    setIsUpdating(true)
    // Simulate API call
    setTimeout(() => {
      setDeliveryStatus(newStatus)
      setIsUpdating(false)
    }, 1000)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusChip = (status, isDelivery = false) => {
    if (isDelivery) {
      const statusInfo = deliveryStatusOptions.find((opt) => opt.value === status)
      return statusInfo ? <Chip label={statusInfo.label} color={statusInfo.color} size="small" /> : null
    } else {
      const statusInfo = paymentStatusConfig[status]
      return statusInfo ? <Chip label={statusInfo.label} color={statusInfo.color} size="small" /> : null
    }
  }

  const subtotal = mockOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = 0
  const discount = 0

  return (
    <div className="container mx-auto p-6 max-w-7xl">
        <Button
        startIcon={<ArrowBack />}
        onClick={() => window.history.back()}
        className="mb-4 text-gray-600 hover:text-gray-800"
        sx={{
          textTransform: "none",
          fontSize: "14px",
          fontWeight: 500,
          color: "#6b7280",
          "&:hover": {
            color: "#374151",
            backgroundColor: "transparent",
          },
        }}
      >
        Quay lại
      </Button>
      {/* Header */}
      <div className="mb-6">
        <Typography variant="h4" component="h1" className="font-bold mb-2">
          Chi tiết đơn hàng
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Mã đơn hàng: #{mockOrder._id.slice(-8).toUpperCase()}
        </Typography>
      </div>

      <div className="flex gap-6">
        {/* Left Side - Order Details - 50% width */}
        <div className="w-1/2">
          <div className="space-y-6">
            {/* Order Information */}
            <Card className="shadow-md">
              <CardContent className="p-6">
                <Box className="flex items-center gap-2 mb-4">
                  <Inventory2 className="text-gray-600" />
                  <Typography variant="h6" component="h2" className="font-semibold">
                    Thông tin đơn hàng
                  </Typography>
                </Box>

                <div className="space-y-4">
                  <Box className="flex items-start gap-3">
                    <CalendarToday className="text-gray-500 text-xl mt-1" />
                    <div>
                      <Typography variant="body2" color="text.secondary">
                        Ngày đặt hàng
                      </Typography>
                      <Typography variant="body1" className="font-medium">
                        {formatDate(mockOrder.createdAt)}
                      </Typography>
                    </div>
                  </Box>

                  <Box className="flex items-start gap-3">
                    <CreditCard className="text-gray-500 text-xl mt-1" />
                    <div className="flex-1">
                      <Typography variant="body2" color="text.secondary">
                        Phương thức thanh toán
                      </Typography>
                      <Typography variant="body1" className="font-medium mb-1">
                        {paymentMethodLabels[mockOrder.paymentMethod]}
                      </Typography>
                      {getStatusChip(mockOrder.paymentStatus)}
                    </div>
                  </Box>

                  <Box className="flex items-start gap-3">
                    <LocalShipping className="text-gray-500 text-xl mt-1" />
                    <div className="flex-1">
                      <Typography variant="body2" color="text.secondary">
                        Trạng thái giao hàng
                      </Typography>
                      <Box className="mt-1">{getStatusChip(deliveryStatus, true)}</Box>
                    </div>
                  </Box>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Status Update */}
            <Card className="shadow-md">
              <CardContent className="p-6">
                <Typography variant="h6" component="h2" className="font-semibold mb-2">
                  Cập nhật trạng thái giao hàng
                </Typography>
                <Box className="flex items-center gap-4">
                  <FormControl size="small" className="min-w-[200px]">
                    <Select
                      value={deliveryStatus}
                      onChange={handleStatusUpdate}
                      disabled={isUpdating}
                    >
                      {deliveryStatusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {isUpdating && (
                    <Box className="flex items-center gap-2">
                      <CircularProgress size={16} />
                      <Typography variant="body2" color="text.secondary">
                        Đang cập nhật...
                      </Typography>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="shadow-md">
              <CardContent className="p-6">
                <Box className="flex items-center gap-2 mb-4">
                  <LocationOn className="text-gray-600" />
                  <Typography variant="h6" component="h2" className="font-semibold">
                    Địa chỉ giao hàng
                  </Typography>
                </Box>

                <div className="space-y-2">
                  <Typography variant="body1" className="font-medium">
                    {mockOrder.shippingAddress.fullName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {mockOrder.shippingAddress.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {mockOrder.shippingAddress.street}, {mockOrder.shippingAddress.ward},{" "}
                    {mockOrder.shippingAddress.district}, {mockOrder.shippingAddress.city}
                  </Typography>
                  {mockOrder.shippingAddress.note && (
                    <Box className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <Typography variant="body2" color="text.secondary">
                        <strong>Ghi chú:</strong> {mockOrder.shippingAddress.note}
                      </Typography>
                    </Box>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Side - Products & Summary - 50% width */}
        <div className="w-1/2">
          <div className="space-y-6">
            {/* Order Items */}
            <Card className="shadow-md">
              <CardContent className="p-6">
                <Box className="flex items-center gap-2 mb-4">
                  <Receipt className="text-gray-600" />
                  <Typography variant="h6" component="h2" className="font-semibold">
                    Sản phẩm đã đặt ({mockOrder.items.length} sản phẩm)
                  </Typography>
                </Box>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {mockOrder.items.map((item, index) => (
                    <Box key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <Avatar
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        variant="rounded"
                        className="w-16 h-16"
                      />

                      <Box className="flex-1 min-w-0">
                        <Typography variant="subtitle1" className="font-medium mb-1 truncate">
                          {item.name}
                        </Typography>
                        <div className="space-y-1">
                          <Typography variant="body2" color="text.secondary">
                            {item.color} • {item.size}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Số lượng: {item.quantity}
                          </Typography>
                        </div>
                      </Box>

                      <Box className="text-right">
                        <Typography variant="body1" className="font-medium">
                          {formatPrice(item.price)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatPrice(item.price * item.quantity)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="shadow-md">
              <CardContent className="p-6">
                <Typography variant="h6" component="h2" className="font-semibold mb-4">
                  Tổng kết đơn hàng
                </Typography>

                <div className="space-y-3">
                  <Box className="flex justify-between">
                    <Typography variant="body1">Tạm tính ({mockOrder.items.length} sản phẩm):</Typography>
                    <Typography variant="body1">{formatPrice(subtotal)}</Typography>
                  </Box>

                  <Box className="flex justify-between">
                    <Typography variant="body1">Phí vận chuyển:</Typography>
                    <Typography variant="body1" className="text-green-600">
                      {shippingFee === 0 ? "Miễn phí" : formatPrice(shippingFee)}
                    </Typography>
                  </Box>

                  {discount > 0 && (
                    <Box className="flex justify-between">
                      <Typography variant="body1">Giảm giá:</Typography>
                      <Typography variant="body1" className="text-green-600">
                        -{formatPrice(discount)}
                      </Typography>
                    </Box>
                  )}

                  <Divider className="my-3" />

                  <Box className="flex justify-between bg-blue-50 p-3 rounded-lg">
                    <Typography variant="h6" className="font-bold">
                      Tổng cộng:
                    </Typography>
                    <Typography variant="h6" className="font-bold text-blue-600">
                      {formatPrice(mockOrder.totalAmount)}
                    </Typography>
                  </Box>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail