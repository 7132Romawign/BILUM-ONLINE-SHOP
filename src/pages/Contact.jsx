import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus('');

    const { error } = await supabase.from('contact_message').insert([formData]);

    if (error) {
      setStatus('❌ Error sending message. Please try again.');
    } else {
      setStatus('✅ Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
    setSending(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
      {/* Contact Info */}
      <div className="w-full md:w-1/3 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
        <p className="text-gray-600">
          We'd love to hear from you! Whether you have a question, feedback, or need assistance, our team is here to help.
        </p>

        <div className="space-y-4 text-gray-700">
          <div className="flex items-start gap-3">
            <MapPin className="text-png-red mt-1" size={20} />
            <span>N.C.D, Port Moresby, Vision City Mega Mall</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-png-red" size={20} />
            <span>+675 7311 2780</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-png-red" size={20} />
            <span>info@bilumshop.com.pg</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="text-png-red" size={20} />
            <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="w-full md:w-2/3">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-png-red"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            type="text"
            placeholder="Subject"
            required
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-png-red"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
          <textarea
            placeholder="Message"
            required
            rows="6"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-png-red"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          ></textarea>
          <button
            type="submit"
            disabled={sending}
            className="bg-png-red text-white px-8 py-3 rounded font-semibold hover:bg-red-700 transition disabled:opacity-50"
          >
            {sending ? 'Sending...' : 'Send Message'}
          </button>
          {status && <p className="text-sm mt-2 text-gray-700">{status}</p>}
        </form>
      </div>
    </div>
  );
}