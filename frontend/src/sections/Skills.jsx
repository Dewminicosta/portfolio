import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Settings, ArrowRight, Sparkles } from 'lucide-react';
import { skillCategories } from '../data/skills';

const Skills = () => {
  // Map index to service icons
  const getIcon = (index) => {
    switch (index) {
      case 0: return <Layout size={22} color="var(--accent-primary)" />;
      case 1: return <Server size={22} color="var(--accent-primary)" />;
      default: return <Settings size={22} color="var(--accent-primary)" />;
    }
  };

  const getSub = (index) => {
    switch (index) {
      case 0: return "Sleek frontend development compiling high-fidelity designs into responsive pixel-perfect React pages.";
      case 1: return "Secure backend server architectures implementing RESTful APIs, database logic, and systems engineering.";
      default: return "Source control pipelines, containerized environments, and cloud deployment setups.";
    }
  };

  return (
    <section 
      id="skills" 
      style={{ 
        backgroundColor: 'var(--bg-primary)', 
        padding: '120px 0',
        position: 'relative'
      }}
    >
      <div className="section-container">
        
        {/* Services Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            marginBottom: '60px', 
            flexWrap: 'wrap', 
            gap: '24px' 
          }}
        >
          <div style={{ textAlign: 'left' }}>
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
              — Services
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
              Services I Provide
            </motion.h2>
          </div>
          
          <motion.a 
            href="#projects" 
            className="btn btn-secondary" 
            style={{ gap: '10px', padding: '10px 24px' }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            View Projects <ArrowRight size={15} />
          </motion.a>
        </motion.div>

        {/* Services Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="service-card"
            >
              {/* Badge Icon */}
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '28px'
                }}
              >
                {getIcon(index)}
              </div>

              {/* Title */}
              <h3 
                style={{ 
                  fontSize: '20px', 
                  fontWeight: 600, 
                  marginBottom: '14px', 
                  color: 'var(--text-primary)' 
                }}
              >
                {category.title}
              </h3>

              {/* Description */}
              <p 
                style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: '14.5px', 
                  lineHeight: 1.65, 
                  marginBottom: '28px' 
                }}
              >
                {getSub(index)}
              </p>

              {/* Skills badges inside card */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                {category.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill.name}
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      letterSpacing: '0.3px',
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>

              {/* Contact Link */}
              <a
                href="#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--accent-primary)',
                  transition: 'gap 0.3s ease, color 0.3s ease',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.gap = '10px';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.gap = '6px';
                  e.currentTarget.style.color = 'var(--accent-primary)';
                }}
              >
                Learn More <ArrowRight size={14} style={{ color: 'var(--accent-secondary)' }} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
