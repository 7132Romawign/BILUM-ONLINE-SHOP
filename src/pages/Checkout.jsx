import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Papua New Guinea',
    province: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [placing, setPlacing] = useState(false);

  // Demo totals — replace with real cart data later
  const subtotal = 235.0;
  const shipping = 20.0;
  const total = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPlacing(true);
    setTimeout(() => {
      alert('Order placed successfully! (Demo mode — connect to Supabase to enable real orders)');
      setPlacing(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
        {/* Billing Details */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Billing Details</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-png-red"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-png-red"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              required
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-png-red"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              required
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-png-red"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                required
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-png-red"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
              <input
                type="text"
                placeholder="Postal Code"
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-png-red"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              />
            </div>
            <select
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-png-red text-gray-700"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            >
              <option>Papua New Guinea</option>
              <option>Australia</option>
              <option>New Zealand</option>
              <option>Other</option>
            </select>
            <select
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-png-red text-gray-700"
              value={formData.province}
              onChange={(e) => setFormData({ ...formData, province: e.target.value })}
            >
              <option value="">Select Province</option>
              <option>National Capital District (NCD)</option>
              <option>Morobe</option>
              <option>Eastern Highlands</option>
              <option>East Sepik</option>
              <option>Western Highlands</option>
              <option>Madang</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="border border-gray-200 p-6 bg-gray-50 rounded-lg sticky top-24">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-2 text-gray-600 border-b border-gray-200 pb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>K{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>K{shipping.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-900 py-4 border-b border-gray-200">
              <span>Total:</span>
              <span>K{total.toFixed(2)}</span>
            </div>

            <h4 className="font-bold text-gray-800 mt-6 mb-3">Payment Method</h4>
            <div className="space-y-3 text-gray-700 text-sm">
              {['Credit / Debit Card', 'PayPal', 'Cash on Delivery'].map((method) => (
                <label key={method} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 accent-png-red"
                  />
                  {method}
                </label>
              ))}
            </div>

            <button
              type="submit"
              disabled={placing}
              className="w-full bg-png-red text-white py-3 mt-8 rounded font-semibold hover:bg-red-700 transition disabled:opacity-50"
            >
              {placing ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
