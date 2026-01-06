// src/api/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api', // Cổng Backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor: Gắn Token vào mọi request
axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor: Xử lý lỗi chung (Ví dụ hết hạn Token thì đá ra Login)
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data; // Trả về data gọn gàng
    }
    return response;
}, (error) => {
    if (error.response && error.response.status === 403) {
        // alert("Bạn không có quyền truy cập!");
    }
    throw error;
});

export default axiosClient;