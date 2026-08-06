import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingLangSwitch from './components/FloatingLangSwitch';
import Home from './pages/Home';
import { LangContext, TRANSLATIONS } from './LangContext';

const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Facilities = lazy(() => import('./pages/Facilities'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Custom lightweight SPA Router - navigate function exported for use in all pages
export const navigate = (path) => {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
};

export default function App() {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const [lang, setLang] = useState('en');

    useEffect(() => {
        const handlePopState = () => {
            setCurrentPath(window.location.pathname);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const t = TRANSLATIONS[lang];

    // Render page based on route
    const renderPage = () => {
        const page = (() => {
            switch (currentPath) {
                case '/':
                    return <Home />;
                case '/services':
                    return <Services />;
                case '/projects':
                    return <Projects />;
                case '/about':
                    return <About />;
                case '/contact':
                    return <Contact />;
                case '/facilities':
                    return <Facilities />;
                case '/admin':
                    return <AdminDashboard />;
                default:
                    return (
                        <div className="min-h-[60vh] flex flex-col justify-center items-center py-20 px-6">
                            <h1 className="font-sans font-extrabold text-6xl text-[#9e4300] tracking-tight uppercase">404</h1>
                            <p className="font-mono text-sm uppercase tracking-widest text-[#595f67] mt-4">Page Not Found</p>
                            <button
                                onClick={() => navigate('/')}
                                className="mt-8 border border-[#9e4300] text-[#9e4300] hover:bg-[#9e4300] hover:text-white px-8 py-3 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer"
                            >
                                {lang === 'en' ? 'Return Home' : 'Kembali ke Beranda'}
                            </button>
                        </div>
                    );
            }
        })();

        return (
            <Suspense fallback={
                <div className="min-h-[60vh] flex items-center justify-center">
                    <span className="font-mono text-xs text-gray-400 uppercase tracking-widest animate-pulse">Loading...</span>
                </div>
            }>
                {page}
            </Suspense>
        );
    };

    return (
        <LangContext.Provider value={{ lang, setLang, t }}>
            <div className="flex flex-col min-h-screen bg-[#f9f9f9] text-[#1a1c1c] selection:bg-[#f47321] selection:text-white relative">
                <Navbar currentPath={currentPath} />
                <main className="flex-grow">
                    {renderPage()}
                </main>
                <Footer />
                {/* Floating Clean Language Switcher (Bottom Right) */}
                <FloatingLangSwitch />
            </div>
        </LangContext.Provider>
    );
}
