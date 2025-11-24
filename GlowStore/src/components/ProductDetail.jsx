import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false); // In a real app, this would come from user authentication

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    // In a real application, you would check user authentication status to determine admin role
    // For now, we'll set this to false to simulate regular user experience
    setIsAdmin(false);

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      alert('This product is out of stock!');
      return;
    }

    if (quantity > product.stock) {
      alert(`Only ${product.stock} items available in stock!`);
      return;
    }

    addToCart({...product, quantity: quantity});
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleQuantityChange = (value) => {
    if (value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 border border-gray-200">
          <div className="text-center py-8">
            <p className="text-red-500 mb-4 text-lg">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-gradient-to-r from-sky-blue-500 to-indigo-600 text-white rounded-lg hover:from-sky-blue-600 hover:to-indigo-700 shadow-md transition duration-200 font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 border border-gray-200">
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4 text-lg">Product not found</p>
            <Link
              to="/products"
              className="px-6 py-3 bg-gradient-to-r from-sky-blue-500 to-indigo-600 text-white rounded-lg hover:from-sky-blue-600 hover:to-indigo-700 shadow-md transition duration-200 font-medium"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            to="/products"
            className="text-sky-blue-600 hover:text-sky-blue-800 flex items-center text-lg font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Products
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <img
                src={product.image || '/produk/vitaminC.jpeg'}
                alt={product.name}
                className="max-h-96 object-contain"
              />
            </div>

            <div className="md:w-1/2 p-8">
              <div className="flex justify-between items-start mb-3">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <span className="bg-gradient-to-r from-sky-blue-500 to-indigo-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl transition-transform duration-200 hover:scale-125 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-2 text-lg text-gray-600">({product.rating})</span>
              </div>

              <div className="text-4xl font-bold text-sky-blue-700 mb-6">${product.price.toFixed(2)}</div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Availability</h3>
                  <p className={`text-base font-medium ${
                    product.stock > 10 ? 'text-green-600' :
                    product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">SKU</h3>
                  <p className="text-base text-gray-600 font-medium">#{product.id}</p>
                </div>
              </div>

              {/* Quantity selector and add to cart */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-l-lg font-bold text-lg hover:bg-gray-300 disabled:opacity-50 transition duration-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                    className="w-16 text-center py-2 border-y border-gray-200 text-lg font-bold"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-lg font-bold text-lg hover:bg-gray-300 disabled:opacity-50 transition duration-200"
                  >
                    +
                  </button>
                </div>
                {product.stock > 0 && (
                  <p className="text-sm text-gray-600 mt-2">Max quantity: {product.stock}</p>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className={`flex-1 ${
                    product.stock > 0
                      ? 'bg-gradient-to-r from-sky-blue-500 to-indigo-600 hover:from-sky-blue-600 hover:to-indigo-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl active:scale-95 shadow-md`}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button className="px-6 py-4 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Admin controls - only visible to admin users */}
              {isAdmin && (
                <div className="mt-6 flex space-x-3">
                  <Link
                    to={`/edit-product/${product.id}`}
                    className="flex-1 text-center bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-lg text-sm font-bold transition-all duration-200"
                  >
                    Edit Product
                  </Link>
                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete the product "${product.name}"? This action cannot be undone.`)) {
                        // In a real app, call the delete API here
                        navigate('/products');
                      }
                    }}
                    className="flex-1 text-center bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg text-sm font-bold transition-all duration-200"
                  >
                    Delete Product
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;