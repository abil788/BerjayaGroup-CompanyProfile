import React from 'react';
import { useLang } from '../LangContext';

export default function FloatingLangSwitch() {
    const { lang, setLang } = useLang();

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center bg-[#1a1c1c]/90 text-white backdrop-blur-md p-1.5 border border-[#dfc0b2]/40 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:border-[#9e4300]">
            <div className="flex items-center pl-2 pr-1.5 text-[#f47321]">
                <span className="material-symbols-outlined text-[18px]">language</span>
            </div>
            <div className="flex gap-1 font-mono text-[11px]">
                <button
                    onClick={() => setLang('en')}
                    className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                        lang === 'en'
                            ? 'bg-[#9e4300] text-white shadow-md'
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    EN
                </button>
                <button
                    onClick={() => setLang('id')}
                    className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                        lang === 'id'
                            ? 'bg-[#9e4300] text-white shadow-md'
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    ID
                </button>
            </div>
        </div>
    );
}
