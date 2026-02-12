import React from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative bg-white">
        {/* Sticky Header inside Content Area */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-gray-100">
           <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">ChatGPT</span>
                <span className="px-1.5 py-0.5 bg-gray-100 text-[10px] font-bold text-gray-500 rounded uppercase">Plus</span>
           </div>
           <div className="flex items-center gap-4">
               <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Share</button>
               <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=User&background=random" alt="User" />
               </div>
           </div>
        </header>

        {children}
      </main>
    </div>
  );
};

export default MainLayout;
