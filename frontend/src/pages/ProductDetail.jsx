import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Check, Package } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        // Optional: Show success message
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="section container text-center">
                <p className="text-xl text-gray-600">Product not found</p>
                <Link to="/products" className="btn btn-primary mt-4">Back to Products</Link>
            </div>
        );
    }

    return (
        <div className="section">
            <div className="container">
                {/* Back Button */}
                <Link to="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-[var(--color-primary)] mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Products
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="animate-fade-in">
                        <div className="card overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-[500px] object-cover"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6 animate-slide-up">
                        <div>
                            <span className="badge badge-primary mb-3">{product.category}</span>
                            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-1">
                                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">{product.rating}</span>
                                    <span className="text-gray-500">(120 reviews)</span>
                                </div>
                            </div>

                            <div className="flex items-baseline gap-3 mb-6">
                                <span className="text-4xl font-bold text-[var(--color-primary)]">
                                    {formatPrice(product.price)}
                                </span>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="font-semibold text-lg mb-3">Description</h3>
                            <p className="text-gray-600 leading-relaxed">{product.description}</p>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="font-semibold text-lg mb-3">Key Ingredients</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.ingredients.map((ingredient, index) => (
                                    <span key={index} className="badge badge-secondary">
                                        <Check className="w-3 h-3" />
                                        {ingredient}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <div className="flex items-center gap-2 text-gray-600 mb-4">
                                <Package className="w-5 h-5" />
                                <span>{product.stock} units available in stock</span>
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-4 mb-6">
                                <label className="font-medium">Quantity:</label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center font-semibold">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className="btn btn-primary w-full text-lg"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
