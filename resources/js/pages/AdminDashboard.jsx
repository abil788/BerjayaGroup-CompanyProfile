import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('inquiries');
    
    // Login form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);

    // Database tables state
    const [inquiries, setInquiries] = useState([]);
    const [services, setServices] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loadingData, setLoadingData] = useState(false);

    // Form editing overlays
    const [editingService, setEditingService] = useState(null);
    const [editingProject, setEditingProject] = useState(null);
    const [formError, setFormError] = useState('');

    // Check login state on load
    useEffect(() => {
        fetch('/api/auth/check')
            .then((res) => res.json())
            .then((data) => {
                if (data.authenticated) {
                    setIsLoggedIn(true);
                    setUser(data.user);
                    fetchDashboardData();
                }
            })
            .catch(err => console.error(err));
    }, []);

    // Fetch dashboard tables from DB
    const fetchDashboardData = async () => {
        setLoadingData(true);
        try {
            const [inqRes, srvRes, projRes] = await Promise.all([
                fetch('/api/inquiries').then(res => res.json()),
                fetch('/api/services').then(res => res.json()),
                fetch('/api/projects').then(res => res.json())
            ]);
            setInquiries(inqRes);
            setServices(srvRes);
            setProjects(projRes);
        } catch (err) {
            console.error('Error loading dashboard data:', err);
        } finally {
            setLoadingData(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        setLoginError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setIsLoggedIn(true);
                setUser(data.user);
                fetchDashboardData();
            } else {
                setLoginError(data.message || 'Incorrect login details.');
            }
        } catch (err) {
            console.error(err);
            setLoginError('Authentication server offline.');
        } finally {
            setLoginLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setIsLoggedIn(false);
            setUser(null);
            setEmail('');
            setPassword('');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    // Update Inquiry Status
    const handleUpdateStatus = async (id, currentStatus) => {
        const statuses = ['Pending', 'In Review', 'Contacted', 'Closed'];
        const nextIdx = (statuses.indexOf(currentStatus) + 1) % statuses.length;
        const newStatus = statuses[nextIdx];

        try {
            const res = await fetch(`/api/inquiries/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Delete item (Inquiry, Service, Project)
    const handleDeleteItem = async (type, id) => {
        if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

        try {
            const res = await fetch(`/api/${type}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (res.ok) {
                if (type === 'inquiries') {
                    setInquiries(inquiries.filter(item => item.id !== id));
                } else if (type === 'services') {
                    setServices(services.filter(item => item.id !== id));
                } else if (type === 'projects') {
                    setProjects(projects.filter(item => item.id !== id));
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Save/Update Service Form
    const handleSaveService = async (e) => {
        e.preventDefault();
        setFormError('');
        const isNew = !editingService.id;
        const url = isNew ? '/api/services' : `/api/services/${editingService.id}`;
        const method = isNew ? 'POST' : 'PUT';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(editingService)
            });

            const data = await response.json();

            if (response.ok) {
                setEditingService(null);
                fetchDashboardData();
            } else {
                setFormError(data.message || 'Error occurred. Please verify inputs.');
            }
        } catch (err) {
            console.error(err);
            setFormError('Failed to save service.');
        }
    };

    // Save/Update Project Form
    const handleSaveProject = async (e) => {
        e.preventDefault();
        setFormError('');
        const isNew = !editingProject.id;
        const url = isNew ? '/api/projects' : `/api/projects/${editingProject.id}`;
        const method = isNew ? 'POST' : 'PUT';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(editingProject)
            });

            const data = await response.json();

            if (response.ok) {
                setEditingProject(null);
                fetchDashboardData();
            } else {
                setFormError(data.message || 'Error occurred. Please verify inputs.');
            }
        } catch (err) {
            console.error(err);
            setFormError('Failed to save project.');
        }
    };

    // --- RENDER LOGIN ---
    if (!isLoggedIn) {
        return (
            <div className="min-h-[75vh] flex justify-center items-center py-16 px-6 relative">
                <div className="structural-grid absolute inset-0 opacity-5 pointer-events-none"></div>
                <div className="bg-white border-2 border-[#1a1c1c] p-8 md:p-12 w-full max-w-md shadow-md relative z-10">
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-[#9e4300] text-white flex items-center justify-center font-bold mx-auto border-b-2 border-r-2 border-white shadow-sm mb-4">
                            SI
                        </div>
                        <h1 className="font-sans font-black text-2xl uppercase tracking-tight text-[#1a1c1c]">
                            Admin Portal
                        </h1>
                        <p className="font-mono text-[10px] text-gray-400 mt-1 uppercase tracking-widest">
                            CONSTRUCTO SECURE GATEWAY
                        </p>
                    </div>

                    {loginError && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-xs text-red-700 font-mono">
                            {loginError}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="font-mono text-xs text-[#9e4300] uppercase font-bold">Email</label>
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@constructo.com"
                                className="bg-transparent border-b border-[#595f67] p-3 text-sm focus:border-[#9e4300] outline-none"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-mono text-xs text-[#9e4300] uppercase font-bold">Password</label>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="bg-transparent border-b border-[#595f67] p-3 text-sm focus:border-[#9e4300] outline-none"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loginLoading}
                            className="bg-[#1a1c1c] text-white font-mono text-xs uppercase tracking-widest font-bold py-4 hover:bg-[#9e4300] active:scale-95 transition-all mt-4 cursor-pointer"
                        >
                            {loginLoading ? 'Authenticating...' : 'Enter Console'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // --- RENDER DASHBOARD ---
    return (
        <div className="w-full min-h-[80vh] bg-[#f9f9f9] py-12 px-6 md:px-16 relative">
            <div className="max-w-[1440px] mx-auto space-y-8">
                
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#dfc0b2] pb-6">
                    <div>
                        <span className="text-[#9e4300] font-mono text-xs uppercase tracking-widest font-bold block">Console Manager</span>
                        <h1 className="font-sans font-black text-3xl uppercase tracking-tight text-[#1a1c1c] mt-1">
                            Control Panel
                        </h1>
                    </div>
                    <div className="flex items-center gap-4 mt-4 md:mt-0 font-mono text-xs">
                        <span className="text-gray-400">LOGGED IN AS: <b>{user.email}</b></span>
                        <button 
                            onClick={handleLogout}
                            className="bg-[#2f3131] text-white px-4 py-2 border border-gray-650 hover:bg-red-700 hover:border-red-700 transition-colors cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Tab Controls */}
                <div className="flex gap-4 border-b border-[#dfc0b2]/40 pb-4 font-mono text-xs uppercase tracking-wider">
                    <button
                        onClick={() => setActiveTab('inquiries')}
                        className={`pb-2 px-1 cursor-pointer transition-colors ${activeTab === 'inquiries' ? 'text-[#9e4300] font-bold border-b-2 border-[#9e4300]' : 'text-[#595f67] hover:text-[#9e4300]'}`}
                    >
                        Project Inquiries ({inquiries.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`pb-2 px-1 cursor-pointer transition-colors ${activeTab === 'services' ? 'text-[#9e4300] font-bold border-b-2 border-[#9e4300]' : 'text-[#595f67] hover:text-[#9e4300]'}`}
                    >
                        Manage Services ({services.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`pb-2 px-1 cursor-pointer transition-colors ${activeTab === 'projects' ? 'text-[#9e4300] font-bold border-b-2 border-[#9e4300]' : 'text-[#595f67] hover:text-[#9e4300]'}`}
                    >
                        Manage Projects ({projects.length})
                    </button>
                </div>

                {/* Tab Content */}
                {loadingData ? (
                    <div className="py-20 text-center font-mono text-xs uppercase tracking-widest text-[#595f67]">
                        Loading Database tables...
                    </div>
                ) : (
                    <div>
                        
                        {/* 1. Inquiries Tab */}
                        {activeTab === 'inquiries' && (
                            <div className="bg-white border border-[#dfc0b2] overflow-x-auto">
                                <table className="w-full text-left font-sans text-xs">
                                    <thead className="bg-gray-100 font-mono text-[10px] text-gray-500 uppercase border-b border-[#dfc0b2] tracking-wider">
                                        <tr>
                                            <th className="p-4">Reference</th>
                                            <th className="p-4">Name</th>
                                            <th className="p-4">Organization / Sector</th>
                                            <th className="p-4">Budget / Timeline</th>
                                            <th className="p-4">Scope</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-[#1a1c1c]">
                                        {inquiries.map((inq) => (
                                            <tr key={inq.id} className="hover:bg-gray-50">
                                                <td className="p-4 font-mono font-bold text-[#9e4300]">{inq.reference_number}</td>
                                                <td className="p-4">
                                                    <p className="font-bold">{inq.full_name}</p>
                                                    <p className="text-gray-400 text-[10px]">{inq.email}</p>
                                                </td>
                                                <td className="p-4">
                                                    <p>{inq.organization}</p>
                                                    <span className="inline-block bg-gray-100 border border-gray-300 text-gray-600 px-2 py-0.5 rounded-sm text-[9px] uppercase font-mono mt-1">
                                                        {inq.sector}
                                                    </span>
                                                </td>
                                                <td className="p-4 font-mono text-[10px]">
                                                    <p>{inq.budget}</p>
                                                    <p className="text-gray-400">{inq.timeline}</p>
                                                </td>
                                                <td className="p-4 max-w-xs truncate" title={inq.scope}>{inq.scope}</td>
                                                <td className="p-4 font-mono">
                                                    <button 
                                                        onClick={() => handleUpdateStatus(inq.id, inq.status)}
                                                        className={`px-3 py-1 font-bold text-[9px] uppercase border cursor-pointer ${
                                                            inq.status === 'Pending' ? 'bg-orange-50 text-orange-700 border-orange-300' :
                                                            inq.status === 'In Review' ? 'bg-blue-50 text-blue-700 border-blue-300' :
                                                            inq.status === 'Contacted' ? 'bg-green-50 text-green-700 border-green-300' :
                                                            'bg-gray-55 text-gray-700 border-gray-300'
                                                        }`}
                                                    >
                                                        {inq.status}
                                                    </button>
                                                </td>
                                                <td className="p-4 font-mono">
                                                    <button 
                                                        onClick={() => handleDeleteItem('inquiries', inq.id)}
                                                        className="text-red-600 hover:underline hover:text-red-800 cursor-pointer"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {inquiries.length === 0 && (
                                            <tr>
                                                <td colSpan="7" className="p-8 text-center text-gray-400 font-mono">
                                                    No inquiries logged.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* 2. Services Tab */}
                        {activeTab === 'services' && (
                            <div className="space-y-6">
                                <div className="flex justify-end">
                                    <button 
                                        onClick={() => setEditingService({ service_id: '', title: '', subtitle: '', description: '', category: 'Infrastructure', details: [] })}
                                        className="bg-[#9e4300] text-white font-mono text-xs uppercase tracking-widest font-bold px-4 py-2 hover:bg-[#1a1c1c] cursor-pointer"
                                    >
                                        + New Service
                                    </button>
                                </div>
                                <div className="bg-white border border-[#dfc0b2] overflow-x-auto">
                                    <table className="w-full text-left font-sans text-xs">
                                        <thead className="bg-gray-100 font-mono text-[10px] text-gray-500 uppercase border-b border-[#dfc0b2]">
                                            <tr>
                                                <th className="p-4">ID</th>
                                                <th className="p-4">Title</th>
                                                <th className="p-4">Category</th>
                                                <th className="p-4">Description</th>
                                                <th className="p-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 text-[#1a1c1c]">
                                            {services.map((srv) => (
                                                <tr key={srv.id} className="hover:bg-gray-50">
                                                    <td className="p-4 font-mono font-bold">{srv.service_id}</td>
                                                    <td className="p-4 font-bold">{srv.title}</td>
                                                    <td className="p-4 uppercase font-mono text-gray-500">{srv.category}</td>
                                                    <td className="p-4 max-w-sm truncate">{srv.description}</td>
                                                    <td className="p-4 font-mono flex gap-4">
                                                        <button 
                                                            onClick={() => setEditingService(srv)}
                                                            className="text-[#9e4300] hover:underline cursor-pointer"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDeleteItem('services', srv.id)}
                                                            className="text-red-655 hover:underline text-red-600 hover:text-red-800 cursor-pointer"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* 3. Projects Tab */}
                        {activeTab === 'projects' && (
                            <div className="space-y-6">
                                <div className="flex justify-end">
                                    <button 
                                        onClick={() => setEditingProject({ title: '', client: '', category: 'Industrial', completion_year: new Date().getFullYear(), location: '', budget: '$5M - $25M', description: '', featured: false })}
                                        className="bg-[#9e4300] text-white font-mono text-xs uppercase tracking-widest font-bold px-4 py-2 hover:bg-[#1a1c1c] cursor-pointer"
                                    >
                                        + New Project
                                    </button>
                                </div>
                                <div className="bg-white border border-[#dfc0b2] overflow-x-auto">
                                    <table className="w-full text-left font-sans text-xs">
                                        <thead className="bg-gray-100 font-mono text-[10px] text-gray-500 uppercase border-b border-[#dfc0b2]">
                                            <tr>
                                                <th className="p-4">Title</th>
                                                <th className="p-4">Client</th>
                                                <th className="p-4">Location / Year</th>
                                                <th className="p-4">Budget / Category</th>
                                                <th className="p-4">Featured</th>
                                                <th className="p-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 text-[#1a1c1c]">
                                            {projects.map((proj) => (
                                                <tr key={proj.id} className="hover:bg-gray-50">
                                                    <td className="p-4 font-bold">{proj.title}</td>
                                                    <td className="p-4 uppercase font-mono text-gray-500">{proj.client}</td>
                                                    <td className="p-4 font-mono">{proj.location} ({proj.completion_year})</td>
                                                    <td className="p-4 font-mono">{proj.budget} / {proj.category}</td>
                                                    <td className="p-4 font-mono">{proj.featured ? 'YES' : 'NO'}</td>
                                                    <td className="p-4 font-mono flex gap-4">
                                                        <button 
                                                            onClick={() => setEditingProject(proj)}
                                                            className="text-[#9e4300] hover:underline cursor-pointer"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDeleteItem('projects', proj.id)}
                                                            className="text-red-655 hover:underline text-red-600 hover:text-red-800 cursor-pointer"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>

            {/* Service Form Overlay */}
            {editingService && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-6">
                    <div className="bg-white border-2 border-[#1a1c1c] p-8 w-full max-w-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
                        <h3 className="font-sans font-black text-xl uppercase tracking-tight text-[#1a1c1c] mb-6">
                            {editingService.id ? 'Edit Service' : 'New Service'}
                        </h3>
                        {formError && <p className="bg-red-50 text-red-700 p-3 mb-4 text-xs font-mono border-l-4 border-red-500">{formError}</p>}
                        <form onSubmit={handleSaveService} className="flex flex-col gap-4 font-sans text-xs">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="font-mono text-[#9e4300] uppercase font-bold">Service ID</label>
                                    <input 
                                        type="text" 
                                        value={editingService.service_id}
                                        onChange={(e) => setEditingService({...editingService, service_id: e.target.value})}
                                        className="border border-[#dfc0b2] p-2 bg-gray-50 outline-none focus:border-[#9e4300]"
                                        placeholder="e.g. CE-01"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="font-mono text-[#9e4300] uppercase font-bold">Category</label>
                                    <input 
                                        type="text" 
                                        value={editingService.category}
                                        onChange={(e) => setEditingService({...editingService, category: e.target.value})}
                                        className="border border-[#dfc0b2] p-2 bg-gray-50 outline-none focus:border-[#9e4300]"
                                        placeholder="e.g. Infrastructure"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-mono text-[#9e4300] uppercase font-bold">Title</label>
                                <input 
                                    type="text" 
                                    value={editingService.title}
                                    onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                                    className="border border-[#dfc0b2] p-2 bg-gray-50 outline-none focus:border-[#9e4300]"
                                    placeholder="Service Name"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-mono text-[#9e4300] uppercase font-bold">Subtitle</label>
                                <input 
                                    type="text" 
                                    value={editingService.subtitle || ''}
                                    onChange={(e) => setEditingService({...editingService, subtitle: e.target.value})}
                                    className="border border-[#dfc0b2] p-2 bg-gray-50 outline-none focus:border-[#9e4300]"
                                    placeholder="Technical specification tag"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-mono text-[#9e4300] uppercase font-bold">Description</label>
                                <textarea 
                                    value={editingService.description}
                                    onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                                    className="border border-[#dfc0b2] p-2 bg-gray-50 outline-none focus:border-[#9e4300] h-24 resize-none"
                                    placeholder="Provide detailed description..."
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-mono text-[#9e4300] uppercase font-bold">Image URL</label>
                                <input 
                                    type="text" 
                                    value={editingService.image_url || ''}
                                    onChange={(e) => setEditingService({...editingService, image_url: e.target.value})}
                                    className="border border-[#dfc0b2] p-2 bg-gray-50 outline-none focus:border-[#9e4300]"
                                    placeholder="Image link"
                                />
                            </div>
                            <div className="flex justify-end gap-4 mt-4 font-mono text-xs pt-4 border-t border-[#dfc0b2]/40">
                                <button 
                                    type="button" 
                                    onClick={() => setEditingService(null)}
                                    className="text-gray-550 hover:text-black uppercase cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="bg-[#9e4300] text-white px-6 py-2 uppercase font-bold hover:bg-[#1a1c1c] cursor-pointer"
                                >
                                    Save Service
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Project Form Overlay */}
            {editingProject && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-6">
                    <div className="bg-white border-2 border-[#1a1c1c] p-8 w-full max-w-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
                        <h3 className="font-sans font-black text-xl uppercase tracking-tight text-[#1a1c1c] mb-6">
                            {editingProject.id ? 'Edit Project' : 'New Project'}
                        </h3>
                        {formError && <p className="bg-red-50 text-red-700 p-3 mb-4 text-xs font-mono border-l-4 border-red-500">{formError}</p>}
                        <form onSubmit={handleSaveProject} className="flex flex-col gap-4 font-sans text-xs">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="font-mono text-[#9e4300] uppercase font-bold">Project Title</label>
                                    <input 
                                        type="text" 
                                        value={editingProject.title}
                                        onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                                        className="border border-[#dfc0b2] p-2 bg-gray-50 outline-none focus:border-[#9e4300]"
                                        placeholder="Project Name"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="font-mono text-[#9e4300] uppercase font-bold">Client</label>
                                    <input 
                                        type="text" 
                                        value={editingProject.client}
                                        onChange={(e) => setEditingProject({...editingProject, client: e.target.value})}
                                        className="border border-[#dfc0b2] p-2 bg-gray-50 outline-none focus:border-[#9e4300]"
                                        placeholder="e.g. Apex Corp"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="font-mono text-[#9e4300] uppercase font-bold">Category</label>
                                    <select 
                                        value={editingProject.category}
                                        onChange={(e) => setEditingProject({...editingProject, category: e.target.value})}
                                        className="border border-[#dfc0b2] p-2 bg-gray-50 outline-none"
                                    >
                                        <option>Industrial</option>
                                        <option>Civil</option>
                                        <option>Commercial</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="font-mono text-[#9e4300] uppercase font-bold">Location</label>
                                    <input 
                                        type="text" 
                                        value={editingProject.location}
                                        onChange={(e) => setEditingProject({...editingProject, location: e.target.value})}
                                        className="border border-[#dfc0b2] p-2 bg-gray-50 outline-none focus:border-[#9e4300]"
                                        placeholder="e.g. Dubai, UAE"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="font-mono text-[#9e4300] uppercase font-bold">Year</label>
                                    <input 
                                        type="number" 
                                        value={editingProject.completion_year}
                                        onChange={(e) => setEditingProject({...editingProject, completion_year: parseInt(e.target.value) || new Date().getFullYear()})}
                                        className="border border-[#dfc0b2] p-2 bg-gray-50 outline-none focus:border-[#9e4300]"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="font-mono text-[#9e4300] uppercase font-bold">Budget</label>
                                    <input 
                                        type="text" 
                                        value={editingProject.budget}
                                        onChange={(e) => setEditingProject({...editingProject, budget: e.target.value})}
                                        className="border border-[#dfc0b2] p-2 bg-gray-50 outline-none focus:border-[#9e4300]"
                                        placeholder="e.g. $85M"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="font-mono text-[#9e4300] uppercase font-bold">Featured Project</label>
                                    <select 
                                        value={editingProject.featured ? 'yes' : 'no'}
                                        onChange={(e) => setEditingProject({...editingProject, featured: e.target.value === 'yes'})}
                                        className="border border-[#dfc0b2] p-2 bg-gray-50 outline-none"
                                    >
                                        <option value="no">No</option>
                                        <option value="yes">Yes (Show on Home Page)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-mono text-[#9e4300] uppercase font-bold">Description</label>
                                <textarea 
                                    value={editingProject.description}
                                    onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                                    className="border border-[#dfc0b2] p-2 bg-gray-50 outline-none focus:border-[#9e4300] h-20 resize-none"
                                    placeholder="Provide detailed description..."
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-mono text-[#9e4300] uppercase font-bold">Image URL</label>
                                <input 
                                    type="text" 
                                    value={editingProject.image_url || ''}
                                    onChange={(e) => setEditingProject({...editingProject, image_url: e.target.value})}
                                    className="border border-[#dfc0b2] p-2 bg-gray-50 outline-none focus:border-[#9e4300]"
                                    placeholder="Image link"
                                />
                            </div>
                            <div className="flex justify-end gap-4 mt-4 font-mono text-xs pt-4 border-t border-[#dfc0b2]/40">
                                <button 
                                    type="button" 
                                    onClick={() => setEditingProject(null)}
                                    className="text-gray-550 hover:text-black uppercase cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="bg-[#9e4300] text-white px-6 py-2 uppercase font-bold hover:bg-[#1a1c1c] cursor-pointer"
                                >
                                    Save Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
