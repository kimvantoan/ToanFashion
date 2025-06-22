const  API_ENDPOINTS = {
    auth:{
        login: '/user/loginAdmin',
        register: '/user/register',
        logout: '/user/logout',
        loginStatus: '/user/loginStatus',
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
}

export default API_ENDPOINTS;