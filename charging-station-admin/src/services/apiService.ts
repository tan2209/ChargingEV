import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://ev-charging-server-z3gr3glbrq-de.a.run.app/', 
    timeout: 10000,                      
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);


axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
