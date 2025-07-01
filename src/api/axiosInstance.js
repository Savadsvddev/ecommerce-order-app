// src/api/axiosInstance.js
import axios from 'axios';
import { API_BASE_URL } from '../lib/configuration';

const API = axios.create({
  baseURL: API_BASE_URL, // your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
