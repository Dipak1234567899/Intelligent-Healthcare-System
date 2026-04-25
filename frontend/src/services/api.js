import axios from "axios";

const API = "http://localhost:5000/api";

export const getDiagnosis = (data) =>
  axios.post(`${API}/diagnosis`, data);

export const uploadImage = (formData) =>
  axios.post(`${API}/image`, formData);