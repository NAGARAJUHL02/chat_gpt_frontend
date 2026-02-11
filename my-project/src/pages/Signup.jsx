import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/signup', formData);
      setMessage('Signup successful! Welcome aboard.');
      console.log(response.data);
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-red-500">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;