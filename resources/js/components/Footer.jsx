import React from 'react';
import { navigate } from '../AppComponent';

export default function Footer() {
    return (
        <footer className="bg-[#2f3131] text-white w-full relative border-t-4 border-[#9e4300]">
            <div className="grid grid-cols-12 gap-8 py-16 px-6 md:px-16 w-full max-w-[1440px] mx-auto">
                {/* Brand Column */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#9e4300] flex items-center justify-center font-bold text-white border-r-2 border-b-2 border-white">
                            SI
                        </div>
                        <span className="font-sans font-extrabold uppercase tracking-tight text-xl">
                            CONSTRUCTO
                        </span>
                    </div>
                    <p className="text-gray-300 font-sans text-sm leading-relaxed max-w-sm">
                        Leading global provider of structural engineering and civil construction solutions for large-scale infrastructure, power utilities, and industrial assets.
                    </p>
                    <div className="text-[#f47321] font-mono text-xs uppercase tracking-widest font-bold">
                        ISO 9001:2015 CERTIFIED
                    </div>
                </div>

                {/* Info Columns */}
                <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-4">
                        <p className="text-[#f47321] font-bold uppercase font-mono text-xs tracking-wider">Company</p>
                        <a onClick={() => navigate('/about')} className="text-gray-300 hover:text-[#f47321] transition-colors cursor-pointer text-sm">Global Offices</a>
                        <a onClick={() => navigate('/about')} className="text-gray-300 hover:text-[#f47321] transition-colors cursor-pointer text-sm">Careers</a>
                        <a onClick={() => navigate('/about')} className="text-gray-300 hover:text-[#f47321] transition-colors cursor-pointer text-sm">Sustainability</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-[#f47321] font-bold uppercase font-mono text-xs tracking-wider">Legal</p>
                        <a className="text-gray-300 hover:text-[#f47321] transition-colors cursor-pointer text-sm">ISO Certifications</a>
                        <a className="text-gray-300 hover:text-[#f47321] transition-colors cursor-pointer text-sm">Privacy Policy</a>
                        <a className="text-gray-300 hover:text-[#f47321] transition-colors cursor-pointer text-sm">Safety Protocols</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-[#f47321] font-bold uppercase font-mono text-xs tracking-wider">Social</p>
                        <a className="text-gray-300 hover:text-[#f47321] transition-colors cursor-pointer text-sm">LinkedIn</a>
                        <a className="text-gray-300 hover:text-[#f47321] transition-colors cursor-pointer text-sm">X / Twitter</a>
                        <a className="text-gray-300 hover:text-[#f47321] transition-colors cursor-pointer text-sm">Industry Blog</a>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="col-span-12 mt-12 pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs font-mono">
                    <p>© 2026 CONSTRUCTO Engineering. Built for Reliability. All Rights Reserved.</p>
                    <div className="flex gap-6 items-center">
                        <span>Engineering with Precision</span>
                        <span className="w-1.5 h-1.5 bg-[#9e4300] rounded-full"></span>
                        <span>Safety First</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
