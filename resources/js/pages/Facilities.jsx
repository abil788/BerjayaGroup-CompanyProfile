import React from 'react';
import { useLang } from '../LangContext';

const equipment = [
    { name: 'Workshop',                 qty: '2 unit',   capacity: '8.000 m²',             brand: '-',                              year: '2004' },
    { name: 'Rough Terrain Crane',      qty: '1 unit',   capacity: '90 ton',               brand: 'Sany',                           year: '2023' },
    { name: 'All Terrain Crane',        qty: '2 unit',   capacity: '55 ton',               brand: 'Tadano',                         year: '2008' },
    { name: 'Rough Terrain Crane',      qty: '2 unit',   capacity: '50 ton',               brand: 'Tadano / Kato',                  year: '2010' },
    { name: 'Rough Terrain Crane',      qty: '1 unit',   capacity: '35 ton',               brand: 'Kobelco',                        year: '2010' },
    { name: 'Rough Terrain Crane',      qty: '3 unit',   capacity: '25 ton',               brand: 'Kobelco / Kato',                 year: '2010' },
    { name: 'Dump Truck',               qty: '2 unit',   capacity: '4–10 ton',             brand: 'Mitsubishi',                     year: '2003 / 1996' },
    { name: 'Buldozer',                 qty: '1 unit',   capacity: 'D-6',                  brand: 'Caterpillar',                    year: '2008 / 2010' },
    { name: 'Bomag',                    qty: '2 unit',   capacity: '-',                    brand: 'Bomag – Sakai',                  year: '2010' },
    { name: 'Excavator',                qty: '9 unit',   capacity: 'PC200 – PC78',         brand: 'Hitachi',                        year: '2018' },
    { name: 'Foko Hiab Crane',          qty: '5 unit',   capacity: '16T–12T–10T–5T–3T',   brand: 'Nissan / Mitsubishi / Tadano',   year: '2017' },
    { name: 'Hydraulic Jacking',        qty: '220 set',  capacity: '12 ton',               brand: 'Bigging',                        year: '2019–2023' },
    { name: 'Power Pack',               qty: '10 unit',  capacity: '10 HP & 15 HP',        brand: 'Bigging',                        year: '2019–2023' },
    { name: 'Air Compressor & Act',     qty: '4 unit',   capacity: '10 bar',               brand: 'Airman PSD 390',                 year: '2013 / 2016' },
    { name: 'Generator Set',            qty: '8 unit',   capacity: '100–450 kVA',          brand: 'Mitsubishi / Cummins',           year: '2015 / 2017' },
    { name: 'Banding Plate Machine',    qty: '3 unit',   capacity: 'Kap 25 mm',           brand: 'China',                          year: '2017 / 2018' },
    { name: 'Welding Machines & Tools', qty: '60 set',   capacity: 'Varian',               brand: 'Varian',                         year: '2017–2019' },
    { name: 'Survey Equipment & Tools', qty: '10 set',   capacity: 'Varian',               brand: 'Varian',                         year: '2014–2018' },
];

