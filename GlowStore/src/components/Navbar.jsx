import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav className="bg-gradient-to-r from-sky-blue-600 to-indigo-700 shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src="/produk/logo.png"
                alt="Beauty Glow Logo"
                className="h-10 w-10 object-contain mr-3"
              />
              <span className="text-2xl font-bold text-pink-300">Beauty Glow</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition duration-200 border-b-2 border-transparent hover:border-gray-800"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition duration-200 border-b-2 border-transparent hover:border-gray-800"
            >
              Products
            </Link>

            <Link
              to="/about"
              className="text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition duration-200 border-b-2 border-transparent hover:border-gray-800"
            >
              About
            </Link>

            <Link
              to="/add-product"
              className="bg-white text-sky-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition duration-200 shadow-md hover:shadow-lg"
            >
              Add Product
            </Link>

            <Link
              to="/admin"
              className="bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-600 hover:to-violet-700 px-4 py-2 rounded-md text-sm font-medium transition duration-200 shadow-md hover:shadow-lg"
            >
              Admin
            </Link>

            {/* Cart icon */}
            <div className="relative">
              <Link to="/cart" className="text-white hover:text-sky-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8" />
                </svg>
              </Link>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-sky-blue-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-r from-sky-blue-600 to-indigo-700">
          <Link
            to="/"
            className="text-gray-800 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium border-b border-gray-300"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-gray-800 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium border-b border-gray-300"
          >
            Products
          </Link>

          <Link
            to="/about"
            className="text-gray-800 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium border-b border-gray-300"
          >
            About
          </Link>

          <Link
            to="/add-product"
            className="bg-white text-sky-blue-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium shadow-md"
          >
            Add Product
          </Link>

          <Link
            to="/admin"
            className="bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-600 hover:to-violet-700 block px-3 py-2 rounded-md text-base font-medium shadow-md"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;