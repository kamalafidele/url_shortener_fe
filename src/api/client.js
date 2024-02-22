import { create } from 'apisauce';

const apiClient = create({
    baseURL: 'https://url-shortener-be-k0sr.onrender.com/api/v1',
    timeout: 1000000,
});

export default apiClient;