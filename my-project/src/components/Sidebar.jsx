import React from 'react';
import { SquarePen, Search, Image as ImageIcon, LayoutGrid, Terminal, Globe, FolderRoot, ChevronRight } from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { icon: <SquarePen size={18} />, label: 'New chat', active: true },
        { icon: <Search size={18} />, label: 'Search chats' },
        { icon: <ImageIcon size={18} />, label: 'Images' },
        { icon: <LayoutGrid size={18} />, label: 'Apps' },
        { icon: <Terminal size={18} />, label: 'Codex' },
        { icon: <Globe size={18} />, label: 'GPTs' },
        { icon: <FolderRoot size={18} />, label: 'Projects' },
    ];

    const recentChats = [
        'React Login Flow',
        'Fronx On-Road Price Mandya',
        'Median of Two Sorted Arrays',
        'Python Function Exercises',
        'Windows shutdown shortcuts'
    ];

    return (
        <div className="w-64 h-screen bg-[#f9f9f9] border-r border-gray-200 flex flex-col p-3 transition-all duration-300">
            {/* Search/New Chat Area */}
            <div className="flex items-center justify-between mb-6 px-1">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center cursor-pointer">
                    <div className="w-4 h-4 border-2 border-white rotate-45" />
                </div>
                <div className="flex gap-2">
                    <button className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-600">
                        <Search size={18} />
                    </button>
                </div>
            </div>

            {/* Main Menu */}
            <div className="space-y-1 mb-8">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-colors ${item.active ? 'bg-white shadow-sm font-medium border border-gray-100' : 'hover:bg-gray-200 text-gray-600'
                            }`}
                    >
                        <span className={item.active ? 'text-slate-900' : 'text-gray-500'}>{item.icon}</span>
                        <span className="text-sm">{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Recent Chats */}
            <div className="flex-1 overflow-y-auto">
                <p className="text-xs font-semibold text-gray-400 px-3 mb-3 uppercase tracking-wider">Your chats</p>
                <div className="space-y-0.5">
                    {recentChats.map((chat, index) => (
                        <div
                            key={index}
                            className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-xl cursor-pointer truncate"
                        >
                            {chat}
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Profile/Plan (Minimal) */}
            <div className="mt-auto pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-xl cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        UN
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">Upgrade Plan</p>
                        <p className="text-xs text-gray-500 truncate">Get GPT-4, DALL-E and more</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
