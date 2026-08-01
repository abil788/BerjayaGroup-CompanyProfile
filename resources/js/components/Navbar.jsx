import React, { useState } from 'react';
import { navigate } from '../AppComponent';
import { useLang } from '../LangContext';

export default function Navbar({ currentPath }) {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLang();

    const navLinks = [
        { key: 'home',     path: '/' },
        { key: 'services', path: '/services' },
        { key: 'projects', path: '/projects' },
        { key: 'about',    path: '/about' },
        { key: 'contact',  path: '/contact' },
    ];

    const handleLinkClick = (path) => {
        setIsOpen(false);
        navigate(path);
    };

    return (
        <nav className="w-full top-0 sticky z-50 bg-[#f9f9f9]/90 backdrop-blur-md border-b border-[#dfc0b2] shadow-sm">
            <div className="flex justify-between items-center h-20 px-6 md:px-16 w-full max-w-[1440px] mx-auto">
                {/* Logo */}
                <div 
                    className="flex items-center gap-3 cursor-pointer select-none"
                    onClick={() => handleLinkClick('/')}
                >
                    <img src="/logo.png" alt="Berjaya Group" className="h-14 md:h-16 w-auto object-contain" />
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const isActive = currentPath === link.path;
                        return (
                            <button
                                key={link.key}
                                onClick={() => handleLinkClick(link.path)}
                                className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                                    isActive 
                                        ? 'text-[#9e4300] font-bold border-b-2 border-[#9e4300]' 
                                        : 'text-[#595f67] font-medium hover:text-[#9e4300]'
                                }`}
                            >
                                {t.nav[link.key]}
                            </button>
                        );
                    })}
                </div>

                {/* Right: Only CTA Button */}
                <div className="hidden md:flex items-center">
                    <button 
                        onClick={() => handleLinkClick('/contact')}
                        className="bg-[#f47321] text-white px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#9e4300] active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
                    >
                        {t.nav.cta}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-[#9e4300] focus:outline-none cursor-pointer p-1"
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
                                    key={link.key}
                                    onClick={() => handleLinkClick(link.path)}
                                    className={`text-left py-2 font-mono text-sm uppercase tracking-wider cursor-pointer ${
                                        isActive 
                                            ? 'text-[#9e4300] font-bold pl-2 border-l-2 border-[#9e4300]' 
                                            : 'text-[#595f67] hover:text-[#9e4300]'
                                    }`}
                                >
                                    {t.nav[link.key]}
                                </button>
                            );
                        })}
                    </div>
                    <div className="border-t border-[#dfc0b2]/40 pt-6">
                        <button 
                            onClick={() => handleLinkClick('/contact')}
                            className="bg-[#f47321] text-white text-center w-full py-3.5 font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#9e4300] cursor-pointer"
                        >
                            {t.nav.cta}
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
