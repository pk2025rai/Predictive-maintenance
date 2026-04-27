import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api/v1";


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