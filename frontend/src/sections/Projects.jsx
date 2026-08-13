import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../lib/axios';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/project');
      if (response.data?.success) {
        setProjects(response.data.data);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();

    const handleProjectsUpdate = () => {
      fetchProjects();
    };

    window.addEventListener('projectsUpdated', handleProjectsUpdate);
    return () => {
      window.removeEventListener('projectsUpdated', handleProjectsUpdate);
    };
  }, []);

  const categories = ['All', 'MERN Stack', 'React / UI', 'Backend'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((project) => project.category === activeFilter);

  return (
    <section 
      id="projects" 
      style={{ 
        backgroundColor: 'var(--bg-primary)', 
        padding: '120px 0',
        position: 'relative'
      }}
    >
      <div className="section-container">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ 
              fontSize: '13px', 
              fontWeight: 600, 
              color: 'var(--accent-secondary)', 
              textTransform: 'uppercase', 
              letterSpacing: '1.5px', 
              display: 'block', 
              marginBottom: '12px' 
            }}
          >
            — Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '40px', 
              fontWeight: 400,
              color: 'var(--text-primary)' 
            }}
          >
            Selected Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            A showcase of my recent full-stack engineering and UI/UX design developments
          </motion.p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '60px', flexWrap: 'wrap' }}
        >
          {categories.map((cat, index) => {
            const isActive = activeFilter === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  cursor: 'pointer',
                  border: isActive ? '1.5px solid var(--accent-primary)' : '1.5px solid var(--border-color)',
                  background: isActive ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                  color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  padding: '8px 22px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  borderRadius: '50px',
                  transition: 'var(--transition-smooth)',
                  outline: 'none',
                }}
              >
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects Grid Container */}
        <motion.div
          layout
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
            gap: '30px',
            alignItems: 'stretch'
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                style={{ height: '100%' }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  category={project.category}
                  tags={project.tags}
                  image={project.image}
                  github={project.github}
                  live={project.live}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
