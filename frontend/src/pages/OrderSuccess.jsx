import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Home } from 'lucide-react';
import { useEffect } from 'react';

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order;

    useEffect(() => {
        if (!order) {
            navigate('/');
        }
    }, [order, navigate]);

    if (!order) {
        return null;
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="section">
            <div className="container max-w-2xl">
                <div className="card animate-scale-in">
                    <div className="card-body text-center space-y-6">
                        {/* Success Icon */}
                        <div className="flex justify-center">
                            <div className="p-4 bg-green-100 rounded-full">
                                <CheckCircle className="w-16 h-16 text-green-600" />
                            </div>
                        </div>

                        {/* Success Message */}
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
                            <p className="text-gray-600">Thank you for shopping with Glowcare Store</p>
                        </div>

                        {/* Order Details */}
                        <div className="bg-gray-50 rounded-xl p-6 text-left space-y-4">
                            <div className="flex items-center gap-2 text-[var(--color-primary)]">
                                <Package className="w-5 h-5" />
                                <span className="font-semibold">Order ID: {order.id}</span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Items</span>
                                    <span className="font-semibold">{order.items.length} items</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Amount</span>
                                    <span className="font-bold text-[var(--color-primary)]">
                                        {formatPrice(order.total)}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <p className="text-sm text-gray-600 mb-1">Shipping to:</p>
                                <p className="font-medium">{order.shipping.name}</p>
                                <p className="text-sm text-gray-600">{order.shipping.address}</p>
                                <p className="text-sm text-gray-600">
                                    {order.shipping.city}, {order.shipping.postalCode}
                                </p>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="border-t pt-4 text-left">
                            <h3 className="font-semibold mb-3">Order Items:</h3>
                            <div className="space-y-2">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-gray-600">
                                            {item.name} <span className="text-gray-400">x{item.quantity}</span>
                                        </span>
                                        <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <Link to="/" className="btn btn-primary flex-1">
                                <Home className="w-5 h-5" />
                                Back to Home
                            </Link>
                            <Link to="/products" className="btn btn-secondary flex-1">
                                Continue Shopping
                            </Link>
                        </div>

                        <p className="text-sm text-gray-500">
                            A confirmation email has been sent to {order.shipping.email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
