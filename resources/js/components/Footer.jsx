import React from 'react';
import { navigate } from '../AppComponent';
import { useLang } from '../LangContext';

export default function Footer() {
    const { t } = useLang();

    const handleIsoClick = () => {
        navigate('/about');
        setTimeout(() => {
            const el = document.getElementById('iso');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <footer className="bg-[#2f3131] text-white w-full relative border-t-4 border-[#9e4300]">
            <div className="grid grid-cols-12 gap-8 py-16 px-6 md:px-16 w-full max-w-[1440px] mx-auto">
                {/* Brand Column */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    <div className="flex items-center gap-3 select-none mb-2">
                        <img src="/berjayafooter.webp" alt="PT. Berjaya Group" width="240" height="160" loading="lazy" decoding="async" className="h-16 md:h-20 w-auto object-contain" />
                    </div>
                    <p className="text-gray-300 font-sans text-sm leading-relaxed max-w-sm">
                        {t.footer.tagline}
                    </p>
                    <button
                        onClick={handleIsoClick}
                        className="text-left text-[#f47321] font-mono text-xs uppercase tracking-widest font-bold hover:text-white transition-colors cursor-pointer w-fit"
                    >
                        {t.footer.isoBadge}
                    </button>
                </div>

                {/* Info Columns */}
                <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-4">
                        <p className="text-[#f47321] font-bold uppercase font-mono text-xs tracking-wider">Company</p>
                        <a onClick={() => navigate('/about')} className="text-gray-300 hover:text-[#f47321] transition-colors cursor-pointer text-sm">Profil Perusahaan</a>
                        <a onClick={() => navigate('/services')} className="text-gray-300 hover:text-[#f47321] transition-colors cursor-pointer text-sm">Layanan</a>
                        <a onClick={() => navigate('/projects')} className="text-gray-300 hover:text-[#f47321] transition-colors cursor-pointer text-sm">Referensi Proyek</a>
                        <a onClick={() => navigate('/facilities')} className="text-gray-300 hover:text-[#f47321] transition-colors cursor-pointer text-sm">Workshop & Peralatan</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-[#f47321] font-bold uppercase font-mono text-xs tracking-wider">Contact</p>
                        <a href="mailto:project@berjayagroup.co.id" className="text-gray-300 hover:text-[#f47321] transition-colors text-sm">project@berjayagroup.co.id</a>
                        <a href="tel:+62618227474" className="text-gray-300 hover:text-[#f47321] transition-colors text-sm">+62 61 822 7474</a>
                        <a href="https://www.berjayagroup.co.id" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#f47321] transition-colors text-sm">www.berjayagroup.co.id</a>
                        <button onClick={handleIsoClick} className="text-left text-gray-300 hover:text-[#f47321] transition-colors cursor-pointer text-sm">Sertifikasi ISO</button>
                    </div>
                    <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
                        <p className="text-[#f47321] font-bold uppercase font-mono text-xs tracking-wider">Office</p>
                        <p className="text-gray-400 text-xs font-mono leading-relaxed">Jl. Ngumban Surbakti No. 60<br />Sempakata, Medan Selayang<br />Kota Medan</p>
                        <p className="text-gray-400 text-xs font-mono leading-relaxed">Jl. Dr. Mansyur No. 128<br />Medan Selayang</p>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="col-span-12 mt-8 pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs font-mono">
                    <p>© 2026 PT. Berjaya Group. {t.footer.rights}</p>
                    <div className="flex gap-6 items-center">
                        <span onClick={() => navigate('/admin')} className="cursor-pointer hover:text-[#f47321] transition-colors">Staff Portal</span>
                        <span className="w-1.5 h-1.5 bg-[#9e4300] rounded-full"></span>
                        <span>Medan, Sumatera Utara</span>
                        <span className="w-1.5 h-1.5 bg-[#9e4300] rounded-full"></span>
                        <span>Est. 2008</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
