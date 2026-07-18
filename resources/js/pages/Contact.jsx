import React, { useState } from 'react';

export default function Contact() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    
    // Form fields
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [organization, setOrganization] = useState('');
    const [sector, setSector] = useState('Civil Works');
    const [scope, setScope] = useState('');
    const [budget, setBudget] = useState('$5M - $25M');
    const [timeline, setTimeline] = useState('Immediate (Q1-Q2 2024)');
    
    // Server response
    const [referenceNumber, setReferenceNumber] = useState('');
    const [error, setError] = useState('');

    const sectors = ['Civil Works', 'Industrial', 'Commercial'];

    const handleNext = () => {
        if (step === 1) {
            if (!fullName || !email || !organization) {
                setError('Please fill in all basic info fields.');
                return;
            }
            setError('');
            setStep(2);
        }
    };

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!scope) {
            setError('Please describe your project scope and technical requirements.');
            return;
        }
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/inquiries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    full_name: fullName,
                    email,
                    organization,
                    sector,
                    scope,
                    budget,
                    timeline
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                setReferenceNumber(data.reference_number);
                setStep(3);
            } else {
                setError(data.message || 'Validation error. Please verify input data.');
            }
        } catch (err) {
            console.error('Submit error:', err);
            setError('Failed to log inquiry. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFullName('');
        setEmail('');
        setOrganization('');
        setSector('Civil Works');
        setScope('');
        setBudget('$5M - $25M');
        setTimeline('Immediate (Q1-Q2 2024)');
        setReferenceNumber('');
        setError('');
        setStep(1);
    };

    return (
        <div className="w-full">
            {/* Header Banner */}
            <section className="bg-[#2f3131] text-white py-16 px-6 md:px-16 border-b border-[#dfc0b2] relative">
                <div className="structural-grid absolute inset-0 opacity-10 pointer-events-none"></div>
                <div className="relative z-10 max-w-[1440px] mx-auto">
                    <span className="text-[#f47321] font-mono text-xs uppercase tracking-widest font-bold block mb-2">Connect</span>
                    <h1 className="font-sans font-black text-4xl md:text-5xl uppercase italic tracking-tight">
                        Contact Us & Inquiries
                    </h1>
                    <p className="text-gray-300 font-sans text-base max-w-2xl mt-4 leading-relaxed">
                        Log a formal project query using our structured multi-step portal. All submissions auto-generate a secure tracking token routed to our regional planning engineers.
                    </p>
                </div>
            </section>

            {/* Main Contact Section */}
            <section className="py-20 px-6 md:px-16 bg-[#f9f9f9] relative">
                <div className="structural-grid absolute inset-0 pointer-events-none opacity-5"></div>
                <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-12">
                    
                    {/* Left Column: Office info cards & Blueprint map */}
                    <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
                        
                        {/* Map placeholder with desaturated/blueprint look */}
                        <div className="border border-[#1a1c1c] p-6 bg-white relative group">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="font-sans font-bold text-lg uppercase tracking-tight text-[#1a1c1c]">Global Operations</h3>
                                    <p className="font-mono text-xs text-gray-400">ACTIVE REGIONAL ZONES</p>
                                </div>
                                <span className="material-symbols-outlined text-[#9e4300] scale-125">foundation</span>
                            </div>
                            <div className="aspect-[21/9] w-full bg-gray-250 overflow-hidden border border-[#dfc0b2] grayscale group-hover:grayscale-0 transition-all duration-700">
                                <img 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_yQN6fkRih94gSZWkAh-064iIqfomxjDyUMPW9PlHx0cnIMkz8Qptxgm6SsXp6DQBY1k6n-ubBCZevK30CwU7-zSpXN_TatSl0qTpWQq34Mcddnz0sgytciSbg1iU2aKLAfQ4JMA3-vwNvGMWwFhvkSvJft0zXtFCZaKhODxT1RXuse7ngLztZyj50spxsFjxZILECnKypUUFgk7wio85h8juNjSlkREkOUhC54EaxNsz3yetowttEA" 
                                    alt="Structural Integrity zones" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-[#595f67] mt-6 pt-4 border-t border-[#dfc0b2]/40">
                                <div>
                                    <p className="text-[#1a1c1c] font-bold mb-1 uppercase">Dubai office</p>
                                    <p>Office 1802, JLT Cluster T<br/>Dubai, United Arab Emirates</p>
                                </div>
                                <div>
                                    <p className="text-[#1a1c1c] font-bold mb-1 uppercase">Direct contact</p>
                                    <p>+971 4 555 9210<br/>dubai@structural.engineering</p>
                                </div>
                            </div>
                        </div>

                        {/* SOP / Protocols sidebar widget */}
                        <div className="bg-[#2f3131] text-white p-8 border border-gray-700 flex flex-col gap-6 font-sans">
                            <h4 className="font-mono text-xs text-[#f47321] uppercase tracking-widest border-b border-gray-700 pb-4 font-bold">
                                S.O.P. Ingestion Protocols
                            </h4>
                            <ul className="flex flex-col gap-6 text-sm text-gray-300">
                                <li className="flex gap-4 items-start">
                                    <div className="w-2.5 h-2.5 bg-[#f47321] shrink-0 mt-1.5"></div>
                                    <div>
                                        <p className="font-mono text-xs font-bold text-white uppercase">Geological Data</p>
                                        <p className="text-xs text-gray-400 mt-0.5">All technical queries should declare site soil composition or seismic specs.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="w-2.5 h-2.5 bg-[#f47321] shrink-0 mt-1.5"></div>
                                    <div>
                                        <p className="font-mono text-xs font-bold text-white uppercase">NDA Clearance</p>
                                        <p className="text-xs text-gray-400 mt-0.5">Formal NDA forms are signed online before comprehensive schematic shares.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="w-2.5 h-2.5 bg-[#f47321] shrink-0 mt-1.5"></div>
                                    <div>
                                        <p className="font-mono text-xs font-bold text-white uppercase">24/7 Field Support</p>
                                        <p className="text-xs text-gray-400 mt-0.5">Global operations support active construction fields under token #SI-911.</p>
                                    </div>
                                </li>
                            </ul>
                            <div className="pt-6 border-t border-gray-700 mt-4">
                                <div className="bg-[#1a1c1c] border border-[#9e4300]/40 p-4 font-mono text-center">
                                    <p className="text-xs text-[#f47321] uppercase font-bold tracking-widest mb-1">Emergency Hotlines</p>
                                    <p className="text-lg font-black text-white tracking-tighter">+1 800-STRUCT-911</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Multi-Step Interactive Form */}
                    <div className="col-span-12 lg:col-span-7">
                        <div className="bg-white border-2 border-[#1a1c1c] p-8 md:p-12 relative">
                            
                            {/* Step Indicators */}
                            <div className="flex justify-between items-center border-b border-[#dfc0b2] pb-6 mb-8">
                                <div>
                                    <h2 className="font-sans font-black text-2xl uppercase tracking-tight text-[#1a1c1c]">Project Inquiry</h2>
                                    <p className="font-mono text-[10px] text-gray-400 mt-1">FORM REFERENCE: SI-2026-R4</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className={`w-8 h-1.5 transition-colors ${step >= 1 ? 'bg-[#9e4300]' : 'bg-[#e2e2e2]'}`}></div>
                                    <div className={`w-8 h-1.5 transition-colors ${step >= 2 ? 'bg-[#9e4300]' : 'bg-[#e2e2e2]'}`}></div>
                                    <div className={`w-8 h-1.5 transition-colors ${step >= 3 ? 'bg-[#9e4300]' : 'bg-[#e2e2e2]'}`}></div>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-sm text-red-700 font-mono">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                
                                {/* Step 1: Basic Info */}
                                {step === 1 && (
                                    <div className="flex flex-col gap-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="font-mono text-xs text-[#9e4300] uppercase font-bold">Full Name</label>
                                                <input 
                                                    type="text" 
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    placeholder="Johnathan Doe"
                                                    className="bg-transparent border-b border-[#595f67] p-3 text-sm focus:border-[#9e4300] outline-none transition-all font-sans"
                                                    required
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="font-mono text-xs text-[#9e4300] uppercase font-bold">Corporate Email</label>
                                                <input 
                                                    type="email" 
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="j.doe@company.com"
                                                    className="bg-transparent border-b border-[#595f67] p-3 text-sm focus:border-[#9e4300] outline-none transition-all font-sans"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col gap-2">
                                            <label className="font-mono text-xs text-[#9e4300] uppercase font-bold">Organization / Entity</label>
                                            <input 
                                                type="text" 
                                                value={organization}
                                                onChange={(e) => setOrganization(e.target.value)}
                                                placeholder="Global Infrastructure Partners"
                                                className="bg-transparent border-b border-[#595f67] p-3 text-sm focus:border-[#9e4300] outline-none transition-all font-sans"
                                                required
                                            />
                                        </div>

                                        <div className="flex flex-col gap-4 pt-2">
                                            <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Primary Sector</p>
                                            <div className="grid grid-cols-3 gap-3">
                                                {sectors.map((sec) => (
                                                    <button
                                                        key={sec}
                                                        type="button"
                                                        onClick={() => setSector(sec)}
                                                        className={`border p-3.5 font-mono text-[10px] uppercase transition-all tracking-wider cursor-pointer ${
                                                            sector === sec
                                                                ? 'bg-[#1a1c1c] text-white border-[#1a1c1c]'
                                                                : 'bg-white text-[#595f67] border-[#dfc0b2] hover:border-[#9e4300]'
                                                        }`}
                                                    >
                                                        {sec}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Continue Action */}
                                        <div className="flex justify-end pt-6 border-t border-[#dfc0b2]/40 mt-4">
                                            <button 
                                                type="button"
                                                onClick={handleNext}
                                                className="bg-[#f47321] text-white font-mono text-xs uppercase tracking-widest font-bold px-8 py-4 hover:bg-[#9e4300] transition-colors cursor-pointer"
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Project Specifications */}
                                {step === 2 && (
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="font-mono text-xs text-[#9e4300] uppercase font-bold">
                                                Project Scope / Technical Specifications
                                            </label>
                                            <textarea 
                                                value={scope}
                                                onChange={(e) => setScope(e.target.value)}
                                                rows="6"
                                                placeholder="Provide geological details, target timelines, framework specs, or materials requirements..."
                                                className="bg-[#f3f3f3] border border-[#dfc0b2] p-4 text-sm focus:border-[#9e4300] outline-none transition-all font-sans resize-none"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="font-mono text-xs text-[#9e4300] uppercase font-bold">Estimated Budget</label>
                                                <select 
                                                    value={budget} 
                                                    onChange={(e) => setBudget(e.target.value)}
                                                    className="bg-transparent border-b border-[#595f67] p-3 text-sm focus:border-[#9e4300] outline-none font-mono"
                                                >
                                                    <option>$5M - $25M</option>
                                                    <option>$25M - $100M</option>
                                                    <option>$100M+</option>
                                                </select>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="font-mono text-xs text-[#9e4300] uppercase font-bold">Timeline</label>
                                                <select 
                                                    value={timeline} 
                                                    onChange={(e) => setTimeline(e.target.value)}
                                                    className="bg-transparent border-b border-[#595f67] p-3 text-sm focus:border-[#9e4300] outline-none font-mono"
                                                >
                                                    <option>Immediate (Q1-Q2 2024)</option>
                                                    <option>Planning Phase (2025 Start)</option>
                                                    <option>Request for Tender</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex justify-between items-center pt-6 border-t border-[#dfc0b2]/40 mt-4">
                                            <button 
                                                type="button"
                                                onClick={handleBack}
                                                className="text-[#595f67] hover:text-[#9e4300] font-mono text-xs uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                                            >
                                                <span className="material-symbols-outlined text-sm">arrow_back</span> Back
                                            </button>
                                            <button 
                                                type="submit"
                                                disabled={loading}
                                                className="bg-[#9e4300] text-white font-mono text-xs uppercase tracking-widest font-bold px-10 py-4 hover:bg-[#1a1c1c] active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                                            >
                                                {loading ? 'Submitting...' : 'Submit Inquiry'}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Success Screen */}
                                {step === 3 && (
                                    <div className="flex flex-col items-center text-center py-10 gap-6">
                                        <div className="w-20 h-20 bg-[#9e4300] flex items-center justify-center border-r-4 border-b-4 border-white shadow-md animate-bounce">
                                            <span className="material-symbols-outlined text-white text-4xl">check_circle</span>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-sans font-black text-2xl uppercase tracking-tight text-[#1a1c1c]">
                                                Inquiry Logged
                                            </h3>
                                            <div className="inline-block bg-[#2f3131] text-[#f47321] border border-gray-700 px-4 py-2 font-mono text-sm uppercase tracking-widest font-bold">
                                                Ref: {referenceNumber}
                                            </div>
                                            <p className="text-gray-600 font-sans text-sm max-w-md mx-auto pt-4 leading-relaxed">
                                                Our planning engineers will review your technical specifications. A senior manager from the <b>{sector}</b> division will contact you within 24 hours.
                                            </p>
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={handleReset}
                                            className="mt-4 border-2 border-[#1a1c1c] px-8 py-3.5 font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#1a1c1c] hover:text-white transition-all active:scale-95 cursor-pointer"
                                        >
                                            Submit New Form
                                        </button>
                                    </div>
                                )}

                            </form>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
