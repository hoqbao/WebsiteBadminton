import axiosClient from "./axiosClient";

const bookingApi = {
    create: (data) => axiosClient.post('/bookings', data),
    getMyHistory: () => axiosClient.get('/bookings/my-history'),
    // Admin
    getAll: () => axiosClient.get('/bookings/all'), 
};
export default bookingApi;