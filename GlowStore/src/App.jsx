import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import About from './components/About';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import PaymentSuccessPage from './components/PaymentSuccessPage';
import PaymentCancelPage from './components/PaymentCancelPage';
import AdminPage from './components/AdminPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                  {/* Hero Section */}
                  <div className="bg-gradient-to-r from-sky-blue-500 to-indigo-600 rounded-2xl p-8 md:p-12 mb-8 text-center text-white shadow-xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Beauty Glow</h1>
                    <p className="text-xl mb-6 max-w-2xl mx-auto">Premium Skincare Products Marketplace</p>
                    <p className="text-sky-blue-100 max-w-3xl mx-auto mb-8">Discover and shop the best skincare products for healthy, glowing skin. Quality ingredients, proven results.</p>
                    <a
                      href="#products"
                      className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
                    >
                      Shop Now
                    </a>
                  </div>

                  {/* Featured Products Section */}
                  <div id="products" className="mb-8">
                    <h2 className="text-3xl font-bold text-sky-blue-800 mb-6 text-center">Featured Products</h2>
                    <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
                      <div className="p-6">
                        <ProductList refreshTrigger={0} />
                      </div>
                    </div>
                  </div>
                </div>
              } />

              <Route path="/products" element={
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                  <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
                    <div className="p-6">
                      <ProductList refreshTrigger={0} />
                    </div>
                  </div>
                </div>
              } />

              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/add-product" element={<AddProductForm />} />
              <Route path="/edit-product/:id" element={<EditProductForm />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              <Route path="/payment-cancel" element={<PaymentCancelPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
