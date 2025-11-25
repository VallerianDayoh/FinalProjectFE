import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [productsRes, categoriesRes] = await Promise.all([
                    axios.get(`${API_URL}/products`),
                    axios.get(`${API_URL}/categories`)
                ]);
                setProducts(productsRes.data);
                setCategories([{ id: 0, name: 'All' }, ...categoriesRes.data]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter products
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category !== 'All') {
            setSearchParams({ category });
        } else {
            setSearchParams({});
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="section min-h-screen">
            <div className="container">
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Products</h1>
                    <p className="text-gray-600 text-lg">Discover the perfect skincare products for your routine. Curated for your skin's health and glow.</p>
                </div>

                {/* Search and Filter */}
                <div className="mb-12 space-y-6">
                    {/* Search Bar */}
                    <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input pl-12 shadow-sm hover:shadow-md transition-shadow"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2 mr-2 text-gray-500 font-medium">
                            <Filter className="w-5 h-5" />
                            <span>Filters:</span>
                        </div>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryChange(category.name)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category.name
                                    ? 'bg-[var(--color-primary)] text-white shadow-md transform scale-105'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <>
                        <p className="text-gray-600 mb-6">{filteredProducts.length} products found</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">No products found matching your criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
