import React, { useState } from 'react';
import { navigate } from '../AppComponent';

export default function Navbar({ currentPath }) {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Projects', path: '/projects' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ];

    const handleLinkClick = (path) => {
        setIsOpen(false);
        navigate(path);
    };

    return (
        <nav className="w-full top-0 sticky z-50 bg-[#f9f9f9]/90 backdrop-blur-md border-b border-[#dfc0b2] shadow-sm">
            <div className="flex justify-between items-center h-20 px-6 md:px-16 w-full max-w-[1440px] mx-auto">
                {/* Logo and Name */}
                <div 
                    className="flex items-center gap-3 cursor-pointer select-none"
                    onClick={() => handleLinkClick('/')}
                >
                    <div className="w-8 h-8 bg-[#9e4300] flex items-center justify-center font-bold text-white tracking-tighter text-sm border-r-2 border-b-2 border-white">
                        SI
                    </div>
                    <span className="font-sans font-extrabold uppercase tracking-tight text-xl text-[#9e4300] hover:text-[#f47321] transition-colors">
                        CONSTRUCTO
                    </span>
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-2">
                    {navLinks.map((link) => {
                        const isActive = currentPath === link.path;
                        return (
                            <button
                                key={link.name}
                                onClick={() => handleLinkClick(link.path)}
                                className={`px-4 py-2 font-mono text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                                    isActive 
                                        ? 'text-[#9e4300] font-bold border-b-2 border-[#9e4300]' 
                                        : 'text-[#595f67] font-medium hover:text-[#9e4300]'
                                }`}
                            >
                                {link.name}
                            </button>
                        );
                    })}
                </div>

                {/* Right Action Button & Admin Link */}
                <div className="hidden md:flex items-center gap-4">
                    <button 
                        onClick={() => handleLinkClick('/admin')} 
                        className="text-[#595f67] hover:text-[#9e4300] font-mono text-xs uppercase tracking-widest transition-colors cursor-pointer"
                    >
                        [Admin Control]
                    </button>
                    <button 
                        onClick={() => handleLinkClick('/contact')}
                        className="bg-[#f47321] text-white px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#9e4300] active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                        Request a Quote
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-[#9e4300] focus:outline-none cursor-pointer"
                >
                    <span className="material-symbols-outlined text-3xl">
                        {isOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </div>

            {/* Mobile Nav Drawer */}
            {isOpen && (
                <div className="md:hidden bg-[#f9f9f9] border-b border-[#dfc0b2] px-6 py-8 flex flex-col gap-6 animate-fadeIn">
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => {
                            const isActive = currentPath === link.path;
                            return (
                                <button
                                    key={link.name}
                                    onClick={() => handleLinkClick(link.path)}
                                    className={`text-left py-2 font-mono text-sm uppercase tracking-wider cursor-pointer ${
                                        isActive 
                                            ? 'text-[#9e4300] font-bold pl-2 border-l-2 border-[#9e4300]' 
                                            : 'text-[#595f67] hover:text-[#9e4300]'
                                    }`}
                                >
                                    {link.name}
                                </button>
                            );
                        })}
                    </div>
                    <div className="border-t border-[#dfc0b2]/40 pt-6 flex flex-col gap-4">
                        <button
                            onClick={() => handleLinkClick('/admin')}
                            className="text-left font-mono text-xs uppercase tracking-widest text-[#595f67] hover:text-[#9e4300] cursor-pointer"
                        >
                            [Admin Control]
                        </button>
                        <button 
                            onClick={() => handleLinkClick('/contact')}
                            className="bg-[#f47321] text-white text-center py-4 font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#9e4300] cursor-pointer"
                        >
                            Request a Quote
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
