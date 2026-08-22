import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}/api/farmer/products`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  };
};

// GET LOGGED-IN FARMER'S PRODUCTS
export const getFarmerProducts = async () => {
  const response = await axios.get(API_URL, getAuthHeader());
  return response.data;
};

// GET SINGLE FARMER PRODUCT BY ID
export const getFarmerProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeader());
  return response.data;
};

// CREATE PRODUCT
export const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData, getAuthHeader());
  return response.data;
};

// UPDATE PRODUCT
export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/${id}`, productData, getAuthHeader());
  return response.data;
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  return response.data;
};
