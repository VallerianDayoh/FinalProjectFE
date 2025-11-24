import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';
import { createService, getServiceById, updateService } from '../services/api';

const ServiceForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        icon: 'Search'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            loadService();
        }
    }, [id]);

    const loadService = async () => {
        try {
            const data = await getServiceById(id);
            setFormData(data);
        } catch (err) {
            setError('Failed to load service details.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isEditMode) {
                await updateService(id, formData);
            } else {
                await createService(formData);
            }
            navigate('/admin');
        } catch (err) {
            setError('Failed to save service. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <button
                    onClick={() => navigate('/admin')}
                    className="flex items-center text-gray-600 hover:text-indigo-600 mb-8 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
                </button>

                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">
                        {isEditMode ? 'Edit Service' : 'Add New Service'}
                    </h1>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Service Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. SEO Optimization"
                            required
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="Describe the service..."
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="e.g. $500/mo"
                                required
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Icon Name (Lucide React)
                                </label>
                                <select
                                    name="icon"
                                    value={formData.icon}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                                >
                                    <option value="Search">Search (SEO)</option>
                                    <option value="Share2">Share2 (Social)</option>
                                    <option value="PenTool">PenTool (Content)</option>
                                    <option value="Code">Code (Dev)</option>
                                    <option value="Smartphone">Smartphone (Mobile)</option>
                                    <option value="BarChart">BarChart (Analytics)</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex justify-end">
                            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                                {loading ? 'Saving...' : (
                                    <span className="flex items-center justify-center gap-2">
                                        <Save size={18} /> Save Service
                                    </span>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ServiceForm;
