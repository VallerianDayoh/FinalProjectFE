import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="container">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-[var(--color-primary)]">
                        <Sparkles className="w-6 h-6" />
                        Glowcare Store
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="relative group text-gray-700 hover:text-[var(--color-primary)] transition-colors font-medium">
                            Home
                            <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link to="/products" className="relative group text-gray-700 hover:text-[var(--color-primary)] transition-colors font-medium">
                            Products
                            <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>

                    {/* Right side icons */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Cart */}
                        <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ShoppingCart className="w-6 h-6 text-gray-700" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* User Menu */}
                        {isAuthenticated ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <User className="w-6 h-6 text-gray-700" />
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="btn btn-primary">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t animate-slide-up">
                        <div className="flex flex-col gap-4">
                            <Link
                                to="/"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-gray-700 hover:text-[var(--color-primary)] transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                to="/products"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-gray-700 hover:text-[var(--color-primary)] transition-colors"
                            >
                                Products
                            </Link>
                            <Link
                                to="/cart"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-2 text-gray-700 hover:text-[var(--color-primary)] transition-colors"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Cart {cartCount > 0 && `(${cartCount})`}
                            </Link>
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/profile"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-gray-700 hover:text-[var(--color-primary)] transition-colors"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="text-left text-gray-700 hover:text-[var(--color-primary)] transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="btn btn-primary">
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
