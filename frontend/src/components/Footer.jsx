import { Link } from 'react-router-dom';
import { Sparkles, Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t mt-auto">
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-[var(--color-primary)]">
                            <Sparkles className="w-5 h-5" />
                            Glowcare Store
                        </Link>
                        <p className="text-gray-600 text-sm">
                            Your trusted destination for premium skincare products. Achieve healthy, glowing skin naturally.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-gray-900">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="text-gray-600 hover:text-[var(--color-primary)] transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-gray-600 hover:text-[var(--color-primary)] transition-colors">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart" className="text-gray-600 hover:text-[var(--color-primary)] transition-colors">
                                    Shopping Cart
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="font-semibold mb-4 text-gray-900">Customer Service</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="text-gray-600">About Us</li>
                            <li className="text-gray-600">Contact</li>
                            <li className="text-gray-600">Shipping Info</li>
                            <li className="text-gray-600">Returns</li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="font-semibold mb-4 text-gray-900">Connect With Us</h4>
                        <div className="flex gap-3">
                            <a href="#" className="p-2 bg-gray-100 hover:bg-[var(--color-primary)] hover:text-white rounded-full transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 hover:bg-[var(--color-primary)] hover:text-white rounded-full transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 hover:bg-[var(--color-primary)] hover:text-white rounded-full transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 hover:bg-[var(--color-primary)] hover:text-white rounded-full transition-colors">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
                    <p>&copy; 2024 Glowcare Store. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
