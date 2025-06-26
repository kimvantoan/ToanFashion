
const API_ENDPOINTS = {
  auth: {
    login: '/user/login',
    register: '/user/register',
    logout: '/user/logout',
    loginStatus: '/user/loginStatus',
  },
  user: {
    profile: '/user/profile',
    updateProfile: '/user/profile/update',
  },
  product: {
    getAll: '/product',
    getNewProducts: '/product/new',
    getProductBySlug: (slug) => `/product/slug/${slug}`,
    getProductsByCategory: (categorySlug) => `/product/category/${categorySlug}`,
  },
  cart: {
    get: '/cart',
    add: '/cart',
    update:(id) => `/cart/${id}`,
    remove: (id) => `/cart/${id}`,
    clear: '/cart/clear',
  },
  order:{
    create: '/order',
    getMyOrders: '/order/my',
    getOrderById: (id) => `/order/${id}`,
    createFromCart: '/order/from-cart',
  },
  voucher: {
    getAll: '/voucher',
  },
  category:	 {
    getAll: '/category',
    getBySlug: (slug) => `/category/slug/${slug}`,
  },
  checkout: {
    get: '/checkout',
  },
  address: {
    getAll: '/address',
    create: '/address',
    update: (id) => `/address/${id}`,
    delete: (id) => `/address/${id}`,
  },
};

export default API_ENDPOINTS;
