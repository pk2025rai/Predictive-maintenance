import axios from "axios";

const API_BASE = "http://localhost:8000/api/v1";
const API_BASE_URL = "";

export const getMachines = () => axios.get(`${API_BASE}/machines`);


export const getMachine = (id) =>
  axios.get(`${API_BASE}/machines/${id}`);


export const predictFailure = (data) =>
  axios.post(`${API_BASE}/predictions/failure`, data);


export const estimateCost = (data) =>
  axios.post(`${API_BASE}/costs/estimate`, data);

export const getDashboard = () =>
  axios.get(`${API_BASE}/dashboard/summary`);

export const getAlerts = () =>
  axios.get(`${API_BASE}/alerts`);