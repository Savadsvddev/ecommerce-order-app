// src/api/cartApi.js
import API from './axiosInstance';

export const addToCart = async (data) => {
  try {
    const response = await API.post('/cart/add', data);
    return response.data;
  } catch (error) {
    console.error('Add to cart failed:', error);
    throw error;
  }
};

export const getCartItems = async (userId) => {
  try {
    const response = await API.get(`/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Fetching cart failed:', error);
    throw error;
  }
};

export const updateCart = async (data) => {
  try {
    const response = await API.put(`/cart/update/${data?.cart_id}`, data);
    return response.data;
  } catch (error) {
    console.error('Update cart failed:', error);
    throw error;
  }
};

export const deleteCart = async (data) => {
  try {
    const response = await API.delete(`/cart/delete/${data?.cart_id}`);
    return response.data;
  } catch (error) {
    console.error('Delete cart failed:', error);
    throw error;
  }
};
