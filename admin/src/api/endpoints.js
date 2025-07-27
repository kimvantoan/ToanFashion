const  API_ENDPOINTS = {
    auth:{
        login: '/user/loginAdmin',
        register: '/user/register',
        logout: '/user/logout',
        loginStatus: '/user/loginStatus',
        allUser: '/user',
    },
    category: {
        getAll: '/category',
        create: '/category',
        update: '/category/:id',
        delete: '/category/:id',
    },
    product: {
        getAll: '/product',
        getById: '/product/:id',
        create: '/product',
        update: '/product/:id',
        delete: '/product/:id',
    },
    voucher: {
        getAll: '/voucher',
        getById: '/voucher/:id',
        create: '/voucher',
        update: '/voucher/:id',
        delete: '/voucher/:id',
    },
    order: {
        getAll: '/order',
        getOrderById: '/order/:id',
        updateDeliveryStatus: '/order/:id/delivery',
        updatePaymentStatus: '/order/:id/payment',
    },
    chart: {
        getMonthlyRevenue: '/chart/statistics/revenue',
        getOrderStatusStats: '/chart/statistics/order-status',
        getDailyOrderStats: '/chart/statistics/daily-orders',
        getProductCategoryRatio: '/chart/statistics/product-category-ratio',
    },
}

export default API_ENDPOINTS;