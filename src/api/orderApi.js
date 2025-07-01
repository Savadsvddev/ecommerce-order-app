import API from './axiosInstance';

export const placeOrder = async (data) => {
  try {
    const response = await API.post('/order', data);
    return response.data;
  } catch (error) {
    console.error('Add to cart failed:', error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await API.get(`/order/${localStorage.getItem("shop_id")}`);
    return response.data;
  } catch (error) {
    console.error('Fetching cart failed:', error);
    throw error;
  }
};