import axios from "axios";

// const API = "http://localhost:5000/api";

const API = "https://healthcare-backend-u7hv.onrender.com"

export const getDiagnosis = (data) =>
  axios.post(`${API}/diagnosis`, data);

export const uploadImage = (formData) =>
  axios.post(`${API}/image`, formData);