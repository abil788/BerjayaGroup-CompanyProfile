import React from 'react';
import { navigate } from '../AppComponent';

export default function About() {
    const offices = [
        { city: 'Houston', address: '442 Energy Way, Houston, TX 77002', phone: '+1 713-555-0190', email: 'houston@structural.engineering' },
        { city: 'London', address: '12 Canary Wharf, London E14 5AB', phone: '+44 20 7946 0192', email: 'london@structural.engineering' },
        { city: 'Dubai', address: 'Office 1802, JLT Cluster T, Dubai, UAE', phone: '+971 4 555 9210', email: 'dubai@structural.engineering' }
    ];

    const values = [
        { title: 'Technical Precision', desc: 'Every calculation, material selection, and structural element is subjected to rigorous safety simulations and peer audits.' },
        { title: 'Absolute Safety', desc: "Our 'Zero-Harm' policy is non-negotiable. We maintain a project site EMR rating of 0.82, well below industry standard average of 1.0." },
        { title: 'Asset Permanence', desc: 'We engineer infrastructure designed to last. Our structural concrete raw material mix is carbon-neutral and rated for a 100-year lifecycle.' }
    ];

    return (
        <div className="w-full">
            {/* Header Banner */}
            <section className="bg-[#2f3131] text-white py-20 px-6 md:px-16 border-b border-[#dfc0b2] relative">
                <div className="structural-grid absolute inset-0 opacity-10 pointer-events-none"></div>
                <div className="relative z-10 max-w-[1440px] mx-auto">
                    <span className="text-[#f47321] font-mono text-xs uppercase tracking-widest font-bold block mb-2">Corporate Identity</span>
                    <h1 className="font-sans font-black text-4xl md:text-5xl uppercase italic tracking-tight">
                        About Constructo Engineering
                    </h1>
                    <p className="text-gray-300 font-sans text-base max-w-2xl mt-4 leading-relaxed">
                        Forging heavy civil frameworks and industrial assets globally since 2008. We operate at the intersection of technical design accuracy and massive building scales.
                    </p>
                </div>
            </section>

            {/* Our Story / Intro */}
            <section className="py-20 px-6 md:px-16 bg-[#f9f9f9] relative">
                <div className="structural-grid absolute inset-0 pointer-events-none opacity-5"></div>
                <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        <span className="text-[#9e4300] font-mono text-xs uppercase tracking-widest font-bold">15+ Years Leadership</span>
                        <h2 className="font-sans font-black text-3xl uppercase tracking-tight text-[#1a1c1c]">
                            Defining structural standards in civil engineering
                        </h2>
                        <p className="text-gray-600 font-sans text-sm leading-relaxed">
                            Established in Houston, Texas, CONSTRUCTO grew from a local structural design group into a leading international civil works developer. Today, we oversee critical infrastructure projects across three continents, combining advanced WebGL mechanical simulation data with experienced site crews.
                        </p>
                        <p className="text-gray-600 font-sans text-sm leading-relaxed">
                            Our primary sector deployments are ISO 9001:2015 certified, verifying our commitment to structural durability. From high-rise skeletons to mass earthworks, our team of structural engineers manages the entire asset cycle.
                        </p>
                    </div>
                    <div className="lg:col-span-5 relative h-80 border-2 border-[#1a1c1c] overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA5eXZCjxBnlR73UbAkt7Nb9FuIO2C_jz9IrqBrDpn35t8wAqM9WI0DOGzHLgtY8Lso7vBFW1ya3FxLCRc2UFJxg0LFuqdLzA6GubH6digvnBeVNTQktCI3FBRrh3SZba27EplZOEkkqChur8Rkl0V7yJ-9c4GAVYTm-hmRNJcB02fcqay3OemsPMdUBU8eraWRNG7QLb3EB0RO9oVtKK42PpSNCmK19HcvotvYFSiFlmF2dQQTSKx-Cg')" }}>
                        <div className="absolute inset-0 bg-[#9e4300]/20"></div>
                        <div className="absolute bottom-4 left-4 bg-[#1a1c1c] text-white px-4 py-2 font-mono text-xs uppercase border border-[#dfc0b2]">
                            EST. 2008
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 px-6 md:px-16 bg-[#e2e2e2]">
                <div className="max-w-[1440px] mx-auto">
                    <div className="mb-16 border-l-8 border-[#9e4300] pl-6">
                        <span className="text-[#9e4300] font-mono text-xs uppercase tracking-widest font-bold">Operating Standards</span>
                        <h2 className="font-sans font-black text-3xl uppercase text-[#1a1c1c] mt-2">Our Pillars of Work</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((val, idx) => (
                            <div key={idx} className="bg-white border border-[#dfc0b2] p-8 flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 bg-[#9e4300] flex items-center justify-center font-bold text-white mb-6">
                                        0{idx + 1}
                                    </div>
                                    <h3 className="font-sans font-black text-xl uppercase text-[#1a1c1c] mb-4">{val.title}</h3>
                                    <p className="text-gray-600 font-sans text-sm leading-relaxed">{val.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Offices */}
            <section className="py-20 px-6 md:px-16 bg-[#f9f9f9]">
                <div className="max-w-[1440px] mx-auto">
                    <div className="mb-16 border-l-8 border-[#9e4300] pl-6">
                        <span className="text-[#9e4300] font-mono text-xs uppercase tracking-widest font-bold">Network</span>
                        <h2 className="font-sans font-black text-3xl uppercase text-[#1a1c1c] mt-2">Global Directives</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {offices.map((office) => (
                            <div key={office.city} className="bg-white border border-[#dfc0b2] p-8 flex flex-col justify-between group hover:border-[#9e4300] transition-colors duration-300">
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="font-sans font-extrabold text-2xl uppercase tracking-tight text-[#1a1c1c]">
                                            {office.city}
                                        </span>
                                        <span className="material-symbols-outlined text-[#9e4300] text-3xl">public</span>
                                    </div>
                                    <div className="space-y-3 font-mono text-xs text-[#595f67]">
                                        <p className="font-bold text-[#1a1c1c] uppercase">Address</p>
                                        <p className="not-italic leading-relaxed">{office.address}</p>
                                        <p className="font-bold text-[#1a1c1c] uppercase pt-2">Direct</p>
                                        <p>{office.phone}</p>
                                        <p className="underline hover:text-[#9e4300] transition-colors cursor-pointer">{office.email}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
