import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { LayoutGrid } from 'lucide-react';

const MainLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-white">
            {/* Left Sidebar */}
            {isSidebarOpen && <Sidebar />}

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative bg-white flex flex-col">
                {/* Sticky Header inside Content Area */}
                <header className="sticky top-0 z-20 bg-white px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <LayoutGrid size={18} className="text-gray-600" />
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        {(localStorage.getItem('access_token') && localStorage.getItem('access_token') !== 'undefined' && localStorage.getItem('access_token') !== 'null') ? (
                            <div className="flex items-center gap-4">
                                <button onClick={() => { localStorage.removeItem('access_token'); window.location.reload(); }} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Log out</button>
                                <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                                    <img src={`https://ui-avatars.com/api/?name=${localStorage.getItem('user_name') || 'User'}&background=random`} alt="User" />
                                </div>
                            </div>
                        ) : (
                            <a
                                href="/signup"
                                className="bg-black text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-gray-800 transition-all shadow-sm active:scale-95"
                            >
                                Sign up
                            </a>
                        )}
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
};

export default MainLayout;
