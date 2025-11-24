import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Home } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">E</span>
                        </div>
                        <span className="font-bold text-xl text-gray-900">Elevate Digital</span>
                    </Link>

                    <div className="flex gap-4">
                        <Link
                            to="/"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${!isAdmin ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
                        >
                            <Home size={18} />
                            <span className="hidden sm:inline">Home</span>
                        </Link>
                        <Link
                            to="/admin"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isAdmin ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
                        >
                            <LayoutDashboard size={18} />
                            <span className="hidden sm:inline">Dashboard</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
