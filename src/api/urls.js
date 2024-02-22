import apiClient from "./client";
import authStorage from "../auth/storage";

const addUrl = async (
  original_link,
  expirationDate,
) =>
  apiClient.post("/urls", {
    original_link,
    expirationDate,
  }, { headers: { authorization: `Bearer ${authStorage.getToken()}` }});

const getUrl = async (identifier) => apiClient.get(`/urls/${identifier}`, {}, { headers: { authorization: `Bearer ${authStorage.getToken()}` }});

const getAllUrls = async () => apiClient.get('/urls', {}, { headers: { authorization: `Bearer ${authStorage.getToken()}` }});

const deleteUrl = async (id) => apiClient.delete(`/urls/${id}`, {}, { headers: { authorization: `Bearer ${authStorage.getToken()}` }});

const clientsApi = {
    addUrl,
    getUrl,
    getAllUrls,
    deleteUrl,
};

export default clientsApi;