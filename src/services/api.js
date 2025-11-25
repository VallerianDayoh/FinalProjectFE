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


// =======================================================
// ERROR HANDLER
// =======================================================
const handleError = (error) => {
  if (error.response) {
    // Ada response dari server, tapi statusnya error
    throw new Error(
      `Server Error: ${error.response.status} - ${
        error.response.data?.message || 'Terjadi kesalahan pada server.'
      }`
    );
  } else if (error.request) {
    // Request sudah dikirim, tapi server tidak merespons
    throw new Error(
      'Network Error: Gagal terhubung ke server. Pastikan json-server berjalan.'
    );
  } else {
    // Error lain (misalnya salah konfigurasi)
    throw new Error(`Error: ${error.message}`);
  }
};


// =======================================================
// UTILITY: Data Transformation
// =======================================================

// Fungsi untuk mengkonversi data dari format API (name) ke format Aplikasi (title)
const formatProductForApp = (product) => ({
    ...product,
    title: product.name || product.title, // Ambil 'name' dan ubah jadi 'title'
});

// Fungsi untuk mengkonversi data dari format Aplikasi (title) ke format API (name)
const formatProductForApi = (productData) => {
    // Jika productData.title ada, gunakan itu sebagai 'name'
    if (productData.title) {
        // eslint-disable-next-line no-unused-vars
        const { title, ...rest } = productData;
        return {
            ...rest,
            name: title, // Mengganti 'title' menjadi 'name'
        };
    }
    return productData; // Jika tidak ada 'title', kirim apa adanya
};


// GET ALL PRODUCTS
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    // Map setiap item untuk mengkonversi 'name' menjadi 'title'
    return response.data.map(formatProductForApp);
  } catch (error) {
    handleError(error);
  }
};

// GET PRODUCT BY ID
export const getProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    // Konversi 'name' menjadi 'title'
    return formatProductForApp(response.data);
  } catch (error) {
    handleError(error);
  }
};

// CREATE NEW PRODUCT
export const createProduct = async (productData) => {
  try {
    // Konversi 'title' menjadi 'name' sebelum dikirim
    const dataToSend = formatProductForApi(productData);
    const response = await api.post('/products', dataToSend);
    // Konversi data balik (jika ada)
    return formatProductForApp(response.data); 
  } catch (error) {
    handleError(error);
  }
};

// UPDATE PRODUCT
export const updateProduct = async (id, productData) => {
  try {
    // Konversi 'title' menjadi 'name' sebelum dikirim
    const dataToSend = formatProductForApi(productData);
    // Menggunakan PATCH karena kita hanya perlu mengupdate field yang berubah, 
    // meskipun PUT juga bisa, PATCH lebih efisien. json-server mendukung keduanya.
    const response = await api.patch(`/products/${id}`, dataToSend); 
    // Konversi data balik (jika ada)
    return formatProductForApp(response.data);
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
// =======================================================
export default api;