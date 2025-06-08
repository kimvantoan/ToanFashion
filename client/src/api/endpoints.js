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
    list: '/product',
    getProductBySlug: (slug) => `/product/${slug}`,
  },
  cart: {
    get: '/cart',
    add: '/cart',
    remove: (id) => `/cart/remove/${id}`,
    clear: '/cart/clear',
  },
  order:{
    create: '/order',
    getMyOrders: '/order/my',
    getOrderById: (id) => `/order/${id}`,
    createFromCart: '/order/from-cart',
  },
  voucher: {
    create: '/voucher',
    update: (id) => `/voucher/${id}`,
    getAll: '/voucher',
    delete: (id) => `/voucher/${id}`,
  },
  category:	 {
    getAll: '/category',
    getBySlug: (slug) => `/category',/${slug}`,
    create: '/category',
    update: (id) => `/category/${id}`,
    delete: (id) => `/category/${id}`,
  },
  checkout: {
    create: '/checkout',
  },
  address: {
    getAll: '/address',
    create: '/address',
    update: (id) => `/address/${id}`,
    delete: (id) => `/address/${id}`,
  },
};

export default API_ENDPOINTS;
