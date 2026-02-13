import React, { useState } from 'react';
import axios from 'axios';
import { User, Mail, Lock, ChevronRight, Github } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            console.log("Sending Signup Request:", {
                full_name: formData.fullName,
                email: formData.email,
                password: formData.password
            });

            const response = await axios.post('http://127.0.0.1:8000/signup', {
                full_name: formData.fullName,
                email: formData.email,
                password: formData.password
            });

            console.log("Signup Response:", response.data);

            const { access_token, refresh_token, token_type } = response.data;

            // Storing the session data
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            localStorage.setItem('token_type', token_type);

            alert("Signup Successful!");
            window.location.href = '/login';
        } catch (err) {
            console.error("Signup Error:", err);
            if (err.response) {
                console.error("Server Data:", err.response.data);
                setError(err.response.data.detail || JSON.stringify(err.response.data) || 'Registration failed');
            } else {
                setError(err.message || 'Registration failed. Is the backend running?');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-slate-50">
            <ParticleBackground />

            {/* Main Glass Card */}
            <div className="relative z-10 w-full max-w-[420px] bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[40px] shadow-2xl overflow-hidden">

                {/* Logo Section */}
                <div className="pt-10 pb-6 flex justify-center items-center gap-2 border-b border-white/20">
                    <div className="w-8 h-8 bg-slate-800 rounded-md flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white rotate-45" />
                    </div>
                    <span className="text-2xl font-semibold text-slate-800 tracking-tight">ChatGPT</span>
                </div>

                <div className="p-8 pt-10">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">Create an account</h1>
                        <p className="text-slate-500 text-sm mt-1">Sign up to get started.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-0 border border-white/40 rounded-2xl overflow-hidden bg-white/30">
                        {/* Grouped Inputs to match the stacked look */}
                        <div className="relative border-b border-white/40">
                            <User className="absolute left-4 top-4 text-slate-400" size={18} />
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative border-b border-white/40">
                            <Mail className="absolute left-4 top-4 text-slate-400" size={18} />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative border-b border-white/40">
                            <Lock className="absolute left-4 top-4 text-slate-400" size={18} />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-4 text-slate-400" size={18} />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-500"
                                onChange={handleChange}
                            />
                        </div>
                    </form>

                    {error && <p className="text-red-500 text-xs text-center mt-4 font-medium">{error}</p>}

                    {/* Create Account Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full mt-8 flex items-center justify-center bg-[#818cf8] hover:bg-[#717cf0] text-white font-semibold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 active:scale-[0.98] disabled:opacity-70"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>

                    {/* Login Link */}
                    <div className="flex justify-center items-center mt-6 text-slate-600 text-sm font-medium">
                        Already have an account?
                        <a href="/login" className="ml-1 text-slate-800 flex items-center hover:underline">
                            Log in <ChevronRight size={16} />
                        </a>
                    </div>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-300/50"></span></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-4 text-slate-500 font-medium">or continue with</span></div>
                    </div>

                    {/* Social Logins */}
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-center gap-3 py-3.5 bg-white/60 hover:bg-white/80 border border-white/60 rounded-2xl transition-all text-slate-700 font-medium text-sm">
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" className="w-5 h-5" alt="Google" />
                            Sign up with Google
                        </button>
                        <button className="w-full flex items-center justify-center gap-3 py-3.5 bg-white/60 hover:bg-white/80 border border-white/60 rounded-2xl transition-all text-slate-700 font-medium text-sm">
                            <Github size={20} className="text-slate-800" />
                            Sign up with GitHub
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;