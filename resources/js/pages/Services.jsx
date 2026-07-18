import React, { useState, useEffect } from 'react';
import { navigate } from '../AppComponent';

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        fetch('/api/services')
            .then((res) => res.json())
            .then((data) => {
                if (isMounted) {
                    setServices(data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error(err);
                if (isMounted) setLoading(false);
            });
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="w-full">
            {/* Header Banner */}
            <section className="bg-[#2f3131] text-white py-20 px-6 md:px-16 border-b border-[#dfc0b2] relative">
                <div className="structural-grid absolute inset-0 opacity-10 pointer-events-none"></div>
                <div className="relative z-10 max-w-[1440px] mx-auto">
                    <span className="text-[#f47321] font-mono text-xs uppercase tracking-widest font-bold block mb-2">Our Offerings</span>
                    <h1 className="font-sans font-black text-4xl md:text-5xl uppercase italic tracking-tight">
                        Technical Solutions & Civil Works
                    </h1>
                    <p className="text-gray-300 font-sans text-base max-w-2xl mt-4 leading-relaxed">
                        We deliver a comprehensive suite of civil engineering, commercial construction, modular structures, and safety consulting services designed to withstand decades of use.
                    </p>
                </div>
            </section>

            {/* Main Services List */}
            <section className="py-20 px-6 md:px-16 bg-[#f9f9f9] relative">
                <div className="max-w-[1440px] mx-auto">
                    {loading ? (
                        <div className="space-y-12">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-80 bg-gray-200 animate-pulse border border-[#dfc0b2]"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-20">
                            {services.map((service, idx) => {
                                const isEven = idx % 2 === 0;
                                return (
                                    <div 
                                        key={service.id} 
                                        className={`flex flex-col lg:flex-row gap-12 border-b border-[#dfc0b2]/40 pb-16 last:border-0 last:pb-0 ${
                                            isEven ? '' : 'lg:flex-row-reverse'
                                        }`}
                                    >
                                        {/* Image Section */}
                                        <div className="w-full lg:w-1/2 h-[350px] md:h-[450px] relative overflow-hidden border border-[#dfc0b2]">
                                            <img 
                                                src={service.image_url} 
                                                alt={service.title} 
                                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                            />
                                            <div className="absolute top-6 left-6 bg-[#9e4300] text-white font-mono text-xs uppercase tracking-wider font-bold px-4 py-2">
                                                {service.category}
                                            </div>
                                        </div>

                                        {/* Text Section */}
                                        <div className="w-full lg:w-1/2 flex flex-col justify-center">
                                            <div className="font-mono text-xs text-[#9e4300] uppercase tracking-widest font-bold mb-2">
                                                SERVICE REF: {service.service_id}
                                            </div>
                                            <h2 className="font-sans font-black text-3xl uppercase text-[#1a1c1c] tracking-tight mb-4">
                                                {service.title}
                                            </h2>
                                            <h3 className="font-sans font-bold text-base text-[#595f67] mb-6">
                                                {service.subtitle}
                                            </h3>
                                            <p className="text-gray-600 font-sans text-sm leading-relaxed mb-8">
                                                {service.description}
                                            </p>
                                            
                                            {/* Technical Details / Bullets */}
                                            {service.details && (
                                                <div className="bg-white border border-[#dfc0b2] p-6">
                                                    <h4 className="font-mono text-xs uppercase text-[#9e4300] font-bold tracking-widest mb-4">
                                                        TECHNICAL SPECIFICATIONS
                                                    </h4>
                                                    <ul className="grid grid-cols-2 gap-4 font-mono text-xs text-[#595f67]">
                                                        {service.details.map((detail, dIdx) => (
                                                            <li key={dIdx} className="flex items-center gap-2">
                                                                <span className="w-2 h-2 bg-[#f47321]"></span>
                                                                {detail}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            <div className="mt-8 flex gap-4">
                                                <button 
                                                    onClick={() => navigate('/contact')}
                                                    className="bg-[#f47321] text-white px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#9e4300] transition-colors cursor-pointer"
                                                >
                                                    Inquire for Quote
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Safety Performance Dashboard Sidebar Widget from reference */}
            <section className="bg-[#2f3131] text-white py-16 px-6 md:px-16 border-t-4 border-[#9e4300]">
                <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                    <div className="lg:col-span-1">
                        <span className="text-[#f47321] font-mono text-xs uppercase tracking-widest block mb-2">Metrics Compliance</span>
                        <h2 className="font-sans font-black text-2xl uppercase tracking-tight">Safety Auditing & Quality Dashboard</h2>
                        <p className="text-gray-400 font-sans text-sm mt-3 leading-relaxed">
                            Our compliance parameters exceed OSHA guidelines. Every infrastructure deployment executes under direct ISO-standard monitoring audits.
                        </p>
                    </div>
                    <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono">
                        <div className="border border-gray-700 p-6 text-center bg-[#1a1c1c]">
                            <p className="text-[#f47321] font-bold text-3xl">0.00</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Fatalities Rate</p>
                        </div>
                        <div className="border border-gray-700 p-6 text-center bg-[#1a1c1c]">
                            <p className="text-[#f47321] font-bold text-3xl">0.82</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">EMR Standard</p>
                        </div>
                        <div className="border border-gray-700 p-6 text-center bg-[#1a1c1c]">
                            <p className="text-[#f47321] font-bold text-3xl">100%</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">ISO 9001 Audited</p>
                        </div>
                        <div className="border border-gray-700 p-6 text-center bg-[#1a1c1c]">
                            <p className="text-[#f47321] font-bold text-3xl">10M+</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Hours Logged</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
