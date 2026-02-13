import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Lock, ChevronRight, Github, Loader2, Chrome } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // POST request to your FastAPI/Django localhost server
      const response = await axios.post('http://127.0.0.1:8000/login', formData);

      const { access_token, refresh_token, token_type } = response.data;

      // Storing the session data
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('token_type', token_type);

      // Success feedback
      alert("Login Successful!");
      window.location.href = '/';

    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-slate-50">
      <ParticleBackground />

      {/* Glassmorphic Login Card */}
      <div className="relative z-10 w-full max-w-[400px] bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[32px] shadow-2xl">

        {/* Brand Header */}
        <div className="pt-10 pb-6 flex flex-col items-center border-b border-white/20">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin-slow" />
          </div>
          <h1 className="text-xl font-semibold text-slate-800 tracking-tight">Welcome back</h1>
          <p className="text-slate-500 text-xs mt-1">Please enter your details</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Stacked Input Block */}
            <div className="border border-white/40 rounded-2xl overflow-hidden bg-white/30">
              <div className="relative border-b border-white/40 group">
                <Mail className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                  onChange={handleChange}
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-xs text-center font-medium">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign in'}
            </button>
          </form>

          {/* Secondary Actions */}
          <div className="flex justify-center items-center mt-6 text-slate-500 text-sm">
            No account?
            <a href="/signup" className="ml-1 text-indigo-600 font-semibold flex items-center hover:underline">
              Create one <ChevronRight size={16} />
            </a>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-300/40"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-4 text-slate-400 font-medium tracking-widest">or</span></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 bg-white/50 hover:bg-white border border-white/60 rounded-xl transition-all text-slate-700 font-medium text-xs">
              <Chrome size={16} />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-white/50 hover:bg-white border border-white/60 rounded-xl transition-all text-slate-700 font-medium text-xs">
              <Github size={16} />
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;