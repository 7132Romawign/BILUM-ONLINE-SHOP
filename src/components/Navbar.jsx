import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <header className="bg-gray-100 border-b border-gray-200 sticky top-0 z-50">
      <div className="text-center py-1.5 border-b border-gray-200 text-xs text-gray-500 tracking-wider uppercase">
        Authentic Papua New Guinean Bilums & Crafts
      </div>
      <div className="flex justify-between items-center px-4 py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <nav className="hidden lg:flex items-center space-x-6 text-sm text-gray-700">
            <Link to="/" className="hover:text-png-red transition">Home</Link>
            <Link to="/shop" className="hover:text-png-red transition">Shop</Link>
            <Link to="/contact" className="hover:text-png-red transition">Contact</Link>
          </nav>
        </div>

        <Link to="/" className="text-xl font-bold text-gray-900 tracking-wide">
          Bilum <span className="text-png-red">Shop</span>
        </Link>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search bilums, blouses..."
              className="bg-white border border-gray-300 px-3 py-1.5 rounded text-sm w-56 focus:outline-none focus:border-png-red"
            />
            <Search size={16} className="absolute right-3 top-2 text-gray-400" />
          </div>

          {/* Cart icon with badge */}
          <Link to="/cart" className="relative">
            <ShoppingCart size={22} className="text-gray-700 hover:text-png-red" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-png-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden md:block text-xs text-gray-600">
                Hi, {user.email?.split('@')[0]}
              </span>
              <button onClick={handleLogout} className="text-sm text-png-red hover:underline">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth">
              <User size={22} className="text-gray-700 hover:text-png-red" />
            </Link>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block text-gray-700">Home</Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)} className="block text-gray-700">Shop</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block text-gray-700">Contact</Link>
        </div>
      )}
    </header>
  );
}