export default function Facilities() {
    const { t } = useLang();
    const f = t.facilities;

    return (
        <div className="w-full">
            {/* Header Banner */}
            <section className="bg-[#2f3131] text-white py-16 px-6 md:px-16 border-b border-[#dfc0b2] relative overflow-hidden">
                <div className="structural-grid absolute inset-0 opacity-10 pointer-events-none"></div>
                <div className="relative z-10 max-w-[1440px] mx-auto">
                    <span className="text-[#f47321] font-mono text-xs uppercase tracking-widest font-bold block mb-2">{f.badge}</span>
                    <h1 className="font-sans font-black text-4xl md:text-5xl uppercase italic tracking-tight">
                        {f.title}
                    </h1>
                    <p className="text-gray-300 font-sans text-base max-w-2xl mt-4 leading-relaxed">
                        {f.desc}
                    </p>
                </div>
            </section>

            {/* Workshop Section */}
            <section className="py-20 px-6 md:px-16 bg-[#f9f9f9] relative overflow-hidden">
                <div className="structural-grid absolute inset-0 pointer-events-none opacity-5"></div>
                <div className="max-w-[1440px] mx-auto relative z-10">

                    <div className="mb-12 border-l-8 border-[#9e4300] pl-6">
                        <span className="text-[#9e4300] font-mono text-xs uppercase tracking-widest font-bold">{f.workshopBadge}</span>
                        <h2 className="font-sans font-black text-3xl md:text-4xl uppercase text-[#1a1c1c] mt-2">{f.workshopTitle}</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
                        {/* Workshop Image */}
                        <div className="relative h-80 lg:h-auto overflow-hidden border-2 border-[#dfc0b2] bg-[#2f3131] flex items-center justify-center group">
                            {/* TODO: ganti foto workshop asli — simpan di public/workshop.jpg */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#2f3131] to-[#1a1c1c] flex flex-col items-center justify-center gap-4">
                                <div className="structural-grid absolute inset-0 opacity-20"></div>
                                <span className="material-symbols-outlined text-[#f47321] text-7xl relative z-10">factory</span>
                                <p className="text-gray-400 font-mono text-xs uppercase tracking-widest relative z-10">Workshop Facility Photo</p>
                                <p className="text-gray-600 font-mono text-[10px] relative z-10">TODO: Replace with actual workshop photo</p>
                            </div>
                            <div className="absolute inset-0 border-l-4 border-[#f47321] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </div>

                        {/* Workshop Details */}
                        <div className="flex flex-col gap-6">
                            <p className="font-sans text-gray-700 text-base leading-relaxed">{f.workshopDesc}</p>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { icon: 'apartment', label: 'Units', value: '2 Unit' },
                                    { icon: 'straighten', label: 'Total Area', value: '8.000 m²' },
                                    { icon: 'calendar_month', label: 'Operational Since', value: '2004' },
                                    { icon: 'verified', label: 'Ownership', value: 'Company Owned' },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white border border-[#dfc0b2] p-5 flex items-start gap-3 group hover:border-[#9e4300] hover:shadow-md transition-all duration-300">
                                        <span className="material-symbols-outlined text-[#9e4300] text-xl mt-0.5">{stat.icon}</span>
                                        <div>
                                            <p className="font-mono text-[9px] uppercase text-gray-400 tracking-widest">{stat.label}</p>
                                            <p className="font-sans font-black text-xl text-[#1a1c1c] tracking-tight leading-none mt-1">{stat.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Workshop note badge */}
                            <div className="bg-[#2f3131] border-l-4 border-[#f47321] p-4 font-mono text-xs text-gray-300 uppercase tracking-widest">
                                {f.workshopNote}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Equipment List Section */}
            <section className="py-20 px-6 md:px-16 bg-[#e2e2e2] relative">
                <div className="max-w-[1440px] mx-auto">

                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#9e4300]/40 pb-8">
                        <div>
                            <span className="text-[#9e4300] font-mono text-xs uppercase tracking-widest font-bold block mb-2">{f.equipmentBadge}</span>
                            <h2 className="font-sans font-black text-3xl uppercase tracking-tight text-[#1a1c1c]">{f.equipmentTitle}</h2>
                            <p className="font-sans text-gray-600 text-sm mt-3 max-w-xl">{f.equipmentDesc}</p>
                        </div>
                        <div className="mt-4 md:mt-0 bg-[#9e4300] text-white px-5 py-3 font-mono text-xs uppercase tracking-widest font-bold">
                            {equipment.length} Types of Equipment
                        </div>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block bg-white border border-[#dfc0b2] overflow-x-auto shadow-sm">
                        <table className="w-full text-left font-sans text-xs">
                            <thead className="bg-[#1a1c1c] text-white font-mono text-[10px] uppercase tracking-wider">
                                <tr>
                                    <th className="p-4 w-12">{f.colNo}</th>
                                    <th className="p-4">{f.colName}</th>
                                    <th className="p-4">{f.colQty}</th>
                                    <th className="p-4">{f.colCapacity}</th>
                                    <th className="p-4">{f.colBrand}</th>
                                    <th className="p-4">{f.colYear}</th>
                                    <th className="p-4">{f.colStatus}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#dfc0b2]/60 text-[#1a1c1c]">
                                {equipment.map((item, index) => (
                                    <tr key={index} className="hover:bg-[#f9f9f9] transition-colors group">
                                        <td className="p-4 font-mono text-[#9e4300] font-bold">{String(index + 1).padStart(2, '0')}</td>
                                        <td className="p-4 font-bold">{item.name}</td>
                                        <td className="p-4 font-mono text-gray-600">{item.qty}</td>
                                        <td className="p-4 font-mono text-gray-600">{item.capacity}</td>
                                        <td className="p-4 text-gray-700">{item.brand}</td>
                                        <td className="p-4 font-mono text-gray-500">{item.year}</td>
                                        <td className="p-4">
                                            <span className="inline-block bg-[#9e4300]/10 border border-[#9e4300]/30 text-[#9e4300] px-2 py-1 font-mono text-[9px] uppercase font-bold tracking-wide">
                                                Company Owned
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">
                        {equipment.map((item, index) => (
                            <div key={index} className="bg-white border border-[#dfc0b2] p-5 shadow-sm">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <span className="font-mono text-[#9e4300] text-[10px] font-bold">{String(index + 1).padStart(2, '0')}</span>
                                        <h3 className="font-sans font-bold text-base text-[#1a1c1c]">{item.name}</h3>
                                        <p className="font-mono text-xs text-gray-500 mt-0.5">{item.brand}</p>
                                    </div>
                                    <span className="bg-[#9e4300]/10 border border-[#9e4300]/30 text-[#9e4300] px-2 py-1 font-mono text-[9px] uppercase font-bold tracking-wide shrink-0">
                                        Owned
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#dfc0b2]/40">
                                    <div>
                                        <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">{f.colQty}</p>
                                        <p className="font-mono text-xs font-bold text-[#1a1c1c] mt-0.5">{item.qty}</p>
                                    </div>
                                    <div>
                                        <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">{f.colCapacity}</p>
                                        <p className="font-mono text-xs font-bold text-[#1a1c1c] mt-0.5">{item.capacity}</p>
                                    </div>
                                    <div>
                                        <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">{f.colYear}</p>
                                        <p className="font-mono text-xs font-bold text-[#1a1c1c] mt-0.5">{item.year}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-[#1a1c1c] text-white text-center relative overflow-hidden">
                <div className="structural-grid absolute inset-0 opacity-15 pointer-events-none"></div>
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <h2 className="font-sans font-black text-3xl md:text-4xl uppercase italic mb-4">
                        Need Our Equipment for Your Project?
                    </h2>
                    <p className="font-sans text-gray-300 text-base mb-8 leading-relaxed">
                        Our fleet of owned heavy equipment is available for deployment to your project site. Contact us for availability and mobilization planning.
                    </p>
                    <a
                        href="/contact"
                        onClick={e => { e.preventDefault(); window.history.pushState(null, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')); }}
                        className="inline-block bg-[#f47321] text-white font-mono text-xs uppercase tracking-widest font-bold px-10 py-5 hover:bg-[#9e4300] active:scale-95 transition-all cursor-pointer"
                    >
                        Request a Quote
                    </a>
                </div>
            </section>
        </div>
    );
}
