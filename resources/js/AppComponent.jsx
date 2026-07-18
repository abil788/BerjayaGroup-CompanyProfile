import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

// Custom lightweight SPA Router - navigate function exported for use in all pages
export const navigate = (path) => {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
};

export default function App() {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const handlePopState = () => {
            setCurrentPath(window.location.pathname);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Render page based on route
    const renderPage = () => {
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
                            Return Home
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f9f9f9] text-[#1a1c1c] selection:bg-[#f47321] selection:text-white">
            <Navbar currentPath={currentPath} />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
}
