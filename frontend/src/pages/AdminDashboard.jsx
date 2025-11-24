import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { getServices, deleteService } from '../services/api';

const AdminDashboard = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        try {
            const data = await getServices();
            setServices(data);
        } catch (err) {
            setError('Failed to load services.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await deleteService(id);
                setServices(services.filter(s => s.id !== id));
            } catch (err) {
                alert('Failed to delete service.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
                        <p className="text-gray-600 mt-2">Manage your agency's service offerings</p>
                    </div>
                    <Link to="/admin/add">
                        <Button className="flex items-center gap-2">
                            <Plus size={20} /> Add New Service
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-900">Service Name</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-900">Description</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-900">Price</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center text-gray-500">Loading...</td>
                                    </tr>
                                ) : services.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center text-gray-500">No services found.</td>
                                    </tr>
                                ) : (
                                    services.map((service) => (
                                        <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{service.title}</td>
                                            <td className="px-6 py-4 text-gray-600 max-w-md truncate">{service.description}</td>
                                            <td className="px-6 py-4 text-gray-900 font-medium">{service.price}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <Link to={`/admin/edit/${service.id}`}>
                                                        <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                                            <Edit2 size={18} />
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(service.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
