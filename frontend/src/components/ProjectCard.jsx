import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const ProjectCard = ({ title, description, category, tags, image, github, live }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      style={{
        background: 'var(--bg-secondary)',
        border: '1.5px solid var(--border-color)',
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        height: '100%',
        boxShadow: 'var(--shadow-premium)',
        transition: 'var(--transition-smooth)'
      }}
    >
      {/* Project Image Panel */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '220px', background: 'var(--bg-tertiary)' }}>
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
        />
        
        {/* Floating Category Badge */}
        <span
          className="badge"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            fontSize: '10px',
            fontWeight: 700,
            background: 'var(--bg-secondary)',
            color: 'var(--accent-secondary)',
            border: '1.5px solid var(--border-color)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          {category}
        </span>
      </div>

      {/* Project Content Panel */}
      <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '14px' }}>
        <h3 
          style={{ 
            fontSize: '20px', 
            fontWeight: 600, 
            color: 'var(--text-primary)', 
            fontFamily: 'var(--font-sans)',
            letterSpacing: '-0.3px'
          }}
        >
          {title}
        </h3>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', flexGrow: 1, lineHeight: 1.65 }}>
          {description}
        </p>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '8px 0' }}>
          {tags.map((tag) => (
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

        {/* Footer links */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '12px', 
            borderTop: '1.5px solid var(--border-color)', 
            paddingTop: '20px', 
            marginTop: 'auto' 
          }}
        >
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              flex: 1,
              justifyContent: 'center',
              borderRadius: '50px'
            }}
          >
            <Github size={14} /> Github
          </a>
          {live ? (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                padding: '8px 16px',
                fontSize: '13px',
                flex: 1,
                justifyContent: 'center',
                borderRadius: '50px',
                fontWeight: 600
              }}
            >
              <ExternalLink size={14} /> Demo
            </a>
          ) : (
            <button
              disabled
              style={{
                padding: '8px 16px',
                fontSize: '13px',
                flex: 1,
                justifyContent: 'center',
                borderRadius: '50px',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
                border: '1.5px solid var(--border-color)',
                cursor: 'not-allowed',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                opacity: 0.4
              }}
            >
              <ExternalLink size={14} /> Demo
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
