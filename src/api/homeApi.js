// src/api/cartApi.js
import API from './axiosInstance';

export const getCategories = async () => {
  try {
    const response = await API.get(`/categories`);
    return response.data;
  } catch (error) {
    console.error('Fetching cart failed:', error);
    throw error;
  }
};

export const getProducts = async (data) => {
  try {
    const response = await API.post(`/products/all-products`, data);
    return response.data;
  } catch (error) {
    console.error('Fetching cart failed:', error);
    throw error;
  }
};
