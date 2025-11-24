import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Elevate Digital</h3>
                        <p className="text-gray-400">Transforming businesses through digital innovation.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Contact</h4>
                        <p className="text-gray-400">hello@elevatedigital.com</p>
                        <p className="text-gray-400">+1 (555) 123-4567</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Address</h4>
                        <p className="text-gray-400">123 Innovation Drive</p>
                        <p className="text-gray-400">Tech City, TC 90210</p>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
                    © 2024 Elevate Digital. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
