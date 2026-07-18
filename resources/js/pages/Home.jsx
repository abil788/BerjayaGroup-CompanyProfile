import React, { useState, useEffect, useRef } from 'react';
import { navigate } from '../AppComponent';

export default function Home() {
    const [services, setServices] = useState([]);
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const shaderCanvasRef = useRef(null);
    const threeContainerRef = useRef(null);

    // Fetch initial data
    useEffect(() => {
        let isMounted = true;
        
        Promise.all([
            fetch('/api/services').then((res) => res.json()),
            fetch('/api/projects').then((res) => res.json())
        ]).then(([servicesData, projectsData]) => {
            if (isMounted) {
                setServices(servicesData.slice(0, 3));
                setFeaturedProjects(projectsData.filter(p => p.featured));
                setLoading(false);
            }
        }).catch((err) => {
            console.error('Error fetching home data:', err);
            if (isMounted) setLoading(false);
        });

        return () => {
            isMounted = false;
        };
    }, []);

    // 1. WebGL Background Shader effect
    useEffect(() => {
        const canvas = shaderCanvasRef.current;
        if (!canvas) return;

        let animationFrameId;
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
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
                
                // Slow cinematic pan
                uv += vec2(u_time * 0.02, u_time * 0.01);
                
                float g1 = grid(uv, 10.0) * 0.3;
                float g2 = grid(uv, 2.0) * 0.1;
                
                vec3 color = mix(vec3(0.05, 0.07, 0.1), vec3(0.95, 0.45, 0.13), (g1 + g2));
                gl_FragColor = vec4(color, 1.0);
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
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);

        const posLoc = gl.getAttribLocation(program, 'position');
        const timeLoc = gl.getUniformLocation(program, 'u_time');
        const resLoc = gl.getUniformLocation(program, 'u_resolution');

        const renderShader = (time) => {
            if (!shaderCanvasRef.current) return;
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.useProgram(program);
            gl.enableVertexAttribArray(posLoc);
            gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
            gl.uniform1f(timeLoc, time * 0.001);
            gl.uniform2f(resLoc, canvas.width, canvas.height);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(renderShader);
        };

        animationFrameId = requestAnimationFrame(renderShader);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // 2. Three.js rotating 3D I-Beam effect
    useEffect(() => {
        const container = threeContainerRef.current;
        if (!container || !window.THREE) return;

        let animationFrameId;
        const width = container.clientWidth || 400;
        const height = container.clientHeight || 450;

        const THREE = window.THREE;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const group = new THREE.Group();

        // Create a desaturated safety-orange mesh material
        const beamMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xf47321, 
            specular: 0x555555, 
            shininess: 30 
        });

        // Top Flange
        const topFlange = new THREE.Mesh(new THREE.BoxGeometry(4, 0.2, 1.2), beamMaterial);
        topFlange.position.y = 1;
        group.add(topFlange);

        // Bottom Flange
        const bottomFlange = new THREE.Mesh(new THREE.BoxGeometry(4, 0.2, 1.2), beamMaterial);
        bottomFlange.position.y = -1;
        group.add(bottomFlange);

        // Vertical Web
        const web = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2, 0.8), beamMaterial);
        group.add(web);

        scene.add(group);

        // Directional and ambient light sources
        const light1 = new THREE.DirectionalLight(0xffffff, 1.2);
        light1.position.set(5, 5, 5);
        scene.add(light1);
        
        const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
        light2.position.set(-5, -5, 5);
        scene.add(light2);

        scene.add(new THREE.AmbientLight(0x404040, 1.5));

        camera.position.z = 8;

        const animateBeam = () => {
            group.rotation.y += 0.005;
            group.rotation.x = Math.sin(Date.now() * 0.0005) * 0.2;
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animateBeam);
        };

        animateBeam();

        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            // Dispose geometries and materials
            topFlange.geometry.dispose();
            bottomFlange.geometry.dispose();
            web.geometry.dispose();
            beamMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div className="w-full">
            {/* Cinematic Hero Section */}
            <header className="relative min-h-[85vh] lg:min-h-[90vh] w-full flex items-center overflow-hidden bg-[#1a1c1c]">
                {/* Background WebGL Shader Grid */}
                <canvas ref={shaderCanvasRef} id="hero-shader" className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-10" />
                
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-0"></div>
                
                {/* Content Layout */}
                <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 md:px-16 py-20 lg:py-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                        {/* Text and Actions */}
                        <div className="max-w-xl space-y-6">
                            <div className="inline-flex items-center gap-2 bg-[#f47321]/90 text-white px-4 py-2 border-l-2 border-white">
                                <span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
                                <span className="font-mono text-xs uppercase tracking-widest font-bold">ISO 9001:2015 Certified</span>
                            </div>
                            <h1 className="text-white font-sans font-black text-4xl md:text-6xl leading-[1.1] uppercase italic">
                                Engineering Excellence At Scale
                            </h1>
                            <p className="text-gray-300 font-sans text-lg leading-relaxed">
                                Forging the future through technical precision and structural mastery. We deliver critical infrastructure that defines skylines and supports civilizations.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button 
                                    onClick={() => navigate('/projects')}
                                    className="bg-[#f47321] text-white px-8 py-4 font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#9e4300] active:scale-95 transition-all duration-200 cursor-pointer"
                                >
                                    View Projects
                                </button>
                                <button 
                                    onClick={() => navigate('/contact')}
                                    className="border-2 border-white text-white px-8 py-4 font-mono text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-[#1a1c1c] active:scale-95 transition-all duration-200 cursor-pointer"
                                >
                                    Schedule Consultation
                                </button>
                            </div>
                        </div>

                        {/* Interactive 3D I-Beam Container */}
                        <div className="relative flex justify-center items-center h-[350px] lg:h-[450px]">
                            <div ref={threeContainerRef} id="beam-container" className="w-full h-full max-w-[400px]"></div>
                        </div>
                    </div>
                </div>

                {/* Technical Grid Overlay */}
                <div className="absolute bottom-0 right-0 w-1/3 h-full safety-grid-line opacity-5 pointer-events-none z-0"></div>
            </header>

            {/* Impact Metrics Banner */}
            <section className="bg-[#2f3131] py-12 border-t-4 border-[#9e4300]">
                <div className="max-w-[1440px] mx-auto px-6 md:px-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="space-y-1 border-r border-gray-700/50 last:border-0">
                            <h2 className="text-white font-sans font-black text-3xl md:text-5xl">250+</h2>
                            <p className="text-[#f47321] font-mono text-xs uppercase tracking-wider font-bold">Global Projects</p>
                        </div>
                        <div className="space-y-1 border-r border-gray-700/50 last:border-0">
                            <h2 className="text-white font-sans font-black text-3xl md:text-5xl">15M</h2>
                            <p className="text-[#f47321] font-mono text-xs uppercase tracking-wider font-bold">Safe Work Hours</p>
                        </div>
                        <div className="space-y-1 border-r border-gray-700/50 last:border-0">
                            <h2 className="text-white font-sans font-black text-3xl md:text-5xl">45</h2>
                            <p className="text-[#f47321] font-mono text-xs uppercase tracking-wider font-bold">Core Patents</p>
                        </div>
                        <div className="space-y-1 last:border-0">
                            <h2 className="text-white font-sans font-black text-3xl md:text-5xl">0.82</h2>
                            <p className="text-[#f47321] font-mono text-xs uppercase tracking-wider font-bold">Safety EMR Rating</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Services Section */}
            <section className="py-20 px-6 md:px-16 bg-[#f9f9f9] relative overflow-hidden">
                <div className="structural-grid absolute inset-0 pointer-events-none opacity-5"></div>
                <div className="max-w-[1440px] mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#dfc0b2] pb-8">
                        <div>
                            <span className="text-[#9e4300] font-mono text-xs uppercase tracking-widest font-bold block mb-2">Core Solutions</span>
                            <h2 className="font-sans font-black text-3xl uppercase tracking-tight text-[#1a1c1c]">Structural Solutions</h2>
                        </div>
                        <button 
                            onClick={() => navigate('/services')}
                            className="mt-4 md:mt-0 text-[#9e4300] font-mono text-xs uppercase font-bold tracking-widest flex items-center gap-2 hover:text-[#f47321] transition-all cursor-pointer"
                        >
                            All Services <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                        </button>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-96 bg-gray-200 animate-pulse border border-[#dfc0b2]"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {services.map((service) => (
                                <div 
                                    key={service.id} 
                                    className="bg-white border border-[#dfc0b2] flex flex-col group hover:border-[#9e4300] hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="h-60 overflow-hidden relative">
                                        <img 
                                            src={service.image_url} 
                                            alt={service.title} 
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4 bg-[#9e4300] text-white px-3 py-1 font-mono text-xs uppercase font-semibold">
                                            {service.category}
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <h3 className="font-sans font-bold text-xl uppercase text-[#1a1c1c] mb-2">{service.title}</h3>
                                        <p className="text-gray-600 font-sans text-sm mb-6 flex-grow leading-relaxed">
                                            {service.description}
                                        </p>
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

            {/* Stats Ticker */}
            <div className="w-full bg-[#f47321] text-white py-4 border-y border-[#9e4300] overflow-hidden">
                <div className="ticker-container w-full">
                    <div className="ticker-content flex items-center gap-16 font-mono text-xs uppercase tracking-widest font-bold">
                        <span className="flex items-center gap-2 shrink-0">
                            <span className="w-2.5 h-2.5 bg-[#2f3131]"></span> 500+ Projects Completed
                        </span>
                        <span className="flex items-center gap-2 shrink-0">
                            <span className="w-2.5 h-2.5 bg-[#2f3131]"></span> ISO 9001:2015 Certified
                        </span>
                        <span className="flex items-center gap-2 shrink-0">
                            <span className="w-2.5 h-2.5 bg-[#2f3131]"></span> 15+ Years Industry Leadership
                        </span>
                        <span className="flex items-center gap-2 shrink-0">
                            <span className="w-2.5 h-2.5 bg-[#2f3131]"></span> 0 Lost-Time Injuries
                        </span>
                        {/* Repeat */}
                        <span className="flex items-center gap-2 shrink-0">
                            <span className="w-2.5 h-2.5 bg-[#2f3131]"></span> 500+ Projects Completed
                        </span>
                        <span className="flex items-center gap-2 shrink-0">
                            <span className="w-2.5 h-2.5 bg-[#2f3131]"></span> ISO 9001:2015 Certified
                        </span>
                        <span className="flex items-center gap-2 shrink-0">
                            <span className="w-2.5 h-2.5 bg-[#2f3131]"></span> 15+ Years Industry Leadership
                        </span>
                        <span className="flex items-center gap-2 shrink-0">
                            <span className="w-2.5 h-2.5 bg-[#2f3131]"></span> 0 Lost-Time Injuries
                        </span>
                    </div>
                </div>
            </div>

            {/* Bento Grid: Featured Projects */}
            <section className="py-20 px-6 md:px-16 bg-[#e2e2e2]">
                <div className="max-w-[1440px] mx-auto">
                    <div className="mb-16 border-l-8 border-[#9e4300] pl-6">
                        <span className="text-[#9e4300] font-mono text-xs uppercase tracking-widest font-bold">Featured Works</span>
                        <h2 className="font-sans font-black text-3xl md:text-4xl uppercase text-[#1a1c1c] mt-2">Recent Project Wins</h2>
                    </div>

                    {loading ? (
                        <div className="h-[500px] bg-gray-300 animate-pulse"></div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {featuredProjects.slice(0, 2).map((project, idx) => {
                                const isLarge = idx === 0;
                                return (
                                    <div 
                                        key={project.id}
                                        className={`group relative overflow-hidden h-[450px] lg:h-[550px] border border-[#dfc0b2] ${
                                            isLarge ? 'lg:col-span-8' : 'lg:col-span-4'
                                        }`}
                                    >
                                        <div 
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] group-hover:scale-110"
                                            style={{ backgroundImage: `url('${project.image_url}')` }}
                                        ></div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                        
                                        <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white flex flex-col justify-end h-full w-full">
                                            <div className="flex gap-3 mb-4 text-xs font-mono">
                                                <span className="bg-[#f47321] px-3 py-1 font-bold uppercase">{project.category}</span>
                                                <span className="bg-[#1a1c1c]/80 border border-gray-600 px-3 py-1 uppercase">Completed {project.completion_year}</span>
                                            </div>
                                            <h3 className="font-sans font-extrabold text-2xl md:text-3xl uppercase tracking-tight mb-2">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-300 font-sans text-sm max-w-lg mb-6 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                                                {project.description}
                                            </p>
                                            <div>
                                                <button 
                                                    onClick={() => navigate('/projects')}
                                                    className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-widest border-b-2 border-[#f47321] pb-1 hover:text-[#f47321] transition-all cursor-pointer"
                                                >
                                                    Full Case Study <span className="material-symbols-outlined text-xs">north_east</span>
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

            {/* Action Call Section */}
            <section className="py-24 bg-[#1a1c1c] text-white text-center relative overflow-hidden">
                <div className="structural-grid absolute inset-0 opacity-15 pointer-events-none"></div>
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <h2 className="font-sans font-black text-4xl md:text-5xl uppercase italic mb-6">Ready to Build?</h2>
                    <p className="font-sans text-gray-300 text-lg mb-10 leading-relaxed">
                        Connect with our engineering experts to discuss your upcoming infrastructure or commercial development. We offer detailed feasibility studies and structural reviews.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button 
                            onClick={() => navigate('/contact')}
                            className="bg-[#f47321] text-white font-mono text-xs uppercase tracking-widest font-bold px-8 py-5 hover:bg-[#9e4300] active:scale-95 transition-all cursor-pointer"
                        >
                            Schedule Consultation
                        </button>
                        <button 
                            onClick={() => navigate('/projects')}
                            className="border-2 border-gray-500 text-white font-mono text-xs uppercase tracking-widest font-bold px-8 py-5 hover:bg-white hover:text-[#1a1c1c] active:scale-95 transition-all cursor-pointer"
                        >
                            Download Portfolio
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
