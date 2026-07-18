import React, { useState, useEffect } from 'react';
import { navigate } from '../AppComponent';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        let isMounted = true;
        fetch('/api/projects')
            .then((res) => res.json())
            .then((data) => {
                if (isMounted) {
                    setProjects(data);
                    setFilteredProjects(data);
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

    // Handle filter selection
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        if (filter === 'All') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(p => p.category.toLowerCase() === filter.toLowerCase()));
        }
    };

    const categories = ['All', 'Industrial', 'Civil', 'Commercial'];

    return (
        <div className="w-full">
            {/* Header Banner */}
            <section className="bg-[#2f3131] text-white py-20 px-6 md:px-16 border-b border-[#dfc0b2] relative">
                <div className="structural-grid absolute inset-0 opacity-10 pointer-events-none"></div>
                <div className="relative z-10 max-w-[1440px] mx-auto">
                    <span className="text-[#f47321] font-mono text-xs uppercase tracking-widest font-bold block mb-2">Portfolio Showcase</span>
                    <h1 className="font-sans font-black text-4xl md:text-5xl uppercase italic tracking-tight">
                        Civil & Industrial Builds
                    </h1>
                    <p className="text-gray-300 font-sans text-base max-w-2xl mt-4 leading-relaxed">
                        Explore our engineering execution records. From hydroelectric dams to metropolitan overpasses and commercial sky towers, we build structures that stand the test of time.
                    </p>
                </div>
            </section>

            {/* Project Filters & Grid */}
            <section className="py-16 px-6 md:px-16 bg-[#f9f9f9] relative">
                <div className="max-w-[1440px] mx-auto">
                    {/* Category Filter Controls */}
                    <div className="flex flex-wrap gap-4 border-b border-[#dfc0b2]/40 pb-8 mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleFilterChange(cat)}
                                className={`px-6 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                                    activeFilter === cat
                                        ? 'bg-[#1a1c1c] text-white border-[#1a1c1c] font-bold'
                                        : 'bg-white text-[#595f67] border-[#dfc0b2] hover:border-[#9e4300] hover:text-[#9e4300]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-96 bg-gray-200 animate-pulse border border-[#dfc0b2]"></div>
                            ))}
                        </div>
                    ) : filteredProjects.length === 0 ? (
                        <div className="text-center py-20 bg-white border border-[#dfc0b2] p-12">
                            <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">folder_open</span>
                            <p className="font-mono text-sm uppercase tracking-widest text-[#595f67]">No Projects Found in this category</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((project) => (
                                <div 
                                    key={project.id}
                                    className="bg-white border border-[#dfc0b2] flex flex-col group hover:border-[#9e4300] hover:shadow-lg transition-all duration-300"
                                >
                                    {/* Image with overlay info */}
                                    <div className="h-64 overflow-hidden relative">
                                        <img 
                                            src={project.image_url} 
                                            alt={project.title} 
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4 bg-[#9e4300] text-white px-3 py-1 font-mono text-[10px] uppercase font-bold tracking-wider">
                                            {project.category}
                                        </div>
                                        <div className="absolute bottom-4 right-4 bg-black/85 text-white border border-gray-700 px-3 py-1 font-mono text-[10px] uppercase">
                                            BUDGET: {project.budget}
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start gap-4 mb-2">
                                            <h3 className="font-sans font-bold text-xl uppercase text-[#1a1c1c] tracking-tight group-hover:text-[#9e4300] transition-colors">
                                                {project.title}
                                            </h3>
                                            <span className="font-mono text-xs font-semibold bg-gray-150 px-2 py-0.5 border border-gray-300 text-gray-500">
                                                {project.completion_year}
                                            </span>
                                        </div>
                                        
                                        <p className="text-gray-600 font-sans text-sm leading-relaxed mb-6 flex-grow">
                                            {project.description}
                                        </p>

                                        {/* Spec Grid */}
                                        <div className="border-t border-[#dfc0b2]/40 pt-4 grid grid-cols-2 gap-4 font-mono text-[10px] text-gray-500">
                                            <div>
                                                <p className="text-gray-400 uppercase">CLIENT</p>
                                                <p className="text-[#1a1c1c] font-bold uppercase truncate">{project.client}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400 uppercase">LOCATION</p>
                                                <p className="text-[#1a1c1c] font-bold uppercase truncate">{project.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
