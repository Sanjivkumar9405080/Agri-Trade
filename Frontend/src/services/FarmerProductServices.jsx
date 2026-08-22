import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}/api/farmer/products`;

const getToken = () => {
  return localStorage.getItem("token");
};

// Get farmer's products
export const getMyProducts = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.data;
};

// Add new product
export const addProduct = async (productData) => {
  const response = await axios.post(
    API_URL,
    productData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
};

export const getFarmerProducts = getMyProducts;
export const getFarmerProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
};
export const createProduct = addProduct;
export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/${id}`, productData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json"
    }
  });
  return response.data;
};
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
};