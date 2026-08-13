import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Bell, Edit, Save, Github, Briefcase, Settings, LogOut, ExternalLink, Plus, Trash2, FolderOpen, Mail, MailOpen, RefreshCw, Search, Clock, User, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import api from '../lib/axios';
import { cloudinaryConfig } from '../config';

const Dashboard = ({ onLogout, messages, onRefresh, onDelete, onUpdateStatus }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [portfolioData, setPortfolioData] = useState({
    name: '',
    title: '',
    about: '',
    skills: '',
    email: '',
    cv: ''
  });
  const [experiences, setExperiences] = useState([]);
  const [editingExperience, setEditingExperience] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newExperience, setNewExperience] = useState({
    role: '',
    company: '',
    duration: '',
    description: '',
    tags: ''
  });
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: 'MERN Stack',
    tags: '',
    image: '',
    github: '',
    live: ''
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageFilter, setMessageFilter] = useState('all');
  const [messageSearch, setMessageSearch] = useState('');
  const [expandedMessage, setExpandedMessage] = useState(null);

  // Fetch portfolio, experience, and project data from backend on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const portfolioResponse = await api.get('/portfolio');
        if (portfolioResponse.data?.success) {
          setPortfolioData(portfolioResponse.data.data);
        }
        
        const experienceResponse = await api.get('/experience');
        if (experienceResponse.data?.success) {
          setExperiences(experienceResponse.data.data);
        }

        const projectResponse = await api.get('/project');
        if (projectResponse.data?.success) {
          setProjects(projectResponse.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSavePortfolio = async () => {
    try {
      const response = await api.put('/portfolio', portfolioData);
      if (response.data?.success) {
        setPortfolioData(response.data.data);
        alert('Portfolio saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save portfolio:', error.message);
      alert('Failed to save portfolio. Please try again.');
    }
  };

  const handleEditExperience = (exp) => {
    setEditingExperience({
      ...exp,
      tags: exp.tags ? exp.tags.join(', ') : ''
    });
  };

  const handleUpdateExperience = async () => {
    if (editingExperience) {
      try {
        const formattedExp = {
          ...editingExperience,
          tags: typeof editingExperience.tags === 'string'
            ? editingExperience.tags.split(',').map(t => t.trim()).filter(Boolean)
            : editingExperience.tags
        };
        const response = await api.put(`/experience/${editingExperience._id}`, formattedExp);
        if (response.data?.success) {
          setExperiences(prev => prev.map(exp => exp._id === editingExperience._id ? response.data.data : exp));
          setEditingExperience(null);
          window.dispatchEvent(new Event('experiencesUpdated'));
          alert('Experience updated successfully!');
        }
      } catch (error) {
        console.error('Failed to update experience:', error.message);
        alert('Failed to update experience.');
      }
    }
  };

  const handleAddExperience = async () => {
    try {
      const formattedExp = {
        ...newExperience,
        tags: newExperience.tags.split(',').map(t => t.trim()).filter(Boolean)
      };
      const response = await api.post('/experience', formattedExp);
      if (response.data?.success) {
        setExperiences(prev => [response.data.data, ...prev]);
        setIsAdding(false);
        setNewExperience({ role: '', company: '', duration: '', description: '', tags: '' });
        window.dispatchEvent(new Event('experiencesUpdated'));
        alert('Experience added successfully!');
      }
    } catch (error) {
      console.error('Failed to add experience:', error.message);
      alert('Failed to add experience.');
    }
  };

  const handleDeleteExperience = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        const response = await api.delete(`/experience/${id}`);
        if (response.data?.success) {
          setExperiences(prev => prev.filter(exp => exp._id !== id));
          window.dispatchEvent(new Event('experiencesUpdated'));
          alert('Experience deleted successfully!');
        }
      } catch (error) {
        console.error('Failed to delete experience:', error.message);
        alert('Failed to delete experience.');
      }
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is empty
    if (file.size === 0) {
      alert('The selected file is empty. Please select a valid image file.');
      return;
    }

    console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
    setUploadingImage(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryConfig.uploadPreset);
      formData.append('folder', 'portfolio_projects');

      console.log('Cloudinary config:', cloudinaryConfig);
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Cloudinary error response:', data);
        alert(`Cloudinary upload failed: ${data.error?.message || data.message || 'Unknown error'}. Please check your upload preset settings in Cloudinary.`);
        return;
      }

      if (data.secure_url) {
        if (isAddingProject) {
          setNewProject({ ...newProject, image: data.secure_url });
        } else if (editingProject) {
          setEditingProject({ ...editingProject, image: data.secure_url });
        }
      } else {
        alert('Upload succeeded but no URL was returned. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Check your internet connection and try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject({
      ...project,
      tags: project.tags ? project.tags.join(', ') : ''
    });
  };

  const handleAddProject = async () => {
    if (!newProject.title || !newProject.description || !newProject.category) {
      alert('Please fill in the required fields (title, description, category).');
      return;
    }

    try {
      const formattedProject = {
        ...newProject,
        tags: newProject.tags.split(',').map(t => t.trim()).filter(Boolean)
      };
      const response = await api.post('/project', formattedProject);
      if (response.data?.success) {
        setProjects(prev => [response.data.data, ...prev]);
        setIsAddingProject(false);
        setNewProject({ title: '', description: '', category: 'MERN Stack', tags: '', image: '', github: '', live: '' });
        window.dispatchEvent(new Event('projectsUpdated'));
        alert('Project added successfully!');
      }
    } catch (error) {
      console.error('Failed to add project:', error.message);
      alert('Failed to add project. Please check your input and try again.');
    }
  };

  const handleUpdateProject = async () => {
    if (editingProject) {
      try {
        const formattedProject = {
          ...editingProject,
          tags: typeof editingProject.tags === 'string'
            ? editingProject.tags.split(',').map(t => t.trim()).filter(Boolean)
            : editingProject.tags
        };
        const response = await api.put(`/project/${editingProject._id}`, formattedProject);
        if (response.data?.success) {
          setProjects(prev => prev.map(proj => proj._id === editingProject._id ? response.data.data : proj));
          setEditingProject(null);
          window.dispatchEvent(new Event('projectsUpdated'));
          alert('Project updated successfully!');
        }
      } catch (error) {
        console.error('Failed to update project:', error.message);
        alert('Failed to update project.');
      }
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await api.delete(`/project/${id}`);
        if (response.data?.success) {
          setProjects(prev => prev.filter(proj => proj._id !== id));
          window.dispatchEvent(new Event('projectsUpdated'));
          alert('Project deleted successfully!');
        }
      } catch (error) {
        console.error('Failed to delete project:', error.message);
        alert('Failed to delete project.');
      }
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f5f7fa' }}>
        <p style={{ fontSize: '18px', color: '#666' }}>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{ width: sidebarOpen ? '280px' : '80px', background: '#1e293b', padding: '24px', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', left: 0, top: 0, zIndex: 1000, boxShadow: '4px 0 24px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', color: 'white' }}>
          {sidebarOpen && <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, letterSpacing: '-0.5px' }}>{portfolioData.name || 'Dashboard'}</h2>}
        </div>
        <nav style={{ flex: 1 }}>
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'messages', label: 'Messages', icon: MessageSquare, badge: messages.filter(m => m.status === 'unread').length },
            { id: 'portfolio', label: 'Edit Portfolio', icon: Edit },
            { id: 'experience', label: 'Timeline', icon: Briefcase },
            { id: 'projects', label: 'Projects', icon: FolderOpen },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)} 
              style={{ 
                width: '100%', 
                padding: '14px 16px', 
                marginBottom: '4px', 
                background: activeTab === item.id ? '#3b82f6' : 'transparent', 
                border: 'none', 
                color: activeTab === item.id ? 'white' : '#94a3b8', 
                borderRadius: '10px', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '14px', 
                fontSize: '15px', 
                fontWeight: 500,
                position: 'relative',
                transition: 'all 0.2s ease',
                ':hover': { background: activeTab === item.id ? '#3b82f6' : '#334155', color: 'white' }
              }}
              onMouseOver={e => { if (activeTab !== item.id) { e.currentTarget.style.background = '#334155'; e.currentTarget.style.color = 'white'; } }}
              onMouseOut={e => { if (activeTab !== item.id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; } }}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
              {sidebarOpen && item.badge > 0 && (
                <span style={{ marginLeft: 'auto', background: '#ef4444', color: 'white', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', minWidth: '24px', textAlign: 'center', boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)' }}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>
        <button 
          onClick={() => { onLogout(); navigate('/'); }} 
          style={{ 
            width: '100%', 
            padding: '14px 16px', 
            background: '#334155', 
            border: 'none', 
            color: '#e2e8f0', 
            borderRadius: '10px', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '14px', 
            fontSize: '15px',
            fontWeight: 500,
            transition: 'all 0.2s ease'
          }}
          onMouseOver={e => { e.currentTarget.style.background = '#475569'; e.currentTarget.style.color = 'white'; }}
          onMouseOut={e => { e.currentTarget.style.background = '#334155'; e.currentTarget.style.color = '#e2e8f0'; }}
        >
          <LogOut size={20} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
      <div style={{ marginLeft: sidebarOpen ? '280px' : '80px', flex: 1, padding: '32px', background: '#f8fafc' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: '#1e293b', letterSpacing: '-0.5px' }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ background: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', color: '#64748b', fontWeight: 500, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
          </div>
        </div>
        
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'white', padding: '28px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ background: '#dbeafe', padding: '14px', borderRadius: '12px', display: 'flex' }}><Briefcase size={24} color="#3b82f6" /></div>
                <div>
                  <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Experiences</div>
                  <div style={{ fontSize: '32px', fontWeight: 700, color: '#1e293b', marginTop: '4px' }}>{experiences.length}</div>
                </div>
              </div>
              <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: '#3b82f6', borderRadius: '2px' }} />
              </div>
            </div>
            <div 
              onClick={() => setActiveTab('messages')} 
              style={{ 
                background: 'white', 
                padding: '28px', 
                borderRadius: '16px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)', 
                border: '1px solid #e2e8f0',
                cursor: 'pointer', 
                transition: 'all 0.2s ease' 
              }} 
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = '#3b82f6'; }} 
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ background: '#dcfce7', padding: '14px', borderRadius: '12px', display: 'flex' }}><MessageSquare size={24} color="#22c55e" /></div>
                <div>
                  <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Messages</div>
                  <div style={{ fontSize: '32px', fontWeight: 700, color: '#1e293b', marginTop: '4px' }}>{messages.length}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${(messages.filter(m => m.status === 'unread').length / messages.length) * 100 || 0}%`, height: '100%', background: '#22c55e', borderRadius: '2px' }} />
                </div>
                {messages.filter(m => m.status === 'unread').length > 0 && (
                  <span style={{ background: '#22c55e', color: 'white', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px' }}>{messages.filter(m => m.status === 'unread').length} unread</span>
                )}
              </div>
            </div>
            <div style={{ background: 'white', padding: '28px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ background: '#fef3c7', padding: '14px', borderRadius: '12px', display: 'flex' }}><FolderOpen size={24} color="#f59e0b" /></div>
                <div>
                  <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Projects</div>
                  <div style={{ fontSize: '32px', fontWeight: 700, color: '#1e293b', marginTop: '4px' }}>{projects.length}</div>
                </div>
              </div>
              <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: '#f59e0b', borderRadius: '2px' }} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (() => {
          const filteredMessages = messages.filter((msg) => {
            const matchesFilter = messageFilter === 'all' || (messageFilter === 'unread' && msg.status === 'unread') || (messageFilter === 'read' && msg.status === 'read');
            const matchesSearch = messageSearch === '' || msg.name.toLowerCase().includes(messageSearch.toLowerCase()) || msg.email.toLowerCase().includes(messageSearch.toLowerCase()) || msg.subject.toLowerCase().includes(messageSearch.toLowerCase()) || msg.message.toLowerCase().includes(messageSearch.toLowerCase());
            return matchesFilter && matchesSearch;
          });
          const unreadCount = messages.filter(m => m.status === 'unread').length;
          const readCount = messages.filter(m => m.status === 'read').length;

          return (
            <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Stats Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: '#dbeafe', padding: '12px', borderRadius: '10px', display: 'flex' }}><Mail size={22} color="#3b82f6" /></div>
                  <div>
                    <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', marginTop: '2px' }}>{messages.length}</div>
                  </div>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: '#fef3c7', padding: '12px', borderRadius: '10px', display: 'flex' }}><Bell size={22} color="#f59e0b" /></div>
                  <div>
                    <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Unread</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', marginTop: '2px' }}>{unreadCount}</div>
                  </div>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: '#dcfce7', padding: '12px', borderRadius: '10px', display: 'flex' }}><MailOpen size={22} color="#22c55e" /></div>
                  <div>
                    <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Read</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', marginTop: '2px' }}>{readCount}</div>
                  </div>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: '1 1 280px' }}>
                  <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="text" placeholder="Search by name, email, subject..." value={messageSearch} onChange={(e) => setMessageSearch(e.target.value)} style={{ width: '100%', padding: '12px 12px 12px 42px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s', background: '#f8fafc' }} onFocus={e => { e.target.style.borderColor = '#3b82f6'; e.target.style.background = 'white'; }} onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; }} />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['all', 'unread', 'read'].map((f) => (
                    <button key={f} onClick={() => setMessageFilter(f)} style={{ padding: '10px 18px', borderRadius: '8px', border: '2px solid', borderColor: messageFilter === f ? '#3b82f6' : '#e2e8f0', background: messageFilter === f ? '#eff6ff' : 'white', color: messageFilter === f ? '#3b82f6' : '#64748b', cursor: 'pointer', fontSize: '13px', fontWeight: 600, textTransform: 'capitalize', transition: 'all 0.2s' }}>{f}</button>
                  ))}
                </div>
                <button onClick={onRefresh} style={{ padding: '12px 16px', background: '#f1f5f9', border: '2px solid #e2e8f0', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', fontWeight: 600, transition: 'all 0.2s' }} onMouseOver={e => { e.currentTarget.style.background = '#e2e8f0'; e.currentTarget.style.borderColor = '#cbd5e1'; }} onMouseOut={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.borderColor = '#e2e8f0'; }}>
                  <RefreshCw size={16} /> Refresh
                </button>
              </div>

              {/* Messages List */}
              <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                {filteredMessages.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
                    <MessageSquare size={48} color="#ddd" style={{ marginBottom: '16px' }} />
                    <p style={{ fontSize: '16px', fontWeight: 500, margin: '0 0 4px 0' }}>No messages found</p>
                    <p style={{ fontSize: '13px', margin: 0, color: '#bbb' }}>{messageSearch || messageFilter !== 'all' ? 'Try adjusting your search or filter' : 'Messages from your contact form will appear here'}</p>
                  </div>
                ) : (
                  filteredMessages.map((msg, index) => (
                    <div key={msg._id} style={{ borderBottom: index < filteredMessages.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#f8fafc'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
                      {/* Message Header Row */}
                      <div onClick={() => { setExpandedMessage(expandedMessage === msg._id ? null : msg._id); if (msg.status === 'unread' && onUpdateStatus) onUpdateStatus(msg._id, 'read'); }} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', cursor: 'pointer' }}>
                        {/* Status indicator */}
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: msg.status === 'unread' ? '#3b82f6' : '#cbd5e1', flexShrink: 0, boxShadow: msg.status === 'unread' ? '0 0 8px rgba(59, 130, 246, 0.4)' : 'none' }} />
                        {/* Avatar */}
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: msg.status === 'unread' ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <User size={18} color={msg.status === 'unread' ? 'white' : '#94a3b8'} />
                        </div>
                        {/* Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                            <span style={{ fontWeight: msg.status === 'unread' ? 700 : 500, fontSize: '15px', color: '#1e293b' }}>{msg.name}</span>
                            {msg.status === 'unread' && <span style={{ background: '#3b82f6', color: 'white', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px' }}>NEW</span>}
                          </div>
                          <div style={{ fontSize: '13px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.subject}</div>
                        </div>
                        {/* Date */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8', fontSize: '12px', flexShrink: 0, fontWeight: 500 }}>
                          <Clock size={13} />
                          {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        {/* Expand icon */}
                        {expandedMessage === msg._id ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
                      </div>

                      {/* Expanded Content */}
                      {expandedMessage === msg._id && (
                        <div style={{ padding: '0 20px 20px 86px', animation: 'fadeIn 0.2s ease' }}>
                          <div style={{ display: 'flex', gap: '20px', marginBottom: '16px', fontSize: '13px', color: '#64748b' }}>
                            <span><strong>Email:</strong> <a href={`mailto:${msg.email}`} style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>{msg.email}</a></span>
                            <span><strong>Subject:</strong> {msg.subject}</span>
                          </div>
                          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', fontSize: '14px', color: '#475569', lineHeight: 1.7, whiteSpace: 'pre-line', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
                            {msg.message}
                          </div>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => onUpdateStatus(msg._id, msg.status === 'unread' ? 'read' : 'unread')} style={{ padding: '8px 16px', background: msg.status === 'unread' ? '#eff6ff' : '#f1f5f9', color: msg.status === 'unread' ? '#3b82f6' : '#64748b', border: '1px solid', borderColor: msg.status === 'unread' ? '#bfdbfe' : '#e2e8f0', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }} onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-1px)' }} onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)' }}>
                              {msg.status === 'unread' ? <><MailOpen size={14} /> Mark Read</> : <><Mail size={14} /> Mark Unread</>}
                            </button>
                            <a href={`mailto:${msg.email}?subject=Re: ${msg.subject}`} style={{ padding: '8px 16px', background: '#eff6ff', color: '#3b82f6', border: '1px solid #bfdbfe', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', transition: 'all 0.2s' }} onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-1px)' }} onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)' }}>
                              <Mail size={14} /> Reply
                            </a>
                            <button onClick={() => { if (window.confirm('Are you sure you want to delete this message?')) onDelete(msg._id); }} style={{ padding: '8px 16px', background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto', transition: 'all 0.2s' }} onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-1px)' }} onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)' }}>
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })()}

        {activeTab === 'portfolio' && (
          <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginTop: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#333' }}>Edit Portfolio</h3>
              <button onClick={handleSavePortfolio} style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Save size={16} />Save Changes
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Name</label>
                <input type="text" value={portfolioData.name || ''} onChange={(e) => setPortfolioData({ ...portfolioData, name: e.target.value })} style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Title</label>
                <input type="text" value={portfolioData.title || ''} onChange={(e) => setPortfolioData({ ...portfolioData, title: e.target.value })} style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>About</label>
                <textarea value={portfolioData.about || ''} onChange={(e) => setPortfolioData({ ...portfolioData, about: e.target.value })} rows={4} style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Skills (comma separated)</label>
                <input type="text" value={portfolioData.skills || ''} onChange={(e) => setPortfolioData({ ...portfolioData, skills: e.target.value })} style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Email</label>
                <input type="email" value={portfolioData.email || ''} onChange={(e) => setPortfolioData({ ...portfolioData, email: e.target.value })} style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>CV / Resume Link (e.g. Google Drive link)</label>
                <input 
                  type="url" 
                  value={portfolioData.cv || ''} 
                  onChange={(e) => setPortfolioData({ ...portfolioData, cv: e.target.value })} 
                  placeholder="Paste your Google Drive, Dropbox or OneDrive CV link here" 
                  style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }} 
                />
                <p style={{ color: '#999', fontSize: '12px', marginTop: '6px', marginBottom: 0 }}>
                  Make sure the link sharing permission is set to "Anyone with the link can view".
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginTop: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <div>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '20px', fontWeight: 'bold', color: '#333' }}>Timeline</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Professional Journey - A history of your roles and milestones</p>
              </div>
              {!isAdding && !editingExperience && (
                <button onClick={() => setIsAdding(true)} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Plus size={16} />Add Experience
                </button>
              )}
            </div>

            {/* Add Experience Form */}
            {isAdding && (
              <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '30px', border: '2px solid #667eea' }}>
                <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>Add New Experience</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Role</label>
                    <input type="text" value={newExperience.role} onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} placeholder="e.g. Lead Full Stack Engineer" />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Company</label>
                    <input type="text" value={newExperience.company} onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} placeholder="e.g. InnovateTech Solutions" />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Duration</label>
                    <input type="text" value={newExperience.duration} onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} placeholder="e.g. 2024 - Present" />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Description</label>
                    <textarea value={newExperience.description} onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })} rows={6} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} placeholder="Describe your duties, achievements, and responsibilities..." />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Tags (comma separated)</label>
                    <input type="text" value={newExperience.tags} onChange={(e) => setNewExperience({ ...newExperience, tags: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} placeholder="e.g. React, Node.js, MongoDB" />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleAddExperience} style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>Add</button>
                    <button onClick={() => setIsAdding(false)} style={{ padding: '10px 20px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Experience Form */}
            {editingExperience && (
              <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '30px', border: '2px solid #667eea' }}>
                <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>Edit Experience</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Role</label>
                    <input type="text" value={editingExperience.role} onChange={(e) => setEditingExperience({ ...editingExperience, role: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Company</label>
                    <input type="text" value={editingExperience.company} onChange={(e) => setEditingExperience({ ...editingExperience, company: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Duration</label>
                    <input type="text" value={editingExperience.duration} onChange={(e) => setEditingExperience({ ...editingExperience, duration: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Description</label>
                    <textarea value={editingExperience.description} onChange={(e) => setEditingExperience({ ...editingExperience, description: e.target.value })} rows={6} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Tags (comma separated)</label>
                    <input type="text" value={editingExperience.tags} onChange={(e) => setEditingExperience({ ...editingExperience, tags: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleUpdateExperience} style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>Update</button>
                    <button onClick={() => setEditingExperience(null)} style={{ padding: '10px 20px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline Experience List */}
            {!isAdding && !editingExperience && (
              <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', paddingLeft: '30px' }}>
                {experiences.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    <p>No experiences yet. Click "Add Experience" to create your first entry.</p>
                  </div>
                ) : (
                  <>
                    {/* Vertical timeline center line */}
                    <div style={{ position: 'absolute', left: '8px', top: '10px', bottom: '10px', width: '2.5px', background: 'rgba(102, 126, 234, 0.15)' }} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                      {experiences.map((exp, index) => (
                        <div key={exp._id} style={{ position: 'relative' }}>
                          {/* Timeline circle node */}
                          <div style={{ position: 'absolute', left: '-29px', top: '6px', width: '14px', height: '14px', borderRadius: '50%', background: '#667eea', boxShadow: '0 0 0 4px rgba(102, 126, 234, 0.15)', zIndex: 2 }} />

                          {/* Experience Card */}
                          <div style={{ background: '#f8f9fa', border: '2px solid #e0e0e0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', padding: '24px', borderRadius: '16px', position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
                              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>{exp.role}</h3>
                              <span style={{ fontSize: '14px', fontWeight: 700, color: '#667eea' }}>{exp.duration}</span>
                            </div>
                            <div style={{ fontSize: '14px', color: '#666', fontWeight: 600, marginBottom: '16px' }}>
                              {exp.company}
                            </div>
                            <p style={{ color: '#666', fontSize: '15px', lineHeight: 1.7, marginBottom: '16px', margin: '0 0 16px 0' }}>
                              {exp.description}
                            </p>

                            {/* Tech tags */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                              {exp.tags && exp.tags.map((tag, tagIndex) => (
                                <span key={tag} style={{ fontSize: '11px', fontWeight: 600, color: '#667eea', background: 'rgba(102, 126, 234, 0.04)', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(102, 126, 234, 0.08)' }}>
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Action buttons */}
                            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #e0e0e0', paddingTop: '12px' }}>
                              <button onClick={() => handleEditExperience(exp)} style={{ padding: '6px 12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Edit size={14} /> Edit
                              </button>
                              <button onClick={() => handleDeleteExperience(exp._id)} style={{ padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'projects' && (
          <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginTop: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <div>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '20px', fontWeight: 'bold', color: '#333' }}>Portfolio</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Selected Projects - A showcase of your flagship engineering applications</p>
              </div>
              {!isAddingProject && !editingProject && (
                <button onClick={() => setIsAddingProject(true)} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Plus size={16} />Add Project
                </button>
              )}
            </div>

            {/* Add Project Form */}
            {isAddingProject && (
              <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '30px', border: '2px solid #667eea' }}>
                <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>Add New Project</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Title</label>
                    <input type="text" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} placeholder="e.g. SwapNest" />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Description</label>
                    <textarea value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} rows={4} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} placeholder="Describe your project..." />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Category</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <select value={newProject.category && ['MERN Stack', 'React / UI', 'Backend', 'Frontend', 'Full Stack', 'Mobile Development', 'DevOps', 'Machine Learning', 'Data Science', 'Blockchain', 'Python', 'JavaScript', 'TypeScript'].includes(newProject.category) ? newProject.category : 'custom'} onChange={(e) => setNewProject({ ...newProject, category: e.target.value === 'custom' ? '' : e.target.value })} style={{ flex: '1', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}>
                        <option value="custom">Custom (type below)</option>
                        <option value="MERN Stack">MERN Stack</option>
                        <option value="React / UI">React / UI</option>
                        <option value="Backend">Backend</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Full Stack">Full Stack</option>
                        <option value="Mobile Development">Mobile Development</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Blockchain">Blockchain</option>
                        <option value="Python">Python</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="TypeScript">TypeScript</option>
                      </select>
                      <input type="text" value={newProject.category && !['MERN Stack', 'React / UI', 'Backend', 'Frontend', 'Full Stack', 'Mobile Development', 'DevOps', 'Machine Learning', 'Data Science', 'Blockchain', 'Python', 'JavaScript', 'TypeScript'].includes(newProject.category) ? newProject.category : ''} onChange={(e) => setNewProject({ ...newProject, category: e.target.value })} placeholder="Type custom category" style={{ flex: '1', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Tags (comma separated)</label>
                    <input type="text" value={newProject.tags} onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} placeholder="e.g. React, Node.js, MongoDB" />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Project Image</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} style={{ flex: 1 }} />
                        <span style={{ fontSize: '12px', color: '#666' }}>{uploadingImage ? 'Uploading...' : ''}</span>
                      </div>
                      <div style={{ textAlign: 'center', fontSize: '12px', color: '#999' }}>— OR —</div>
                      <input type="url" value={newProject.image} onChange={(e) => setNewProject({ ...newProject, image: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} placeholder="Paste image URL directly" />
                      {newProject.image && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: '#f8f9fa', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
                          <img src={newProject.image} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                          <a href={newProject.image} target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '500', flex: 1 }}>
                            View Image
                          </a>
                          <button onClick={() => setNewProject({ ...newProject, image: '' })} style={{ padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>GitHub URL</label>
                    <input type="url" value={newProject.github} onChange={(e) => setNewProject({ ...newProject, github: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} placeholder="https://github.com/..." />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Live Demo URL</label>
                    <input type="url" value={newProject.live} onChange={(e) => setNewProject({ ...newProject, live: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} placeholder="https://..." />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleAddProject} style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>Add</button>
                    <button onClick={() => setIsAddingProject(false)} style={{ padding: '10px 20px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Project Form */}
            {editingProject && (
              <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '30px', border: '2px solid #667eea' }}>
                <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>Edit Project</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Title</label>
                    <input type="text" value={editingProject.title} onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Description</label>
                    <textarea value={editingProject.description} onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })} rows={4} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Category</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <select value={editingProject.category && ['MERN Stack', 'React / UI', 'Backend', 'Frontend', 'Full Stack', 'Mobile Development', 'DevOps', 'Machine Learning', 'Data Science', 'Blockchain', 'Python', 'JavaScript', 'TypeScript'].includes(editingProject.category) ? editingProject.category : 'custom'} onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value === 'custom' ? '' : e.target.value })} style={{ flex: '1', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}>
                        <option value="custom">Custom (type below)</option>
                        <option value="MERN Stack">MERN Stack</option>
                        <option value="React / UI">React / UI</option>
                        <option value="Backend">Backend</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Full Stack">Full Stack</option>
                        <option value="Mobile Development">Mobile Development</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Blockchain">Blockchain</option>
                        <option value="Python">Python</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="TypeScript">TypeScript</option>
                      </select>
                      <input type="text" value={editingProject.category && !['MERN Stack', 'React / UI', 'Backend', 'Frontend', 'Full Stack', 'Mobile Development', 'DevOps', 'Machine Learning', 'Data Science', 'Blockchain', 'Python', 'JavaScript', 'TypeScript'].includes(editingProject.category) ? editingProject.category : ''} onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })} placeholder="Type custom category" style={{ flex: '1', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Tags (comma separated)</label>
                    <input type="text" value={editingProject.tags} onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Project Image</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} style={{ flex: 1 }} />
                        <span style={{ fontSize: '12px', color: '#666' }}>{uploadingImage ? 'Uploading...' : ''}</span>
                      </div>
                      <div style={{ textAlign: 'center', fontSize: '12px', color: '#999' }}>— OR —</div>
                      <input type="url" value={editingProject.image} onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} placeholder="Paste image URL directly" />
                      {editingProject.image && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: '#f8f9fa', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
                          <img src={editingProject.image} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                          <a href={editingProject.image} target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '500', flex: 1 }}>
                            View Image
                          </a>
                          <button onClick={() => setEditingProject({ ...editingProject, image: '' })} style={{ padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>GitHub URL</label>
                    <input type="url" value={editingProject.github} onChange={(e) => setEditingProject({ ...editingProject, github: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Live Demo URL</label>
                    <input type="url" value={editingProject.live} onChange={(e) => setEditingProject({ ...editingProject, live: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleUpdateProject} style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>Update</button>
                    <button onClick={() => setEditingProject(null)} style={{ padding: '10px 20px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {/* Projects Grid */}
            {!isAddingProject && !editingProject && (
              <div>
                {projects.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    <p>No projects yet. Click "Add Project" to create your first entry.</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {projects.map((project) => (
                      <div key={project._id} style={{ background: '#f8f9fa', border: '2px solid #e0e0e0', borderRadius: '12px', overflow: 'hidden' }}>
                        {project.image ? (
                          <img src={project.image} alt={project.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '180px', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                            No Image
                          </div>
                        )}
                        <div style={{ padding: '16px' }}>
                          <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>{project.title}</h4>
                          <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '13px', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {project.description}
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                            {project.tags && project.tags.map((tag, index) => (
                              <span key={index} style={{ fontSize: '11px', fontWeight: 600, color: '#667eea', background: 'rgba(102, 126, 234, 0.04)', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(102, 126, 234, 0.08)' }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #e0e0e0', paddingTop: '12px' }}>
                            <button onClick={() => handleEditProject(project)} style={{ padding: '6px 12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Edit size={14} /> Edit
                            </button>
                            <button onClick={() => handleDeleteProject(project._id)} style={{ padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
