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
    }
}

export default API_ENDPOINTS;