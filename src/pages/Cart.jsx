import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link to="/shop" className="bg-png-red text-white px-6 py-2 rounded inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="hidden md:grid grid-cols-6 gap-4 p-4 bg-gray-50 font-semibold text-gray-600 text-sm border-b">
              <div className="col-span-3">Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.productid}
                className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border-b border-gray-100 items-center"
              >
                <div className="col-span-3 flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                    {item.imageurl ? (
                      <img
                        src={item.imageurl}
                        alt={item.productname}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                  <span className="text-gray-800 font-medium">{item.productname}</span>
                </div>
                <div className="text-gray-600">K{item.price.toFixed(2)}</div>
                <div className="flex items-center border border-gray-300 rounded w-fit">
                  <button
                    onClick={() => updateQuantity(item.productid, item.quantity - 1)}
                    className="px-3 py-1 bg-gray-50 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-4 py-1 border-l border-r border-gray-300">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.productid, item.quantity + 1)}
                    className="px-3 py-1 bg-gray-50 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">
                    K{(item.price * item.quantity).toFixed(2)}
                  </span>
                  <Trash2
                    onClick={() => removeFromCart(item.productid)}
                    className="text-gray-400 hover:text-png-red cursor-pointer"
                    size={18}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-8 gap-8">
            <Link
              to="/shop"
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded h-fit w-fit hover:bg-gray-200 transition font-medium"
            >
              ← Continue Shopping
            </Link>

            <div className="w-full md:w-80 space-y-3 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>K{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span className="text-sm italic text-gray-400">Calculated at checkout</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-900 border-t border-gray-200 pt-3">
                <span>Total:</span>
                <span>K{cartTotal.toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                className="block text-center bg-png-red text-white py-3 rounded font-semibold mt-4 hover:bg-red-700 transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}