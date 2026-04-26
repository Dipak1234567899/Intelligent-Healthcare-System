import axios from "axios";

// const API = "http://localhost:5000/api";

const API = "https://your-backend.onrender.com/api";

export const getDiagnosis = (data) =>
  axios.post(`${API}/diagnosis`, data);

export const uploadImage = (formData) =>
  axios.post(`${API}/image`, formData);