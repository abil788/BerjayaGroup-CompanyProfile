import React from 'react';
import { navigate } from '../AppComponent';
import { useLang } from '../LangContext';

const ISO_CERTS = [
    {
        standard: 'ISO 9001:2015',
        name: 'Quality Management System',
        certNo: '130824016238',
        validUntil: '12 Agustus 2027',
        image: '/iso9001.jpg',
    },
    {
        standard: 'ISO 14001:2015',
        name: 'Environmental Management System',
        certNo: '130824026239',
        validUntil: '12 Agustus 2027',
        image: '/iso14001.jpg',
    },
    {
        standard: 'ISO 45001:2018',
        name: 'Occupational Health & Safety Management System',
        certNo: '130824036240',
        validUntil: '12 Agustus 2027',
        image: '/iso45001.jpg',
    },
    {
        standard: 'ISO 37001:2016',
        name: 'Anti-Bribery Management System',
        certNo: '130824196241',
        validUntil: '12 Agustus 2027',
        image: '/iso37001.jpg',
    },
];

const OFFICES = [
    {
        type: 'office',
        label: 'Office 1',
        address: 'Jl. Ngumban Surbakti No. 60, Sempakata, Medan Selayang, Kota Medan',
        phone: '+62 61 822 7474',
        email: 'project@berjayagroup.co.id',
    },
    {
        type: 'office',
        label: 'Office 2',
        address: 'Jl. Dr. Mansyur No. 128, Medan Selayang',
        phone: '+62 61 822 7474',
        email: 'project@berjayagroup.co.id',
    },
];

const WORKSHOP = {
    type: 'workshop',
    label: 'Workshop',
    address: 'Jl. Besar Namorambe No. 30, Kabupaten Deli Serdang',
    note: '2 unit · 8.000 m² · Beroperasi sejak 2004',
};

