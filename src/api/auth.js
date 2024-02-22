import apiClient from "./client";

const login = async (email, password) => apiClient.post('/auth/login', { email, password });

const signup = async (firstName, lastName, email, password) => apiClient.post('/auth/register', { firstName, lastName, email, password });

const authApi = { login, signup }

export default authApi;
