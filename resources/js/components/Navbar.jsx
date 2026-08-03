import React, { useState, useRef, useEffect } from 'react';
import { navigate } from '../AppComponent';
import { useLang } from '../LangContext';

function DropdownMenu({ label, isActive, items, currentPath }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleItemClick = (path, hash) => {
        setOpen(false);
        if (hash) {
            navigate(path);
            setTimeout(() => {
                const el = document.getElementById(hash);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            navigate(path);
        }
    };

    return (
        <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button
                onClick={() => setOpen(!open)}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                    isActive
                        ? 'text-[#9e4300] font-bold border-b-2 border-[#9e4300]'
                        : 'text-[#595f67] font-medium hover:text-[#9e4300]'
                }`}
            >
                {label}
                <span className={`material-symbols-outlined text-[14px] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
                    expand_more
                </span>
            </button>
            {open && (
                <div className="absolute top-full left-0 min-w-[220px] bg-white border border-[#dfc0b2] shadow-lg z-50 py-1 animate-fadeIn">
                    {items.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => handleItemClick(item.path, item.hash)}
                            className="w-full text-left px-5 py-3 font-mono text-xs uppercase tracking-wide text-[#595f67] hover:text-[#9e4300] hover:bg-[#f9f9f9] transition-all flex items-center gap-2 cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-[14px] text-[#f47321]">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function Navbar({ currentPath }) {
    const [isOpen, setIsOpen] = useState(false);
    const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
    const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
    const { t } = useLang();

    const isProjectsActive = currentPath === '/projects' || currentPath === '/facilities';
    const isAboutActive = currentPath === '/about';

    const projectsItems = [
        { label: t.nav.projectsRef, path: '/projects', icon: 'folder_open' },
        { label: t.nav.projectsOngoing, path: '/projects?status=ongoing', icon: 'construction' },
        { label: t.nav.projectsFacilities, path: '/facilities', icon: 'build' },
    ];

    const aboutItems = [
        { label: t.nav.aboutProfile, path: '/about', icon: 'business' },
        { label: t.nav.aboutIso, path: '/about', hash: 'iso', icon: 'verified' },
    ];

    const handleLinkClick = (path, hash) => {
        setIsOpen(false);
        if (hash) {
            navigate(path);
            setTimeout(() => {
                const el = document.getElementById(hash);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            navigate(path);
        }
    };

    return (
        <nav className="w-full top-0 sticky z-50 bg-[#f9f9f9]/90 backdrop-blur-md border-b border-[#dfc0b2] shadow-sm">
            <div className="flex justify-between items-center h-20 px-6 md:px-16 w-full max-w-[1440px] mx-auto">
                {/* Logo */}
                <div
                    className="flex items-center gap-3 cursor-pointer select-none"
                    onClick={() => handleLinkClick('/')}
                >
                    <img src="/logo.png" alt="PT. Berjaya Group" className="h-14 md:h-16 w-auto object-contain" />
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-1">
                    {/* Home */}
                    <button
                        onClick={() => handleLinkClick('/')}
                        className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                            currentPath === '/'
                                ? 'text-[#9e4300] font-bold border-b-2 border-[#9e4300]'
                                : 'text-[#595f67] font-medium hover:text-[#9e4300]'
                        }`}
                    >
                        {t.nav.home}
                    </button>

                    {/* Services */}
                    <button
                        onClick={() => handleLinkClick('/services')}
                        className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                            currentPath === '/services'
                                ? 'text-[#9e4300] font-bold border-b-2 border-[#9e4300]'
                                : 'text-[#595f67] font-medium hover:text-[#9e4300]'
                        }`}
                    >
                        {t.nav.services}
                    </button>

                    {/* Projects Dropdown */}
                    <DropdownMenu
                        label={t.nav.projects}
                        isActive={isProjectsActive}
                        items={projectsItems}
                        currentPath={currentPath}
                    />

                    {/* About Dropdown */}
                    <DropdownMenu
                        label={t.nav.about}
                        isActive={isAboutActive}
                        items={aboutItems}
                        currentPath={currentPath}
                    />

                    {/* Contact */}
                    <button
                        onClick={() => handleLinkClick('/contact')}
                        className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                            currentPath === '/contact'
                                ? 'text-[#9e4300] font-bold border-b-2 border-[#9e4300]'
                                : 'text-[#595f67] font-medium hover:text-[#9e4300]'
                        }`}
                    >
                        {t.nav.contact}
                    </button>
                </div>

                {/* Right: CTA Button */}
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
                <div className="md:hidden bg-[#f9f9f9] border-b border-[#dfc0b2] px-6 py-6 flex flex-col gap-2 animate-fadeIn">
                    {/* Home */}
                    <button
                        onClick={() => handleLinkClick('/')}
                        className={`text-left py-3 font-mono text-sm uppercase tracking-wider cursor-pointer border-b border-[#dfc0b2]/40 ${
                            currentPath === '/' ? 'text-[#9e4300] font-bold' : 'text-[#595f67] hover:text-[#9e4300]'
                        }`}
                    >
                        {t.nav.home}
                    </button>

                    {/* Services */}
                    <button
                        onClick={() => handleLinkClick('/services')}
                        className={`text-left py-3 font-mono text-sm uppercase tracking-wider cursor-pointer border-b border-[#dfc0b2]/40 ${
                            currentPath === '/services' ? 'text-[#9e4300] font-bold' : 'text-[#595f67] hover:text-[#9e4300]'
                        }`}
                    >
                        {t.nav.services}
                    </button>

                    {/* Projects Accordion */}
                    <div className="border-b border-[#dfc0b2]/40">
                        <button
                            onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                            className={`w-full text-left py-3 font-mono text-sm uppercase tracking-wider cursor-pointer flex items-center justify-between ${
                                isProjectsActive ? 'text-[#9e4300] font-bold' : 'text-[#595f67] hover:text-[#9e4300]'
                            }`}
                        >
                            {t.nav.projects}
                            <span className={`material-symbols-outlined text-sm transition-transform ${mobileProjectsOpen ? 'rotate-180' : ''}`}>expand_more</span>
                        </button>
                        {mobileProjectsOpen && (
                            <div className="pl-4 pb-3 flex flex-col gap-1">
                                {projectsItems.map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleLinkClick(item.path)}
                                        className="text-left py-2 font-mono text-xs uppercase tracking-wide text-[#595f67] hover:text-[#9e4300] flex items-center gap-2 cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-[12px] text-[#f47321]">{item.icon}</span>
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* About Accordion */}
                    <div className="border-b border-[#dfc0b2]/40">
                        <button
                            onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                            className={`w-full text-left py-3 font-mono text-sm uppercase tracking-wider cursor-pointer flex items-center justify-between ${
                                isAboutActive ? 'text-[#9e4300] font-bold' : 'text-[#595f67] hover:text-[#9e4300]'
                            }`}
                        >
                            {t.nav.about}
                            <span className={`material-symbols-outlined text-sm transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`}>expand_more</span>
                        </button>
                        {mobileAboutOpen && (
                            <div className="pl-4 pb-3 flex flex-col gap-1">
                                {aboutItems.map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleLinkClick(item.path, item.hash)}
                                        className="text-left py-2 font-mono text-xs uppercase tracking-wide text-[#595f67] hover:text-[#9e4300] flex items-center gap-2 cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-[12px] text-[#f47321]">{item.icon}</span>
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Contact */}
                    <button
                        onClick={() => handleLinkClick('/contact')}
                        className={`text-left py-3 font-mono text-sm uppercase tracking-wider cursor-pointer border-b border-[#dfc0b2]/40 ${
                            currentPath === '/contact' ? 'text-[#9e4300] font-bold' : 'text-[#595f67] hover:text-[#9e4300]'
                        }`}
                    >
                        {t.nav.contact}
                    </button>

                    {/* CTA */}
                    <div className="pt-4">
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
