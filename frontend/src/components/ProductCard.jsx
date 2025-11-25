import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product, 1);
        // Optional: Show toast notification
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <Link to={`/products/${product.id}`} className="product-card flex flex-col h-full">
            <div className="relative overflow-hidden aspect-[4/3]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                    <span className="badge badge-primary">{product.category}</span>
                </div>
            </div>

            <div className="card-body flex flex-col flex-grow">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1" title={product.name}>{product.name}</h3>

                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{product.stock} in stock</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="text-xl font-bold text-[var(--color-primary)]">
                        {formatPrice(product.price)}
                    </span>

                    <button
                        onClick={handleAddToCart}
                        className="btn btn-primary px-4 py-2 text-sm"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
