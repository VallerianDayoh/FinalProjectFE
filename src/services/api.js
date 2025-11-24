import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// Membuat instance axios dengan konfigurasi default
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


// =====================================    ==================
// ERROR HANDLER
// Fungsi ini untuk menangani error dengan pesan yang lebih jelas.
// =======================================================
const handleError = (error) => {
  if (error.response) {
    // Ada response dari server, tapi statusnya error
    throw new Error(
      `Server Error: ${error.response.status} - ${
        error.response.data?.message || 'Something went wrong'
      }`
    );
  } else if (error.request) {
    // Request sudah dikirim, tapi server tidak merespons
    throw new Error(
      'Network Error: Unable to reach the server. Please check if json-server is running.'
    );
  } else {
    // Error lain (misalnya salah konfigurasi)
    throw new Error(`Error: ${error.message}`);
  }
};


// =======================================================
// PRODUCT API FUNCTIONS
// Semua fungsi CRUD untuk endpoint "/products".
// =======================================================

// GET ALL PRODUCTS
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// GET PRODUCT BY ID
export const getProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// CREATE NEW PRODUCT
export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// UPDATE PRODUCT
export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


// =======================================================
// EXPORT DEFAULT AXIOS INSTANCE
// Jika nanti ingin request custom, cukup import api.
// =======================================================
export default api;
