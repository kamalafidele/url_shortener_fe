import { create } from 'apisauce';
// https://url-shortener.onrender.com/api/v1
const apiClient = create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 1000000,
});

export default apiClient;