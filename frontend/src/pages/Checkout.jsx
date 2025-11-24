import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, Mail, Phone, User as UserIcon } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const MIDTRANS_CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-YOUR-KEY';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
    });

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const shippingCost = cartTotal >= 200000 ? 0 : 15000;
    const total = cartTotal + shippingCost;

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Create order object
        const order = {
            id: `ORDER-${Date.now()}`,
            user: user,
            items: cart,
            shipping: formData,
            subtotal: cartTotal,
            shippingCost: shippingCost,
            total: total,
            createdAt: new Date().toISOString(),
        };

        try {
            // For development: Simulate successful payment
            // In production, you would call your backend API to create Midtrans transaction
            console.log('Simulating successful payment for development...');
            console.log('Order:', order);

            // Show alert to simulate payment
            const confirmPayment = window.confirm(
                `🛒 Order Summary:\n\n` +
                `Items: ${cart.length} products\n` +
                `Total: Rp ${total.toLocaleString('id-ID')}\n\n` +
                `Proceed with payment simulation?`
            );

            if (confirmPayment) {
                // Simulate payment processing delay
                setTimeout(() => {
                    clearCart();
                    navigate('/order-success', { state: { order } });
                }, 1500);
            } else {
                setLoading(false);
            }

            /* 
            ========================================
            PRODUCTION CODE (Enable when backend ready):
            ========================================
            
            // 1. Call your backend API to create Midtrans transaction
            const response = await axios.post('/api/payment/create-transaction', {
                order_id: order.id,
                amount: order.total,
                customer_details: {
                    first_name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                }
            });
            
            // 2. Get snap token from backend
            const snapToken = response.data.token;
            
            // 3. Open Midtrans Snap popup
            if (window.snap) {
                window.snap.pay(snapToken, {
                    onSuccess: function (result) {
                        console.log('Payment success:', result);
                        clearCart();
                        navigate('/order-success', { state: { order } });
                    },
                    onPending: function (result) {
                        console.log('Payment pending:', result);
                        alert('Payment is pending. Please complete your payment.');
                        setLoading(false);
                    },
                    onError: function (result) {
                        console.log('Payment error:', result);
                        alert('Payment failed. Please try again.');
                        setLoading(false);
                    },
                    onClose: function () {
                        console.log('Payment popup closed');
                        setLoading(false);
                    },
                });
            }
            */

        } catch (error) {
            console.error('Payment error:', error);
            alert('An error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="section">
            <div className="container">
                <h1 className="text-4xl font-bold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handlePayment} className="space-y-6">
                            {/* Contact Information */}
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                        <UserIcon className="w-6 h-6 text-[var(--color-primary)]" />
                                        Contact Information
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="input-group">
                                            <label className="label">Full Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="input"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div className="input-group">
                                            <label className="label">Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="input"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div className="input-group md:col-span-2">
                                            <label className="label">Phone Number *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                className="input"
                                                placeholder="08123456789"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                        <MapPin className="w-6 h-6 text-[var(--color-primary)]" />
                                        Shipping Address
                                    </h2>

                                    <div className="space-y-4">
                                        <div className="input-group">
                                            <label className="label">Address *</label>
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                required
                                                rows="3"
                                                className="input resize-none"
                                                placeholder="Street address, apartment, suite, etc."
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="input-group">
                                                <label className="label">City *</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="input"
                                                    placeholder="Jakarta"
                                                />
                                            </div>

                                            <div className="input-group">
                                                <label className="label">Postal Code *</label>
                                                <input
                                                    type="text"
                                                    name="postalCode"
                                                    value={formData.postalCode}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="input"
                                                    placeholder="12345"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary w-full text-lg"
                            >
                                {loading ? (
                                    <div className="spinner"></div>
                                ) : (
                                    <>
                                        <CreditCard className="w-5 h-5" />
                                        Proceed to Payment
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="card sticky top-24">
                            <div className="card-body space-y-4">
                                <h3 className="text-xl font-bold">Order Summary</h3>

                                {/* Cart Items */}
                                <div className="space-y-3 max-h-64 overflow-y-auto border-t pt-4">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-3">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="flex-grow">
                                                <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                <p className="text-sm text-[var(--color-primary)] font-semibold">
                                                    {formatPrice(item.price * item.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Breakdown */}
                                <div className="space-y-2 border-t pt-4">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(cartTotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-[var(--color-primary)]">{formatPrice(total)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
