import React, { useState } from 'react';
import { useLang } from '../LangContext';

const WA_NUMBER = '6281234567890';

export default function Contact() {
    const { t } = useLang();
    const c = t.contact;

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [organization, setOrganization] = useState('');
    const [sectorIdx, setSectorIdx] = useState(0);
    const [scope, setScope] = useState('');
    const [budgetIdx, setBudgetIdx] = useState(0);
    const [timelineIdx, setTimelineIdx] = useState(0);
    const [referenceNumber, setReferenceNumber] = useState('');
    const [error, setError] = useState('');

    // DB-side sector values (always English)
    const sectorValues = ['Civil Works', 'Industrial', 'Commercial'];

    const waMessage = c.waMsg(
        fullName, email, organization,
        sectorValues[sectorIdx],
        scope,
        c.budgetOptions[budgetIdx],
        c.timelineOptions[timelineIdx]
    );
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    const handleNext = () => {
        if (!fullName || !email || !organization) { setError(c.errorBasic); return; }
        setError(''); setStep(2);
    };

    const handleBack = () => setStep(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!scope) { setError(c.errorScope); return; }
        setError(''); setLoading(true);
        try {
            const response = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    full_name: fullName, email, organization,
                    sector: sectorValues[sectorIdx],
                    scope,
                    budget: c.budgetOptions[budgetIdx],
                    timeline: c.timelineOptions[timelineIdx]
                })
            });
            const data = await response.json();
            if (response.ok) { setReferenceNumber(data.reference_number); setStep(3); window.open(waUrl, '_blank'); }
            else { setError(data.message || c.errorBasic); }
        } catch (err) {
            console.error('Submit error:', err);
            window.open(waUrl, '_blank'); setStep(3);
        } finally { setLoading(false); }
    };

    const handleReset = () => {
        setFullName(''); setEmail(''); setOrganization('');
        setSectorIdx(0); setScope(''); setBudgetIdx(0); setTimelineIdx(0);
        setReferenceNumber(''); setError(''); setStep(1);
    };

    return (
        <div className="w-full">
            {/* Header Banner */}
            <section className="bg-[#2f3131] text-white py-16 px-6 md:px-16 border-b border-[#dfc0b2] relative">
                <div className="structural-grid absolute inset-0 opacity-10 pointer-events-none"></div>
                <div className="relative z-10 max-w-[1440px] mx-auto">
                    <span className="text-[#f47321] font-mono text-xs uppercase tracking-widest font-bold block mb-2">{c.badge}</span>
                    <h1 className="font-sans font-black text-4xl md:text-5xl uppercase italic tracking-tight">
                        {c.title}
                    </h1>
                    <p className="text-gray-300 font-sans text-base max-w-2xl mt-4 leading-relaxed">
                        {c.desc}
                    </p>
                </div>
            </section>

            {/* Main Contact Section */}
            <section className="py-20 px-6 md:px-16 bg-[#f9f9f9] relative">
                <div className="structural-grid absolute inset-0 pointer-events-none opacity-5"></div>
                <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-12">

                    {/* Left Column */}
                    <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">

                        {/* Map card */}
                        <div className="border border-[#1a1c1c] p-6 bg-white relative group">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="font-sans font-bold text-lg uppercase tracking-tight text-[#1a1c1c]">{c.officeLocation}</h3>
                                    <p className="font-mono text-xs text-gray-400">{c.medanSumut}</p>
                                </div>
                                <span className="material-symbols-outlined text-[#9e4300] scale-125">foundation</span>
                            </div>
                            <div className="aspect-[21/9] w-full overflow-hidden border border-[#dfc0b2]">
                                <iframe
                                    src="https://www.google.com/maps?q=3.5410624,98.6385431&z=16&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Lokasi Kantor PT. Berjaya Group"
                                ></iframe>
                            </div>
                            <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-[#595f67] mt-6 pt-4 border-t border-[#dfc0b2]/40">
                                <div>
                                    <p className="text-[#1a1c1c] font-bold mb-1 uppercase">{c.office}</p>
                                    <p>Jl. Ngumban Surbakti No. 60, Sempakata<br />Medan Selayang, Kota Medan</p>
                                    <p className="mt-2">Jl. Dr. Mansyur No. 128, Medan Selayang</p>
                                </div>
                                <div>
                                    <p className="text-[#1a1c1c] font-bold mb-1 uppercase">{c.workshop}</p>
                                    <p>Jl. Besar Namorambe No. 30<br />Kabupaten Deli Serdang</p>
                                    <p className="mt-2">+62 61 822 7474<br />project@berjayagroup.co.id</p>
                                </div>
                            </div>
                        </div>

                        {/* SOP Sidebar */}
                        <div className="bg-[#2f3131] text-white p-8 border border-gray-700 flex flex-col gap-6 font-sans">
                            <h4 className="font-mono text-xs text-[#f47321] uppercase tracking-widest border-b border-gray-700 pb-4 font-bold">{c.sopTitle}</h4>
                            <ul className="flex flex-col gap-6 text-sm text-gray-300">
                                {[
                                    { title: c.sop1Title, desc: c.sop1Desc },
                                    { title: c.sop2Title, desc: c.sop2Desc },
                                    { title: c.sop3Title, desc: c.sop3Desc },
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 items-start">
                                        <div className="w-2.5 h-2.5 bg-[#f47321] shrink-0 mt-1.5"></div>
                                        <div>
                                            <p className="font-mono text-xs font-bold text-white uppercase">{item.title}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-6 border-t border-gray-700 mt-4">
                                <a href={waUrl} target="_blank" rel="noopener noreferrer"
                                    className="bg-[#9e4300] hover:bg-[#f47321] text-white p-4 font-mono text-center block transition-all">
                                    <p className="text-xs uppercase font-bold tracking-widest mb-1">{c.waLine}</p>
                                    <p className="text-lg font-black tracking-tighter">+62 812-3456-7890</p>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Multi-Step Form */}
                    <div className="col-span-12 lg:col-span-7">
                        <div className="bg-white border-2 border-[#1a1c1c] p-8 md:p-12 relative">

                            {/* Step Indicators */}
                            <div className="flex justify-between items-center border-b border-[#dfc0b2] pb-6 mb-8">
                                <div>
                                    <h2 className="font-sans font-black text-2xl uppercase tracking-tight text-[#1a1c1c]">{c.formTitle}</h2>
                                    <p className="font-mono text-[10px] text-gray-400 mt-1">{c.formRef}</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className={`w-8 h-1.5 transition-colors ${step >= 1 ? 'bg-[#9e4300]' : 'bg-[#e2e2e2]'}`}></div>
                                    <div className={`w-8 h-1.5 transition-colors ${step >= 2 ? 'bg-[#9e4300]' : 'bg-[#e2e2e2]'}`}></div>
                                    <div className={`w-8 h-1.5 transition-colors ${step >= 3 ? 'bg-[#9e4300]' : 'bg-[#e2e2e2]'}`}></div>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-sm text-red-700 font-mono">{error}</div>
                            )}

                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                                {/* Step 1 */}
                                {step === 1 && (
                                    <div className="flex flex-col gap-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="font-mono text-xs text-[#9e4300] uppercase font-bold">{c.labelFullName}</label>
                                                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder={c.placeholderFullName}
                                                    className="bg-transparent border-b border-[#595f67] p-3 text-sm focus:border-[#9e4300] outline-none transition-all font-sans" required />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="font-mono text-xs text-[#9e4300] uppercase font-bold">{c.labelEmail}</label>
                                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={c.placeholderEmail}
                                                    className="bg-transparent border-b border-[#595f67] p-3 text-sm focus:border-[#9e4300] outline-none transition-all font-sans" required />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-mono text-xs text-[#9e4300] uppercase font-bold">{c.labelOrg}</label>
                                            <input type="text" value={organization} onChange={e => setOrganization(e.target.value)} placeholder={c.placeholderOrg}
                                                className="bg-transparent border-b border-[#595f67] p-3 text-sm focus:border-[#9e4300] outline-none transition-all font-sans" required />
                                        </div>
                                        <div className="flex flex-col gap-4 pt-2">
                                            <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">{c.primarySector}</p>
                                            <div className="grid grid-cols-3 gap-3">
                                                {c.sectorLabels.map((sec, idx) => (
                                                    <button key={idx} type="button" onClick={() => setSectorIdx(idx)}
                                                        className={`border p-3.5 font-mono text-[10px] uppercase transition-all tracking-wider cursor-pointer ${sectorIdx === idx ? 'bg-[#1a1c1c] text-white border-[#1a1c1c]' : 'bg-white text-[#595f67] border-[#dfc0b2] hover:border-[#9e4300]'
                                                            }`}>
                                                        {sec}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-end pt-6 border-t border-[#dfc0b2]/40 mt-4">
                                            <button type="button" onClick={handleNext}
                                                className="bg-[#f47321] text-white font-mono text-xs uppercase tracking-widest font-bold px-8 py-4 hover:bg-[#9e4300] transition-colors cursor-pointer">
                                                {c.btnContinue}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2 */}
                                {step === 2 && (
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="font-mono text-xs text-[#9e4300] uppercase font-bold">{c.labelScope}</label>
                                            <textarea value={scope} onChange={e => setScope(e.target.value)} rows="6" placeholder={c.placeholderScope}
                                                className="bg-[#f3f3f3] border border-[#dfc0b2] p-4 text-sm focus:border-[#9e4300] outline-none transition-all font-sans resize-none" required />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="font-mono text-xs text-[#9e4300] uppercase font-bold">{c.labelBudget}</label>
                                                <select value={budgetIdx} onChange={e => setBudgetIdx(Number(e.target.value))}
                                                    className="bg-transparent border-b border-[#595f67] p-3 text-sm focus:border-[#9e4300] outline-none font-mono">
                                                    {c.budgetOptions.map((opt, i) => <option key={i} value={i}>{opt}</option>)}
                                                </select>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="font-mono text-xs text-[#9e4300] uppercase font-bold">{c.labelTimeline}</label>
                                                <select value={timelineIdx} onChange={e => setTimelineIdx(Number(e.target.value))}
                                                    className="bg-transparent border-b border-[#595f67] p-3 text-sm focus:border-[#9e4300] outline-none font-mono">
                                                    {c.timelineOptions.map((opt, i) => <option key={i} value={i}>{opt}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center pt-6 border-t border-[#dfc0b2]/40 mt-4">
                                            <button type="button" onClick={handleBack}
                                                className="text-[#595f67] hover:text-[#9e4300] font-mono text-xs uppercase tracking-widest flex items-center gap-1 cursor-pointer">
                                                <span className="material-symbols-outlined text-sm">arrow_back</span> {c.btnBack}
                                            </button>
                                            <button type="submit" disabled={loading}
                                                className="bg-[#9e4300] text-white font-mono text-xs uppercase tracking-widest font-bold px-8 py-4 hover:bg-[#f47321] active:scale-95 transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2">
                                                <span className="material-symbols-outlined text-base">chat</span>
                                                {loading ? c.btnSubmitting : c.btnSubmit}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Success */}
                                {step === 3 && (
                                    <div className="flex flex-col items-center text-center py-10 gap-6">
                                        <div className="w-20 h-20 bg-[#9e4300] flex items-center justify-center border-r-4 border-b-4 border-white shadow-md animate-bounce">
                                            <span className="material-symbols-outlined text-white text-4xl">check_circle</span>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-sans font-black text-2xl uppercase tracking-tight text-[#1a1c1c]">{c.successTitle}</h3>
                                            {referenceNumber && (
                                                <div className="inline-block bg-[#2f3131] text-[#f47321] border border-gray-700 px-4 py-2 font-mono text-sm uppercase tracking-widest font-bold">
                                                    Ref: {referenceNumber}
                                                </div>
                                            )}
                                            <p className="text-gray-600 font-sans text-sm max-w-md mx-auto pt-4 leading-relaxed">{c.successDesc}</p>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <a href={waUrl} target="_blank" rel="noopener noreferrer"
                                                className="bg-[#9e4300] hover:bg-[#f47321] text-white px-8 py-3.5 font-mono text-xs uppercase tracking-widest font-bold transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer">
                                                <span className="material-symbols-outlined text-sm">open_in_new</span>
                                                {c.btnOpenWa}
                                            </a>
                                            <button type="button" onClick={handleReset}
                                                className="border-2 border-[#1a1c1c] px-8 py-3.5 font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#1a1c1c] hover:text-white transition-all active:scale-95 cursor-pointer">
                                                {c.btnNewInquiry}
                                            </button>
                                        </div>
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
