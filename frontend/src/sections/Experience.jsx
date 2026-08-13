import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase } from 'lucide-react';
import api from '../lib/axios';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  const fetchExperiences = async () => {
    try {
      const response = await api.get('/experience');
      if (response.data?.success) {
        setExperiences(response.data.data);
      }
    } catch (error) {
      console.error('Error loading experiences:', error);
    }
  };

  useEffect(() => {
    fetchExperiences();

    // Listen for updates from dashboard
    window.addEventListener('experiencesUpdated', fetchExperiences);

    return () => {
      window.removeEventListener('experiencesUpdated', fetchExperiences);
    };
  }, []);

  return (
    <section 
      id="experience" 
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
            — Timeline
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
            Professional Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            A history of my roles, milestones, and technical contributions in software engineering
          </motion.p>
        </motion.div>

        {/* Timeline Path */}
        <div
          style={{
            position: 'relative',
            maxWidth: '800px',
            margin: '0 auto',
            paddingLeft: '32px',
            textAlign: 'left'
          }}
        >
          {/* Vertical timeline line with gold-emerald gradient */}
          <div
            style={{
              position: 'absolute',
              left: '8px',
              top: '12px',
              bottom: '12px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--border-color), var(--accent-secondary), var(--border-color))'
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {experiences.map((exp, index) => (
              <div key={exp._id} style={{ position: 'relative' }}>
                
                {/* Timeline circle node */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  style={{
                    position: 'absolute',
                    left: '-29px',
                    top: '8px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'var(--accent-secondary)',
                    boxShadow: '0 0 0 4px rgba(16, 185, 129, 0.15)',
                    zIndex: 2
                  }}
                />

                {/* Experience Card */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1.5px solid var(--border-color)',
                    boxShadow: 'var(--shadow-premium)',
                    padding: '30px',
                    borderRadius: '20px',
                    position: 'relative',
                    transition: 'border-color 0.3s ease'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--accent-secondary)')}
                  onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                >
                  {/* Role & Duration */}
                  <div 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      flexWrap: 'wrap', 
                      gap: '12px', 
                      marginBottom: '8px' 
                    }}
                  >
                    <h3 
                      style={{ 
                        fontSize: '19px', 
                        fontWeight: 600, 
                        color: 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <Briefcase size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                      {exp.role}
                    </h3>
                    <span 
                      style={{ 
                        fontSize: '13px', 
                        fontWeight: 600, 
                        color: 'var(--accent-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'var(--bg-tertiary)',
                        padding: '4px 12px',
                        borderRadius: '30px',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <Calendar size={12} />
                      {exp.duration}
                    </span>
                  </div>

                  {/* Company */}
                  <div 
                    style={{ 
                      fontSize: '14.5px', 
                      color: 'var(--accent-secondary)', 
                      fontWeight: 600, 
                      marginBottom: '18px' 
                    }}
                  >
                    {exp.company}
                  </div>

                  {/* Description */}
                  <p
                    style={{ 
                      color: 'var(--text-secondary)', 
                      fontSize: '14.5px', 
                      lineHeight: 1.7, 
                      marginBottom: '20px' 
                    }}
                  >
                    {exp.description}
                  </p>

                  {/* Tech tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          background: 'var(--bg-tertiary)',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          border: '1.5px solid var(--border-color)',
                          letterSpacing: '0.3px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
