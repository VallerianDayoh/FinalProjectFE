import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import Button from '../components/Button';
import { getServices } from '../services/api';

const Home = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getServices();
                setServices(data);
            } catch (err) {
                setError('Failed to load services. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-indigo-900 text-white py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/50 to-indigo-900"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                        Grow Your Business with <span className="text-indigo-400">Elevate</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
                        We combine data-driven strategies with cutting-edge design to deliver exceptional results for your brand.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="text-lg px-8 py-4 bg-white text-indigo-900 hover:bg-gray-100">
                            Get Started
                        </Button>
                        <Button variant="secondary" className="text-lg px-8 py-4 bg-transparent border-white text-white hover:bg-white/10">
                            View Our Work
                        </Button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Comprehensive digital solutions tailored to your unique business needs.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                )}
            </section>

            {/* CTA Section */}
            <section className="bg-indigo-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Ready to Transform Your Digital Presence?</h2>
                    <Button className="text-lg px-8 py-4 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                        Schedule a Consultation <ArrowRight className="inline ml-2" size={20} />
                    </Button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
