import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function Home() {
  const features = [
    'Authentic, PNG-Made Bilums',
    'Handcrafted Meri Blouses',
    'Supporting Local PNG Artisans',
    'Fast & Reliable Island-Wide Delivery',
    'Secure & Convenient Payments'
  ];

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Authentic PNG <span className="text-png-gold">Bilums & Crafts</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            From vibrant handwoven Bilums to beautifully tailored Meri Blouses — every item carries the heart, heritage, and pride of Papua New Guinea.
          </p>
          <Link to="/shop" className="bg-png-red hover:bg-red-700 text-white px-8 py-3 rounded font-semibold transition">
            Shop Now
          </Link>
        </div>
      </div>

      {/* About Us */}
      <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src="blob:https://gemini.google.com/0f2e8647-7cb9-46c4-92fd-a39fefdf45b2"
            alt="PNG Bilums and Crafts"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">About Us</h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to Bilum Shop — Papua New Guinea's trusted online store for authentic, handcrafted Bilums, Meri Blouses, and traditional crafts. Every item we sell carries the heart, heritage, and pride of our nation.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to bring authentic, locally made treasures to customers everywhere while supporting the artisans and communities who create them.
          </p>
          <h3 className="text-xl font-bold text-gray-900 mt-6">Why Choose Us?</h3>
          <ul className="space-y-3">
            {features.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700">
                <Check size={18} className="text-png-red flex-shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
