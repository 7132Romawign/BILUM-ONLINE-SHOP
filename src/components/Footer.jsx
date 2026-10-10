import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">
            Bilum <span className="text-png-gold">Shop</span>
          </h3>
          <p className="text-sm leading-relaxed">
            Celebrating Papua New Guinea's rich culture through authentic handwoven Bilums, Meri Blouses, and traditional crafts.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-png-gold">Shop</Link></li>
            <li><Link to="/contact" className="hover:text-png-gold">Contact Us</Link></li>
            <li><Link to="/cart" className="hover:text-png-gold">My Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>📍 Vision City Mega Mall, Port Moresby</li>
            <li>📞 +675 7311 2780</li>
            <li>✉️ info@bilumshop.com.pg</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Bilum Shop. All rights reserved.
      </div>
    </footer>
  );
}