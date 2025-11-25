import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Heart, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    axios.get(`${API_URL}/products?_limit=4`),
                    axios.get(`${API_URL}/categories`)
                ]);
                setFeaturedProducts(productsRes.data);
                setCategories(categoriesRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
                {/* Background with overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-peach)] to-[var(--color-secondary)] opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                <div className="container relative z-10 text-center px-4">
                    <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
                        <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-accent)] text-sm font-medium tracking-wider backdrop-blur-sm mb-4 border border-[var(--color-primary)]/20">
                            PREMIUM KOREAN SKINCARE
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-tight">
                            Discover Your Perfect
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-pink-400">
                                Skincare Routine
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
                            Experience the magic of authentic Korean beauty. Curated products for healthy, glowing, and radiant skin.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link to="/products" className="btn btn-primary px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                                Shop Collection
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link to="/about" className="btn bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-white relative z-10 -mt-10 mx-4 md:mx-12 rounded-3xl shadow-xl">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        <div className="text-center space-y-4 px-4 animate-slide-up group">
                            <div className="flex justify-center">
                                <div className="p-5 bg-pink-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <Shield className="w-10 h-10 text-[var(--color-primary)]" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">100% Authentic</h3>
                            <p className="text-gray-500 leading-relaxed">Guaranteed original products sourced directly from official distributors</p>
                        </div>

                        <div className="text-center space-y-4 px-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
                            <div className="flex justify-center">
                                <div className="p-5 bg-green-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <Truck className="w-10 h-10 text-green-600" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Fast Shipping</h3>
                            <p className="text-gray-500 leading-relaxed">Free express shipping for all orders above Rp 200.000</p>
                        </div>

                        <div className="text-center space-y-4 px-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
                            <div className="flex justify-center">
                                <div className="p-5 bg-purple-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <Heart className="w-10 h-10 text-purple-600" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Curated with Love</h3>
                            <p className="text-gray-500 leading-relaxed">Carefully selected products ensuring the best for your skin health</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="section">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
                        <div className="h-1 w-20 bg-[var(--color-primary)] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <Link
                                key={category.id}
                                to={`/products?category=${category.name}`}
                                className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 aspect-[4/3]"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                                    <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-[var(--color-primary)] transition-colors">{category.name}</h3>
                                    <p className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        {category.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="section bg-white/50 backdrop-blur-sm">
                <div className="container">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Featured Products</h2>
                            <p className="text-gray-500">Best sellers chosen by our community</p>
                        </div>
                        <Link to="/products" className="btn btn-outline px-8 group">
                            View All Products
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product, index) => (
                            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container text-center relative z-10">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold">Start Your Glow Journey Today</h2>
                        <p className="text-xl text-white/90 font-light">
                            Join thousands of happy customers who have transformed their skin with our premium products.
                        </p>
                        <Link to="/products" className="btn bg-white text-[var(--color-primary)] hover:bg-gray-50 px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 inline-flex items-center gap-2">
                            Explore Collection
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
