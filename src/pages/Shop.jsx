import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useCart } from '../context/CartContext';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: cats } = await supabase.from('category').select('*');
    const { data: prods } = await supabase.from('product').select('*, category(categoryname)');
    if (cats) setCategories(cats);
    if (prods) setProducts(prods);
    setLoading(false);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setToast(`${product.productname} added to cart!`);
    setTimeout(() => setToast(''), 2500);
  };

  const filteredProducts = activeCategory
    ? products.filter((p) => p.categoryid === activeCategory)
    : products;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50">
          ✅ {toast}
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
          <h2 className="text-sm font-bold mb-4 text-gray-500 uppercase tracking-wider">Categories</h2>
          <ul className="space-y-2 text-sm">
            <li
              className={`cursor-pointer py-1 px-2 rounded ${!activeCategory ? 'bg-png-red text-white font-semibold' : 'text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveCategory(null)}
            >
              All Products
            </li>
            {categories.map((cat) => (
              <li
                key={cat.categoryid}
                className={`cursor-pointer py-1 px-2 rounded ${activeCategory === cat.categoryid ? 'bg-png-red text-white font-semibold' : 'text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setActiveCategory(cat.categoryid)}
              >
                {cat.categoryname}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {activeCategory
            ? categories.find((c) => c.categoryid === activeCategory)?.categoryname
            : 'All Products'}
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-gray-500">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.productid}
                className="border border-gray-200 rounded-lg p-4 flex flex-col bg-white hover:shadow-lg transition"
              >
                <div className="w-full h-48 bg-gray-200 rounded-md mb-4 overflow-hidden flex items-center justify-center">
                  {product.imageurl ? (
                    <img
                      src={product.imageurl}
                      alt={product.productname}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No Image</span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-800 truncate">
                  {product.productname}
                </h3>
                <p className="text-xs text-gray-500 mb-1">
                  {product.category?.categoryname}
                </p>
                <p className="text-lg font-bold text-png-red mb-3">
                  K{parseFloat(product.price).toFixed(2)}
                </p>
                <div className="flex flex-col gap-2 mt-auto">
                  <Link
                    to={`/product/${product.productid}`}
                    className="border border-gray-300 text-center py-2 text-sm rounded hover:bg-gray-50 transition"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-png-black text-white py-2 text-sm rounded hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}