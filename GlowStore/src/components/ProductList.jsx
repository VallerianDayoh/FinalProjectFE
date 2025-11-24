import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { getProducts, deleteProduct } from '../services/api';

const ProductList = ({ refreshTrigger }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isAdmin, setIsAdmin] = useState(false); // In a real app, this would come from user authentication

  useEffect(() => {
    fetchProducts();
    // In a real application, you would check user authentication status to determine admin role
    // For now, we'll set this to false to simulate regular user experience
    setIsAdmin(false);
  }, [refreshTrigger]); // Added refreshTrigger to dependency array

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete.id);
      setProducts(products.filter(product => product.id !== productToDelete.id));
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'stock') {
      return b.stock - a.stock;
    }
    return 0;
  });

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchProducts}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-sky-blue-500 to-indigo-600 text-white rounded-lg hover:from-sky-blue-600 hover:to-indigo-700 shadow-md transition duration-200 font-medium"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-sky-blue-800">Our Products</h2>
          <p className="text-gray-600">Discover premium skincare products for healthy, glowing skin</p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-blue-500 focus:border-transparent shadow-sm"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>

          <div className="flex space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-blue-500 focus:border-transparent shadow-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-blue-500 focus:border-transparent shadow-sm"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="stock">Most Available</option>
            </select>
          </div>
        </div>
      </div>

      {/* View Toggle and Add Product */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">View:</span>
          <div className="flex border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('card')}
              className={`px-4 py-2 text-sm font-medium ${
                viewMode === 'card'
                  ? 'bg-gradient-to-r from-sky-blue-500 to-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 text-sm font-medium ${
                viewMode === 'table'
                  ? 'bg-gradient-to-r from-sky-blue-500 to-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              List
            </button>
          </div>
        </div>

        <Link
          to="/add-product"
          className="bg-gradient-to-r from-sky-blue-500 to-indigo-600 hover:from-sky-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200"
        >
          Add Product
        </Link>
      </div>

      {/* Products Display */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg p-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
          <Link
            to="/add-product"
            className="inline-block px-6 py-3 bg-gradient-to-r from-sky-blue-500 to-indigo-600 text-white rounded-lg hover:from-sky-blue-600 hover:to-indigo-700 shadow-md transition duration-200 font-medium"
          >
            Add Your First Product
          </Link>
        </div>
      ) : viewMode === 'card' ? (
        // Card view
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={(product) => {
                navigate(`/edit-product/${product.id}`);
              }}
              onDelete={openDeleteModal}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      ) : (
        // Table view
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-sky-blue-500 to-indigo-600 text-white">
              <tr>
                <th className="py-4 px-6 text-left">Product</th>
                <th className="py-4 px-6 text-left">Description</th>
                <th className="py-4 px-6 text-left">Price</th>
                <th className="py-4 px-6 text-left">Category</th>
                <th className="py-4 px-6 text-left">Rating</th>
                <th className="py-4 px-6 text-left">Stock</th>
                <th className="py-4 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50 transition duration-200">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-contain mr-4"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 max-w-xs">{product.description.substring(0, 50)}...</td>
                  <td className="py-4 px-6 font-bold text-sky-blue-700">${product.price.toFixed(2)}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-gradient-to-r from-sky-blue-100 to-indigo-100 text-sky-blue-800 text-xs font-semibold rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1 text-lg">★</span>
                      {product.rating}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.stock > 10 ? 'bg-green-100 text-green-800' :
                      product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <Link
                        to={`/product/${product.id}`}
                        className="px-3 py-2 bg-gradient-to-r from-sky-blue-500 to-indigo-600 text-white rounded hover:from-sky-blue-600 hover:to-indigo-700 text-sm transition duration-200"
                      >
                        View
                      </Link>
                      {isAdmin && (
                        <>
                          <Link
                            to={`/edit-product/${product.id}`}
                            className="px-3 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 text-sm transition duration-200"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => openDeleteModal(product)}
                            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm transition duration-200"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setProductToDelete(null);
        }}
        onConfirm={handleDelete}
        productName={productToDelete?.name}
      />
    </div>
  );
};

export default ProductList;