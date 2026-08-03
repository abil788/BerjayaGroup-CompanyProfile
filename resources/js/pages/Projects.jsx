import React, { useState, useEffect } from 'react';
import { useLang } from '../LangContext';

export default function Projects() {
    const { t } = useLang();
    const p = t.projects;

    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');

    // Read initial filter from URL query param (?status=ongoing)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('status') === 'ongoing') {
            setActiveFilter('Ongoing');
        }
    }, []);

    useEffect(() => {
        let isMounted = true;
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    const arr = Array.isArray(data) ? data : [];
                    setProjects(arr);
                    setLoading(false);
                }
            })
            .catch(err => { console.error(err); if (isMounted) setLoading(false); });
        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        applyFilter(activeFilter, projects);
    }, [projects, activeFilter]);

    const applyFilter = (filter, allProjects) => {
        if (filter === 'All') {
            setFilteredProjects(allProjects);
        } else if (filter === 'Ongoing') {
            setFilteredProjects(allProjects.filter(proj => proj.status === 'ongoing'));
        } else {
            setFilteredProjects(allProjects.filter(proj => proj.category === filter && proj.status !== 'ongoing'));
        }
    };

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        applyFilter(filter, projects);
        // Update URL without reload
        const url = new URL(window.location.href);
        if (filter === 'Ongoing') {
            url.searchParams.set('status', 'ongoing');
        } else {
            url.searchParams.delete('status');
        }
        window.history.replaceState(null, '', url.toString());
    };

    // Category keys: value in DB mapped to display labels from lang
    const categoryKeys = ['All', 'Process Plant', 'Civil & Architecture', 'Ongoing'];

    return (
        <div className="w-full">
            {/* Header Banner */}
            <section className="bg-[#2f3131] text-white py-20 px-6 md:px-16 border-b border-[#dfc0b2] relative">
                <div className="structural-grid absolute inset-0 opacity-10 pointer-events-none"></div>
                <div className="relative z-10 max-w-[1440px] mx-auto">
                    <span className="text-[#f47321] font-mono text-xs uppercase tracking-widest font-bold block mb-2">{p.badge}</span>
                    <h1 className="font-sans font-black text-4xl md:text-5xl uppercase italic tracking-tight">
                        {p.title}
                    </h1>
                    <p className="text-gray-300 font-sans text-base max-w-2xl mt-4 leading-relaxed">
                        {p.desc}
                    </p>
                    <div className="mt-6 flex gap-6 font-mono text-xs text-gray-400">
                        <span><span className="text-white font-bold">{projects.filter(p => p.status === 'completed').length}</span> Completed</span>
                        <span><span className="text-green-400 font-bold">{projects.filter(p => p.status === 'ongoing').length}</span> Ongoing</span>
                        <span><span className="text-[#f47321] font-bold">{projects.length}</span> Total</span>
                    </div>
                </div>
            </section>

            {/* Project Filters & Grid */}
            <section className="py-16 px-6 md:px-16 bg-[#f9f9f9] relative">
                <div className="max-w-[1440px] mx-auto">
                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-3 border-b border-[#dfc0b2]/40 pb-8 mb-12">
                        {categoryKeys.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleFilterChange(cat)}
                                className={`px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 border cursor-pointer flex items-center gap-2 ${
                                    activeFilter === cat
                                        ? cat === 'Ongoing'
                                            ? 'bg-green-700 text-white border-green-700 font-bold'
                                            : 'bg-[#1a1c1c] text-white border-[#1a1c1c] font-bold'
                                        : cat === 'Ongoing'
                                            ? 'bg-white text-green-700 border-green-400 hover:bg-green-50'
                                            : 'bg-white text-[#595f67] border-[#dfc0b2] hover:border-[#9e4300] hover:text-[#9e4300]'
                                }`}
                            >
                                {cat === 'Ongoing' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>}
                                {p.filterLabels[cat]}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1,2,3,4,5,6].map(i => <div key={i} className="h-80 bg-gray-200 animate-pulse border border-[#dfc0b2]"></div>)}
                        </div>
                    ) : filteredProjects.length === 0 ? (
                        <div className="text-center py-20 bg-white border border-[#dfc0b2] p-12">
                            <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">folder_open</span>
                            <p className="font-mono text-sm uppercase tracking-widest text-[#595f67]">{p.noProjects}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((project) => {
                                const isOngoing = project.status === 'ongoing';
                                return (
                                    <div key={project.id} className="bg-white border border-[#dfc0b2] flex flex-col group hover:border-[#9e4300] hover:shadow-lg transition-all duration-300">
                                        <div className="h-52 overflow-hidden relative">
                                            {project.image_url ? (
                                                <img
                                                    src={project.image_url}
                                                    alt={project.title}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                /* TODO: ganti foto proyek asli dari Company Profile PDF */
                                                <div className="w-full h-full bg-gradient-to-br from-[#2f3131] to-[#1a1c1c] flex flex-col items-center justify-center">
                                                    <div className="structural-grid absolute inset-0 opacity-10"></div>
                                                    <span className="material-symbols-outlined text-[#f47321] text-4xl z-10">domain</span>
                                                </div>
                                            )}
                                            <div className={`absolute top-4 left-4 text-white px-3 py-1 font-mono text-[10px] uppercase font-bold tracking-wider ${isOngoing ? 'bg-green-700' : 'bg-[#9e4300]'}`}>
                                                {isOngoing ? p.statusOngoing : project.category}
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start gap-3 mb-2">
                                                <h3 className="font-sans font-bold text-base uppercase text-[#1a1c1c] tracking-tight group-hover:text-[#9e4300] transition-colors leading-snug">{project.title}</h3>
                                                <span className={`font-mono text-xs font-semibold px-2 py-0.5 border shrink-0 ${isOngoing ? 'border-green-400 text-green-700 bg-green-50' : 'border-gray-300 text-gray-500'}`}>
                                                    {project.completion_year}
                                                </span>
                                            </div>
                                            <div className="border-t border-[#dfc0b2]/40 pt-4 mt-auto grid grid-cols-1 gap-2 font-mono text-[10px] text-gray-500">
                                                <div>
                                                    <p className="text-gray-400 uppercase">{p.clientLabel}</p>
                                                    <p className="text-[#1a1c1c] font-bold uppercase">{project.client}</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <p className="text-gray-400 uppercase">{p.locationLabel}</p>
                                                        <p className="text-[#1a1c1c] font-bold uppercase truncate">{project.location}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-400 uppercase">{p.budgetLabel}</p>
                                                        <p className="text-[#9e4300] font-bold">{project.budget}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
