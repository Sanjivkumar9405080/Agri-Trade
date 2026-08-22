import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}/api/profile`;

const getToken = () => {
  return localStorage.getItem("token");
};


// GET PROFILE
export const getProfile = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.data;
};


// UPDATE PROFILE
export const updateProfile = async (profileData) => {
  const response = await axios.put(
    API_URL,
    profileData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
};


// GET USER PROFILE BY ID
export const getUserProfileById = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.data;
};