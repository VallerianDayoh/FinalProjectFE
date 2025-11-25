import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../services/api';

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    outOfStock: 0,
    lowStock: 0
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentProducts, setRecentProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Function to filter products based on search and category
  useEffect(() => {
    let result = products;

    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  const fetchDashboardData = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);

      // Calculate statistics
      const totalProducts = productsData.length;
      const categories = [...new Set(productsData.map(p => p.category))];
      const outOfStock = productsData.filter(p => p.stock === 0).length;
      const lowStock = productsData.filter(p => p.stock > 0 && p.stock <= 5).length;

      setStats({
        totalProducts,
        totalCategories: categories.length,
        outOfStock,
        lowStock
      });

      // Get 5 most recent products (assuming the IDs are sequential)
      const sortedProducts = [...productsData].sort((a, b) => parseInt(b.id) - parseInt(a.id));
      setRecentProducts(sortedProducts.slice(0, 5));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      try {
        // Optimistically remove the product from the UI
        setProducts(products.filter(product => product.id !== id));

        // Update statistics immediately
        setStats(prevStats => ({
          ...prevStats,
          totalProducts: prevStats.totalProducts - 1,
          outOfStock: products.find(p => p.id === id && p.stock === 0) ? prevStats.outOfStock - 1 : prevStats.outOfStock,
          lowStock: products.find(p => p.id === id && p.stock > 0 && p.stock <= 5) ? prevStats.lowStock - 1 : prevStats.lowStock
        }));

        // Update recent products if the deleted product was in the recent list
        setRecentProducts(prev => prev.filter(product => product.id !== id));

        // Actually delete from the server
        await deleteProduct(id);

        // Show success message with toast or notification
        alert(`Product "${name}" deleted successfully!`);
      } catch (error) {
        console.error('Error deleting product:', error);
        // If the delete failed, revert the optimistic update
        alert('Failed to delete product. Please try again.');
        fetchDashboardData(); // Refresh data to restore the deleted product
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-blue-500 mx-auto mt-20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-sky-blue-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your products and store operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-sky-blue-100 to-indigo-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-600">Total Products</h3>
                <p className="text-3xl font-bold text-sky-blue-700">{stats.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-600">Categories</h3>
                <p className="text-3xl font-bold text-emerald-700">{stats.totalCategories}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-600">Low Stock</h3>
                <p className="text-3xl font-bold text-amber-700">{stats.lowStock}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-red-100 to-rose-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-600">Out of Stock</h3>
                <p className="text-3xl font-bold text-red-700">{stats.outOfStock}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Products */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-sky-blue-800">Recent Products</h2>
              <Link
                to="/products"
                className="text-sm bg-gradient-to-r from-sky-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-sky-blue-600 hover:to-indigo-700 transition duration-200"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
                  <div className="flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-contain mr-4 bg-gray-100 p-1 rounded"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sky-blue-700">${product.price.toFixed(2)}</p>
                    <p className={`text-xs ${
                      product.stock === 0 ? 'text-red-600' :
                      product.stock <= 5 ? 'text-amber-600' : 'text-green-600'
                    }`}>
                      {product.stock} in stock
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-sky-blue-800 mb-6">Quick Actions</h2>

            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/add-product"
                className="bg-gradient-to-r from-sky-blue-500 to-indigo-600 text-white p-6 rounded-lg text-center hover:from-sky-blue-600 hover:to-indigo-700 transition duration-200 shadow-md"
              >
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="font-semibold">Add Product</span>
                </div>
              </Link>

              <Link
                to="/products"
                className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-6 rounded-lg text-center hover:from-emerald-600 hover:to-green-700 transition duration-200 shadow-md"
              >
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <span className="font-semibold">Manage Products</span>
                </div>
              </Link>

              <Link
                to="/products"
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 rounded-lg text-center hover:from-amber-600 hover:to-orange-700 transition duration-200 shadow-md"
              >
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="font-semibold">View Inventory</span>
                </div>
              </Link>

              <Link
                to="/products"
                className="bg-gradient-to-r from-purple-500 to-violet-600 text-white p-6 rounded-lg text-center hover:from-purple-600 hover:to-violet-700 transition duration-200 shadow-md"
              >
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-semibold">Reports</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Manage Products Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <h2 className="text-xl font-bold text-sky-blue-800">Manage Products</h2>
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

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-blue-500 focus:border-transparent shadow-sm"
              >
                <option value="all">All Categories</option>
                {[...new Set(products.map(p => p.category))].map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <button
                onClick={() => navigate('/add-product')}
                className="bg-gradient-to-r from-sky-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-sky-blue-600 hover:to-indigo-700 transition duration-200 whitespace-nowrap"
              >
                Add New Product
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-sky-blue-500 to-indigo-600 text-white">
                  <th className="py-3 px-4 text-left">Product</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Stock</th>
                  <th className="py-3 px-4 text-left">Rating</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.slice(0, 10).map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50 transition duration-200">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-contain mr-3 bg-gray-100 p-1 rounded"
                        />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-gradient-to-r from-sky-blue-100 to-indigo-100 text-sky-blue-800 text-xs font-medium rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-sky-blue-700">${product.price.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock === 0 ? 'bg-red-100 text-red-800' :
                        product.stock <= 5 ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {product.stock} {product.stock === 0 ? 'Out' : 'Left'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        {product.rating}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Link
                          to={`/edit-product/${product.id}`}
                          className="text-blue-600 hover:text-blue-800 transition duration-200"
                        >
                          Edit
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-800 transition duration-200"
                          onClick={() => handleDelete(product.id, product.name)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 bg-gradient-to-r from-sky-blue-500 to-indigo-600 text-white rounded-lg hover:from-sky-blue-600 hover:to-indigo-700 shadow-md transition duration-200 font-medium"
              >
                Reset Filters
              </button>
            </div>
          )}

          <div className="mt-4 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {filteredProducts.length > 10 ? 10 : filteredProducts.length} of {filteredProducts.length} products
            </p>
            <Link
              to="/products"
              className="text-sky-blue-600 hover:text-sky-blue-800 font-medium"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;