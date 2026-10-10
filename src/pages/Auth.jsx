import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    let error;
    if (isSignUp) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { firstname: firstName, lastname: lastName },
        },
      });
      error = signUpError;
      if (!error) {
        setMessage('✅ Account created! Check your email to confirm, then log in.');
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      error = signInError;
    }

    if (error) {
      setMessage('❌ ' + error.message);
    } else if (!isSignUp) {
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border border-gray-200 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {isSignUp ? 'Create Bilum Shop Account' : 'Login to Bilum Shop'}
      </h2>
      <form onSubmit={handleAuth} className="space-y-4">
        {isSignUp && (
          <>
            <input
              type="text"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-png-red"
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-png-red"
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-png-red"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-png-red"
        />
        <button
          disabled={loading}
          className="w-full bg-png-red text-white py-3 rounded font-semibold hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>
      {message && (
        <p className="text-sm mt-4 text-center text-gray-700">{message}</p>
      )}
      <p
        className="text-center mt-4 text-sm text-gray-600 cursor-pointer hover:text-png-red"
        onClick={() => {
          setIsSignUp(!isSignUp);
          setMessage('');
        }}
      >
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
}