export default function About() {
    const { t } = useLang();
    const a = t.about;

    return (
        <div className="w-full">
            {/* Header Banner */}
            <section className="bg-[#2f3131] text-white py-20 px-6 md:px-16 border-b border-[#dfc0b2] relative">
                <div className="structural-grid absolute inset-0 opacity-10 pointer-events-none"></div>
                <div className="relative z-10 max-w-[1440px] mx-auto">
                    <span className="text-[#f47321] font-mono text-xs uppercase tracking-widest font-bold block mb-2">{a.badge}</span>
                    <h1 className="font-sans font-black text-4xl md:text-5xl uppercase italic tracking-tight">
                        {a.title}
                    </h1>
                    <p className="text-gray-300 font-sans text-base max-w-2xl mt-4 leading-relaxed">
                        {a.desc}
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 px-6 md:px-16 bg-[#f9f9f9] relative">
                <div className="structural-grid absolute inset-0 pointer-events-none opacity-5"></div>
                <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        <span className="text-[#9e4300] font-mono text-xs uppercase tracking-widest font-bold">{a.storyBadge}</span>
                        <h2 className="font-sans font-black text-3xl uppercase tracking-tight text-[#1a1c1c]">
                            {a.storyTitle}
                        </h2>
                        <p className="text-gray-600 font-sans text-sm leading-relaxed">{a.storyP1}</p>
                        <p className="text-gray-600 font-sans text-sm leading-relaxed">{a.storyP2}</p>
                        <div className="flex gap-4 pt-4">
                            <button onClick={() => navigate('/projects')} className="bg-[#f47321] text-white px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#9e4300] transition-colors cursor-pointer">
                                View Projects
                            </button>
                            <button onClick={() => navigate('/facilities')} className="border border-[#9e4300] text-[#9e4300] px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#9e4300] hover:text-white transition-colors cursor-pointer">
                                Our Equipment
                            </button>
                        </div>
                    </div>
                    <div className="lg:col-span-5 relative h-80 border-2 border-[#1a1c1c] overflow-hidden bg-[#2f3131] flex items-center justify-center">
                        {/* TODO: ganti dengan foto kantor/proyek riil PT. Berjaya Group */}
                        <img
                            src="/berjayafooter.png"
                            alt="PT. Berjaya Group"
                            className="w-full h-full object-cover opacity-70"
                        />
                        <div className="absolute inset-0 bg-[#9e4300]/10"></div>
                        <div className="absolute bottom-4 left-4 bg-[#1a1c1c] text-white px-4 py-2 font-mono text-xs uppercase border border-[#dfc0b2]">EST. 2008</div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 px-6 md:px-16 bg-[#e2e2e2]">
                <div className="max-w-[1440px] mx-auto">
                    <div className="mb-16 border-l-8 border-[#9e4300] pl-6">
                        <span className="text-[#9e4300] font-mono text-xs uppercase tracking-widest font-bold">{a.valuesBadge}</span>
                        <h2 className="font-sans font-black text-3xl uppercase text-[#1a1c1c] mt-2">{a.valuesTitle}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {a.values.map((val, idx) => (
                            <div key={idx} className="bg-white border border-[#dfc0b2] p-8 flex flex-col justify-between hover:border-[#9e4300] transition-colors duration-300">
                                <div>
                                    <div className="w-12 h-12 bg-[#9e4300] flex items-center justify-center font-bold text-white mb-6">0{idx + 1}</div>
                                    <h3 className="font-sans font-black text-xl uppercase text-[#1a1c1c] mb-4">{val.title}</h3>
                                    <p className="text-gray-600 font-sans text-sm leading-relaxed">{val.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Office & Workshop */}
            <section className="py-20 px-6 md:px-16 bg-[#f9f9f9]">
                <div className="max-w-[1440px] mx-auto">
                    <div className="mb-16 border-l-8 border-[#9e4300] pl-6">
                        <span className="text-[#9e4300] font-mono text-xs uppercase tracking-widest font-bold">{a.officesBadge}</span>
                        <h2 className="font-sans font-black text-3xl uppercase text-[#1a1c1c] mt-2">{a.officesTitle}</h2>
                    </div>
                    {/* Offices — 2 col grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {OFFICES.map((office, i) => (
                            <div key={i} className="bg-white border border-[#dfc0b2] p-8 group hover:border-[#9e4300] transition-colors duration-300">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="font-sans font-extrabold text-xl uppercase tracking-tight text-[#1a1c1c]">{office.label}</span>
                                    <span className="material-symbols-outlined text-[#9e4300] text-3xl">apartment</span>
                                </div>
                                <div className="space-y-3 font-mono text-xs text-[#595f67]">
                                    <div>
                                        <p className="font-bold text-[#1a1c1c] uppercase mb-1">{a.addressLabel}</p>
                                        <p className="leading-relaxed">{office.address}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#1a1c1c] uppercase mb-1">{a.phoneLabel}</p>
                                        <a href={`tel:${office.phone.replace(/\s/g,'')}`} className="hover:text-[#9e4300] transition-colors">{office.phone}</a>
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#1a1c1c] uppercase mb-1">{a.emailLabel}</p>
                                        <a href={`mailto:${office.email}`} className="underline hover:text-[#9e4300] transition-colors cursor-pointer">{office.email}</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Workshop — full width */}
                    <div className="bg-[#2f3131] border border-[#9e4300]/40 p-8 flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-[#9e4300] flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-3xl">build</span>
                            </div>
                        </div>
                        <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="font-sans font-extrabold text-xl uppercase tracking-tight text-white">{a.workshopLabel}</span>
                                <span className="bg-[#f47321] text-white px-3 py-0.5 font-mono text-[10px] uppercase tracking-wider font-bold">8.000 m²</span>
                            </div>
                            <p className="font-mono text-xs text-gray-300 leading-relaxed">{WORKSHOP.address}</p>
                            <p className="font-mono text-xs text-[#f47321] mt-2">{WORKSHOP.note}</p>
                        </div>
                        <button onClick={() => navigate('/facilities')} className="shrink-0 border border-[#f47321] text-[#f47321] hover:bg-[#f47321] hover:text-white px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold transition-all cursor-pointer">
                            View Equipment
                        </button>
                    </div>
                </div>
            </section>

            {/* ISO Certifications — anchor target */}
            <section id="iso" className="py-20 px-6 md:px-16 bg-[#1a1c1c] text-white scroll-mt-20">
                <div className="max-w-[1440px] mx-auto">
                    <div className="mb-16 border-l-8 border-[#f47321] pl-6">
                        <span className="text-[#f47321] font-mono text-xs uppercase tracking-widest font-bold">{a.isoBadge}</span>
                        <h2 className="font-sans font-black text-3xl uppercase text-white mt-2">{a.isoTitle}</h2>
                        <p className="text-gray-400 font-sans text-sm mt-3 max-w-2xl leading-relaxed">{a.isoDesc}</p>
                    </div>

                    {/* ISO Scope */}
                    <div className="bg-[#2f3131] border border-gray-700 p-6 mb-12">
                        <p className="font-mono text-xs text-[#f47321] uppercase tracking-widest mb-2">{a.isoScope}</p>
                        <p className="text-gray-300 font-sans text-sm leading-relaxed italic">"{a.isoScopeText}"</p>
                    </div>

                    {/* 4 ISO Cards — 2x2 grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {ISO_CERTS.map((cert, idx) => (
                            <div key={idx} className="bg-[#2f3131] border border-gray-700 group hover:border-[#f47321]/60 transition-all duration-300 overflow-hidden flex flex-col md:flex-row">
                                {/* Certificate Image */}
                                <div className="md:w-48 h-48 md:h-auto flex-shrink-0 overflow-hidden bg-white">
                                    <img
                                        src={cert.image}
                                        alt={cert.standard}
                                        className="w-full h-full object-contain p-2 grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                {/* Certificate Info */}
                                <div className="p-6 flex flex-col justify-between flex-grow">
                                    <div>
                                        <div className="inline-block bg-[#f47321] text-white px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider mb-3">
                                            {cert.standard}
                                        </div>
                                        <h3 className="font-sans font-black text-base uppercase text-white leading-tight mb-4">
                                            {cert.name}
                                        </h3>
                                    </div>
                                    <div className="space-y-2 font-mono text-xs">
                                        <div className="flex justify-between gap-4 border-t border-gray-700 pt-3">
                                            <span className="text-gray-400 uppercase">{a.isoCertNo}</span>
                                            <span className="text-[#f47321] font-bold">{cert.certNo}</span>
                                        </div>
                                        <div className="flex justify-between gap-4">
                                            <span className="text-gray-400 uppercase">{a.isoValidUntil}</span>
                                            <span className="text-white font-bold">{cert.validUntil}</span>
                                        </div>
                                        <div className="flex justify-between gap-4">
                                            <span className="text-gray-400 uppercase">{a.isoIssuedBy}</span>
                                            <span className="text-white text-right">{a.isoIssuer}</span>
                                        </div>
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
