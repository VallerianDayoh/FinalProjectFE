import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onEdit, onDelete, isAdmin = false }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent the click from affecting the Link to details page
    if (product.stock <= 0) {
      alert('This product is out of stock!');
      return;
    }
    addToCart({...product, quantity: 1});
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
      <div className="relative overflow-hidden">
        <img
          src={product.image || '/produk/vitaminC.jpeg'}
          alt={product.name}
          className="w-full h-52 object-contain p-4 bg-gradient-to-b from-gray-50 to-gray-100 transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-gradient-to-r from-sky-blue-500 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {product.category}
        </div>
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg bg-red-500 px-4 py-2 rounded-lg">OUT OF STOCK</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 transition-colors duration-200 hover:text-sky-blue-700">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-12">{product.description}</p>

        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-base transition-transform duration-200 hover:scale-125 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
          <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-sky-blue-700">${product.price.toFixed(2)}</span>
          <span className={`px-3 py-1 text-xs rounded-full ${
            product.stock > 10 ? 'bg-green-100 text-green-800' :
            product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
          }`}>
            {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
          </span>
        </div>

        <div className="flex space-x-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 bg-gradient-to-r from-sky-blue-500 to-indigo-600 hover:from-sky-blue-600 hover:to-indigo-700 text-white py-3 px-4 rounded-lg text-sm font-bold text-center transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`${
              product.stock > 0
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } py-3 px-3 rounded-lg text-sm font-bold transition-all duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95 shadow-md`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          {isAdmin && onEdit && onDelete && (
            <>
              <button
                onClick={() => onEdit(product)}
                className="hidden md:flex bg-pink-500 hover:bg-pink-600 text-white py-3 px-2 rounded-lg text-xs font-medium transition-all duration-200 transform hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="hidden md:flex bg-red-500 hover:bg-red-600 text-white py-3 px-2 rounded-lg text-xs font-medium transition-all duration-200 transform hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;