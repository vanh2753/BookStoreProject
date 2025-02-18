import axios from 'axios';
import { store } from '../redux/store';
const instance = axios.create({
    baseURL: 'http://localhost:8080/api/',
    timeout: 1000,
});

//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

axios.interceptors.request.use(function (config) {
    try {
        const token = store?.getState()?.user?.access_token;
        console.log('Token:', token);
        if (token) {
            config.headers["authorization"] = "Bearer " + token;
        }
        return config;
    } catch (error) {
        console.error('Error in interceptor:', error);
        return config; // Vẫn trả về config để không chặn request
    }
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instance