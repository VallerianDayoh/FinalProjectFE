import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const { isAuthenticated } = useAuth();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleCheckout = () => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            navigate('/checkout');
        }
    };

    if (cart.length === 0) {
        return (
            <div className="section container">
                <div className="max-w-md mx-auto text-center py-16">
                    <div className="mb-6">
                        <ShoppingBag className="w-24 h-24 mx-auto text-gray-300" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-8">Start shopping to add products to your cart</p>
                    <Link to="/products" className="btn btn-primary">
                        Browse Products
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="section">
            <div className="container">
                <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="card">
                                <div className="card-body">
                                    <div className="flex gap-4">
                                        {/* Product Image */}
                                        <Link to={`/products/${item.id}`} className="flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-24 h-24 object-cover rounded-lg"
                                            />
                                        </Link>

                                        {/* Product Info */}
                                        <div className="flex-grow">
                                            <Link to={`/products/${item.id}`}>
                                                <h3 className="font-semibold text-lg mb-1 hover:text-[var(--color-primary)] transition-colors">
                                                    {item.name}
                                                </h3>
                                            </Link>
                                            <p className="text-gray-600 text-sm mb-2">{item.category}</p>
                                            <p className="text-[var(--color-primary)] font-bold text-xl">
                                                {formatPrice(item.price)}
                                            </p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex flex-col items-end justify-between">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="card sticky top-24">
                            <div className="card-body space-y-4">
                                <h3 className="text-xl font-bold">Order Summary</h3>

                                <div className="space-y-2 border-t pt-4">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal ({cart.length} items)</span>
                                        <span>{formatPrice(cartTotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span>{cartTotal >= 200000 ? 'FREE' : formatPrice(15000)}</span>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-[var(--color-primary)]">
                                            {formatPrice(cartTotal + (cartTotal >= 200000 ? 0 : 15000))}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="btn btn-primary w-full"
                                >
                                    Proceed to Checkout
                                    <ArrowRight className="w-5 h-5" />
                                </button>

                                <Link to="/products" className="btn btn-ghost w-full">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
