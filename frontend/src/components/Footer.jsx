import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-dark-secondary)',
        color: 'var(--text-light)',
        borderTop: '1.5px solid var(--border-light)',
        padding: '50px 24px',
        marginTop: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        zIndex: 5
      }}
    >
      <div style={{ display: 'flex', gap: '16px' }}>
        <a
          href="https://github.com/Dewminicosta?tab=stars"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'transparent',
            border: '1.5px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--text-light-secondary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'var(--transition-smooth)',
            textDecoration: 'none'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-secondary)';
            e.currentTarget.style.color = 'var(--text-light)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = 'var(--text-light-secondary)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <Github size={18} />
        </a>
        <a
          href="https://www.linkedin.com/in/dewminicosta"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'transparent',
            border: '1.5px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--text-light-secondary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'var(--transition-smooth)',
            textDecoration: 'none'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-secondary)';
            e.currentTarget.style.color = 'var(--text-light)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = 'var(--text-light-secondary)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <Linkedin size={18} />
        </a>
        <a
          href="mailto:vidco407@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'transparent',
            border: '1.5px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--text-light-secondary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'var(--transition-smooth)',
            textDecoration: 'none'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-secondary)';
            e.currentTarget.style.color = 'var(--text-light)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = 'var(--text-light-secondary)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <Mail size={18} />
        </a>
      </div>
      
      <p style={{ color: 'var(--text-light-secondary)', fontSize: '13.5px', textAlign: 'center', letterSpacing: '0.2px' }}>
        © {new Date().getFullYear()} Dewmini Costa. Built with React, Node.js & MongoDB.
      </p>

      <button
        onClick={scrollToTop}
        style={{
          padding: 0,
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          border: '1.5px solid rgba(255, 255, 255, 0.1)',
          color: 'var(--text-light-secondary)',
          cursor: 'pointer',
          transition: 'var(--transition-smooth)',
          outline: 'none'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-secondary)';
          e.currentTarget.style.color = 'var(--text-light)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.color = 'var(--text-light-secondary)';
          e.currentTarget.style.background = 'transparent';
        }}
        title="Scroll to top"
      >
        <ArrowUp size={16} />
      </button>
    </footer>
  );
};

export default Footer;
