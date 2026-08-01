import React, { useState, useEffect, useRef } from 'react';
import { navigate } from '../AppComponent';
import { useLang } from '../LangContext';

export default function Home() {
    const { t } = useLang();
    const h = t.home;

    const [services, setServices] = useState([]);
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const shaderCanvasRef = useRef(null);

    useEffect(() => {
        let isMounted = true;
        Promise.all([
            fetch('/api/services').then((res) => res.json()),
            fetch('/api/projects').then((res) => res.json())
        ]).then(([servicesData, projectsData]) => {
            if (isMounted) {
                setServices(Array.isArray(servicesData) ? servicesData.slice(0, 3) : []);
                setFeaturedProjects(Array.isArray(projectsData) ? projectsData.filter(p => p.featured) : []);
                setLoading(false);
            }
        }).catch((err) => {
            console.error('Error fetching home data:', err);
            if (isMounted) setLoading(false);
        });
        return () => { isMounted = false; };
    }, []);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (loading) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('opacity-100', 'translate-y-0');
                        entry.target.classList.remove('opacity-0', 'translate-y-12');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((el) => observer.observe(el));
        return () => { animatedElements.forEach((el) => observer.unobserve(el)); };
    }, [loading]);

    useEffect(() => {
        const canvas = shaderCanvasRef.current;
        if (!canvas) return;
        let animationFrameId;
        const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false }) || 
                   canvas.getContext('experimental-webgl', { alpha: true, premultipliedAlpha: false });
        if (!gl) return;
        const vs = `
            attribute vec2 position;
            varying vec2 v_texCoord;
            void main() {
                v_texCoord = position * 0.5 + 0.5;
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;
        const fs = `
            precision highp float;
            uniform float u_time;
            uniform vec2 u_resolution;
            varying vec2 v_texCoord;
            float grid(vec2 uv, float res) {
                vec2 grid = fract(uv * res);
                return 1.0 - smoothstep(0.0, 0.05, min(grid.x, grid.y));
            }
            void main() {
                vec2 uv = v_texCoord;
                uv.x *= u_resolution.x / u_resolution.y;
                uv += vec2(u_time * 0.015, u_time * 0.008);
                float g1 = grid(uv, 12.0) * 0.3;
                float g2 = grid(uv, 3.0) * 0.1;
                float strength = g1 + g2;
                vec3 gridColor = vec3(0.95, 0.45, 0.13);
                gl_FragColor = vec4(gridColor, strength);
            }
        `;
        const createShader = (gl, type, source) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        };
        const program = gl.createProgram();
        gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vs));
        gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fs));
        gl.linkProgram(program);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
        const posLoc = gl.getAttribLocation(program, 'position');
        const timeLoc = gl.getUniformLocation(program, 'u_time');
        const resLoc = gl.getUniformLocation(program, 'u_resolution');
        const renderShader = (time) => {
            if (!shaderCanvasRef.current) return;
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(program);
            gl.enableVertexAttribArray(posLoc);
            gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
            gl.uniform1f(timeLoc, time * 0.001);
            gl.uniform2f(resLoc, canvas.width, canvas.height);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(renderShader);
        };
        animationFrameId = requestAnimationFrame(renderShader);
        return () => { cancelAnimationFrame(animationFrameId); };
    }, []);

    return (
        <div className="w-full">
            {/* Hero */}
            <header className="relative min-h-[85vh] lg:min-h-[90vh] w-full flex items-center overflow-hidden bg-[#1a1c1c]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1a1c1c]/45 to-[#1a1c1c]/85 z-10"></div>
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-[10s] hover:scale-105" 
                        style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA5eXZCjxBnlR73UbAkt7Nb9FuIO2C_jz9IrqBrDpn35t8wAqM9WI0DOGzHLgtY8Lso7vBFW1ya3FxLCRc2UFJxg0LFuqdLzA6GubH6digvnBeVNTQktCI3FBRrh3SZba27EplZOEkkqChur8Rkl0V7yJ-9c4GAVYTm-hmRNJcB02fcqay3OemsPMdUBU8eraWRNG7QLb3EB0RO9oVtKK42PpSNCmK19HcvotvYFSiFlmF2dQQTSKx-Cg')` }}>
                    </div>
                </div>
                <canvas ref={shaderCanvasRef} id="hero-shader" className="absolute inset-0 w-full h-full pointer-events-none opacity-45 z-20" />
                <div className="relative z-30 w-full max-w-[1440px] mx-auto px-6 md:px-16 py-24 lg:py-32">
                    <div className={`max-w-3xl space-y-8 transition-all duration-[1000ms] ease-out transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="inline-flex items-center gap-2 bg-[#f47321]/90 text-white px-4 py-2 border-l-2 border-white">
                            <span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
                            <span className="font-mono text-xs uppercase tracking-widest font-bold">{h.heroBadge}</span>
                        </div>
                        <h1 className="text-white font-sans font-black text-5xl md:text-7xl leading-[1.1] uppercase italic">
                            {h.heroTitle}
                        </h1>
                        <p className="text-gray-300 font-sans text-lg leading-relaxed max-w-2xl">
                            {h.heroDesc}
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button onClick={() => navigate('/projects')} className="bg-[#f47321] text-white px-10 py-5 font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#9e4300] active:scale-95 transition-all duration-200 cursor-pointer">
                                {h.heroViewProjects}
                            </button>
                            <button onClick={() => navigate('/contact')} className="border-2 border-white text-white px-10 py-5 font-mono text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-[#1a1c1c] active:scale-95 transition-all duration-200 cursor-pointer">
                                {h.heroConsultation}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 w-1/3 h-full safety-grid-line opacity-5 pointer-events-none z-10"></div>
            </header>

            {/* Metrics Banner */}
            <section className="bg-[#2f3131] py-12 border-t-4 border-[#9e4300]">
                <div className="max-w-[1440px] mx-auto px-6 md:px-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="space-y-1 border-r border-gray-700/50 last:border-0">
                            <h2 className="text-white font-sans font-black text-3xl md:text-5xl">250+</h2>
                            <p className="text-[#f47321] font-mono text-xs uppercase tracking-wider font-bold">{h.metricProjects}</p>
                        </div>
                        <div className="space-y-1 border-r border-gray-700/50 last:border-0">
                            <h2 className="text-white font-sans font-black text-3xl md:text-5xl">15M</h2>
                            <p className="text-[#f47321] font-mono text-xs uppercase tracking-wider font-bold">{h.metricHours}</p>
                        </div>
                        <div className="space-y-1 border-r border-gray-700/50 last:border-0">
                            <h2 className="text-white font-sans font-black text-3xl md:text-5xl">45</h2>
                            <p className="text-[#f47321] font-mono text-xs uppercase tracking-wider font-bold">{h.metricPatents}</p>
                        </div>
                        <div className="space-y-1 last:border-0">
                            <h2 className="text-white font-sans font-black text-3xl md:text-5xl">0.82</h2>
                            <p className="text-[#f47321] font-mono text-xs uppercase tracking-wider font-bold">{h.metricSafety}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-20 px-6 md:px-16 bg-[#f9f9f9] relative overflow-hidden">
                <div className="structural-grid absolute inset-0 pointer-events-none opacity-5"></div>
                <div className="max-w-[1440px] mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#dfc0b2] pb-8 animate-on-scroll opacity-0 translate-y-12 transition-all duration-[800ms] ease-out">
                        <div>
                            <span className="text-[#9e4300] font-mono text-xs uppercase tracking-widest font-bold block mb-2">{h.servicesBadge}</span>
                            <h2 className="font-sans font-black text-3xl uppercase tracking-tight text-[#1a1c1c]">{h.servicesTitle}</h2>
                        </div>
                        <button onClick={() => navigate('/services')} className="mt-4 md:mt-0 text-[#9e4300] font-mono text-xs uppercase font-bold tracking-widest flex items-center gap-2 hover:text-[#f47321] transition-all cursor-pointer">
                            {h.servicesAll} <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                        </button>
                    </div>
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1,2,3].map(i => <div key={i} className="h-96 bg-gray-200 animate-pulse border border-[#dfc0b2]"></div>)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <div key={service.id} style={{ transitionDelay: `${index*150}ms` }} className="bg-white border border-[#dfc0b2] flex flex-col group hover:border-[#9e4300] hover:shadow-lg transition-all duration-[800ms] ease-out animate-on-scroll opacity-0 translate-y-12">
                                    <div className="h-60 overflow-hidden relative">
                                        <img src={service.image_url} alt={service.title} loading="lazy" decoding="async" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                                        <div className="absolute top-4 left-4 bg-[#9e4300] text-white px-3 py-1 font-mono text-xs uppercase font-semibold">{service.category}</div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <h3 className="font-sans font-bold text-xl uppercase text-[#1a1c1c] mb-2">{service.title}</h3>
                                        <p className="text-gray-600 font-sans text-sm mb-6 flex-grow leading-relaxed">{service.description}</p>
                                        <div className="border-t border-[#dfc0b2]/40 pt-4 flex justify-between items-center text-xs font-mono text-gray-400">
                                            <span>SERVICE ID: {service.service_id}</span>
                                            <span className="material-symbols-outlined text-[#9e4300]">engineering</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Featured Projects */}
            <section className="py-20 px-6 md:px-16 bg-[#e2e2e2]">
                <div className="max-w-[1440px] mx-auto">
                    <div className="mb-16 border-l-8 border-[#9e4300] pl-6 animate-on-scroll opacity-0 translate-y-12 transition-all duration-[800ms] ease-out">
                        <span className="text-[#9e4300] font-mono text-xs uppercase tracking-widest font-bold">{h.featuredBadge}</span>
                        <h2 className="font-sans font-black text-3xl md:text-4xl uppercase text-[#1a1c1c] mt-2">{h.featuredTitle}</h2>
                    </div>
                    {loading ? (
                        <div className="h-[500px] bg-gray-300 animate-pulse"></div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {featuredProjects.slice(0, 2).map((project, idx) => {
                                const isLarge = idx === 0;
                                return (
                                    <div key={project.id} style={{ transitionDelay: `${idx*200}ms` }} className={`group relative overflow-hidden h-[450px] lg:h-[550px] border border-[#dfc0b2] transition-all duration-[1000ms] ease-out animate-on-scroll opacity-0 translate-y-12 ${isLarge ? 'lg:col-span-8' : 'lg:col-span-4'}`}>
                                        {/* Background image via CSS for featured project cards */}
                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] group-hover:scale-110" style={{ backgroundImage: `url('${project.image_url}')` }}></div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white flex flex-col justify-end h-full w-full">
                                            <div className="flex gap-3 mb-4 text-xs font-mono">
                                                <span className="bg-[#f47321] px-3 py-1 font-bold uppercase">{project.category}</span>
                                                <span className="bg-[#1a1c1c]/80 border border-gray-600 px-3 py-1 uppercase">{h.completedLabel} {project.completion_year}</span>
                                            </div>
                                            <h3 className="font-sans font-extrabold text-2xl md:text-3xl uppercase tracking-tight mb-2">{project.title}</h3>
                                            <p className="text-gray-300 font-sans text-sm max-w-lg mb-6 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">{project.description}</p>
                                            <div>
                                                <button onClick={() => navigate('/projects')} className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-widest border-b-2 border-[#f47321] pb-1 hover:text-[#f47321] transition-all cursor-pointer">
                                                    {h.featuredCaseStudy} <span className="material-symbols-outlined text-xs">north_east</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-[#1a1c1c] text-white text-center relative overflow-hidden">
                <div className="structural-grid absolute inset-0 opacity-15 pointer-events-none"></div>
                <div className="relative z-10 max-w-3xl mx-auto px-6 animate-on-scroll opacity-0 translate-y-12 transition-all duration-[1000ms] ease-out">
                    <h2 className="font-sans font-black text-4xl md:text-5xl uppercase italic mb-6">{h.ctaTitle}</h2>
                    <p className="font-sans text-gray-300 text-lg mb-10 leading-relaxed">{h.ctaDesc}</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button onClick={() => navigate('/contact')} className="bg-[#f47321] text-white font-mono text-xs uppercase tracking-widest font-bold px-8 py-5 hover:bg-[#9e4300] active:scale-95 transition-all cursor-pointer">
                            {h.ctaConsultation}
                        </button>
                        <button onClick={() => navigate('/projects')} className="border-2 border-gray-500 text-white font-mono text-xs uppercase tracking-widest font-bold px-8 py-5 hover:bg-white hover:text-[#1a1c1c] active:scale-95 transition-all cursor-pointer">
                            {h.ctaPortfolio}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
