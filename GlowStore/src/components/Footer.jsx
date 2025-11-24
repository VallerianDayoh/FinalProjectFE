import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-sky-blue-700 mb-4">GlowStore</h3>
            <p className="text-gray-600 text-sm">
              Your trusted destination for premium skincare products. Quality skincare for healthy, glowing skin.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-sky-blue-700 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/products" className="text-gray-600 hover:text-pink-500 text-sm">Products</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-pink-500 text-sm">About Us</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-pink-500 text-sm">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-sky-blue-700 mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-pink-500 text-sm">Serums</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 text-sm">Moisturizers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 text-sm">Cleansers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 text-sm">Sunscreen</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-sky-blue-700 mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>Email: info@glowstore.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Beauty Street</li>
              <li>City: Skincity, SC 12345</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © 2025 GlowStore - Premium Skincare Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;