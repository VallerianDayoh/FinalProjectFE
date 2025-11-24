import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { items, totalPrice, totalItems, updateQuantity, removeFromCart } = useCart();

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    updateQuantity(productId, parseInt(newQuantity));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-sky-800">Shopping Cart</h1>
              <p className="text-gray-600 mt-1">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
            </div>
            <Link
              to="/products"
              className="text-sky-blue-600 hover:text-sky-blue-800 flex items-center text-lg font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet</p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-gradient-to-r from-sky-blue-500 to-indigo-600 text-white rounded-lg hover:from-sky-blue-600 hover:to-indigo-700 font-medium shadow-md transition duration-200"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.productId || item.id} className="flex items-center border-b border-gray-200 pb-6 last:border-0">
                    <img
                      src={item.image || item.img || item.picture}
                      alt={item.name || item.title}
                      className="w-24 h-24 object-contain bg-gray-100 rounded-lg"
                    />
                    <div className="ml-6 flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{item.name || item.title}</h3>
                      <p className="text-sky-blue-700 font-semibold mt-1">${item.price ? item.price.toFixed(2) : '0.00'}</p>

                      <div className="flex items-center mt-3">
                        <span className="mr-3 text-gray-700 font-medium">Qty:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                          <button
                            onClick={() => handleQuantityChange(item.productId || item.id, item.quantity - 1)}
                            className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 font-bold"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-4 py-1 font-medium bg-white">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.productId || item.id, item.quantity + 1)}
                            className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900">${item.price ? (item.price * item.quantity).toFixed(2) : '0.00'}</p>
                      <button
                        onClick={() => handleRemoveItem(item.productId || item.id)}
                        className="mt-2 text-red-500 hover:text-red-700 text-sm font-medium flex items-center justify-end w-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1 bg-gradient-to-b from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-sky-blue-800 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-sky-blue-700">${(totalPrice * 1.1).toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-sky-blue-500 to-indigo-600 hover:from-sky-blue-600 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium shadow-md transition duration-200">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;