import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('product')
        .select('*, category(categoryname)')
        .eq('productid', id)
        .single();
      if (data) setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setToast(`Added ${quantity} × ${product.productname} to cart!`);
    setTimeout(() => setToast(''), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;
  if (!product) return <div className="text-center py-20 text-gray-500">Product not found.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {toast && (
        <div className="fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50">
          ✅ {toast}
        </div>
      )}

      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-500 mb-6 hover:text-png-red"
      >
        ← Back to Shop
      </button>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Images */}
        <div className="w-full md:w-1/2">
          <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
            {product.imageurl ? (
              <img
                src={product.imageurl}
                alt={product.productname}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-20 bg-gray-200 rounded flex items-center justify-center overflow-hidden cursor-pointer hover:border-2 hover:border-png-red"
              >
                {product.imageurl && (
                  <img
                    src={product.imageurl}
                    alt="Thumbnail"
                    className="w-full h-full object-cover opacity-70 hover:opacity-100"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2 space-y-4">
          <span className="text-xs uppercase tracking-wider text-png-red font-semibold">
            {product.category?.categoryname || 'General'}
          </span>
          <h1 className="text-3xl font-bold text-gray-900">{product.productname}</h1>
          <p className="text-3xl font-bold text-gray-900">
            K{parseFloat(product.price).toFixed(2)}
          </p>

          <div className="flex items-center text-yellow-500 text-sm">
            <span>★★★★☆</span>
            <span className="ml-2 text-gray-500">(25 Reviews)</span>
          </div>

          <p className="text-gray-600 leading-relaxed border-t border-b border-gray-100 py-4">
            {product.description || 'No description available.'}
          </p>

          <div className="flex items-center space-x-4 pt-2">
            <span className="text-gray-700 font-medium">Quantity:</span>
            <div className="flex border border-gray-300 rounded">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100"
              >
                −
              </button>
              <span className="px-5 py-2 border-l border-r border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-png-black text-white px-8 py-3 rounded font-semibold hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-png-red text-white px-8 py-3 rounded font-semibold hover:bg-red-700 transition"
            >
              Buy Now
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-600 space-y-2 pt-4 border-t border-gray-100">
            <p>
              Category:{' '}
              <span className="font-medium text-gray-800">
                {product.category?.categoryname || 'General'}
              </span>
            </p>
            <p>
              Availability:{' '}
              <span className="text-green-600 font-medium">
                In Stock ({product.stockquantity || 0})
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}