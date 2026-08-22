import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}/api/upload`;

export const uploadImageToCloudinary = async (base64Image) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    { image: base64Image },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
};
