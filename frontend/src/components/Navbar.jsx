import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Inbox } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ theme, toggleTheme, toggleAdminInbox, messageCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: scrolled ? '15px' : '25px',
        left: '5%',
        right: '5%',
        width: '90%',
        zIndex: 100,
        height: scrolled ? '62px' : '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 4%',
        transition: 'var(--transition-smooth)',
        borderRadius: '50px',
        border: '1px solid var(--nav-border)',
        backgroundColor: 'var(--nav-bg)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: scrolled ? 'var(--shadow-premium)' : 'none',
      }}
    >
      {/* Brand Logo */}
      <motion.a
        href="#home"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.03 }}
        style={{ 
          fontSize: '22px', 
          fontWeight: 600, 
          letterSpacing: '-0.5px', 
          color: 'var(--text-primary)', 
          fontFamily: 'var(--font-serif)',
          textDecoration: 'none'
        }}
      >
        Dewmini Costa<span style={{ color: 'var(--accent-secondary)' }}>.</span>
      </motion.a>

      {/* Desktop Links */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="nav-links-desktop"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        }}
      >
        {navLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.href}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
            whileHover={{ y: -1 }}
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              transition: 'color 0.3s ease',
              display: 'inline-block',
              textDecoration: 'none',
              position: 'relative'
            }}
            onMouseOver={(e) => (e.target.style.color = 'var(--text-primary)')}
            onMouseOut={(e) => (e.target.style.color = 'var(--text-secondary)')}
          >
            {link.name}
          </motion.a>
        ))}
      </motion.div>

      {/* Extra actions */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
      >
        {/* Inbox Button */}
        <motion.button
          onClick={toggleAdminInbox}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'relative',
            padding: '8px',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1.5px solid var(--border-color)',
            background: 'transparent',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
          title="Open Messages Inbox"
        >
          <Inbox size={18} style={{ color: 'var(--text-primary)' }} />
          {messageCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5, type: "spring" }}
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'var(--accent-secondary)',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: 700,
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              }}
            >
              {messageCount}
            </motion.span>
          )}
        </motion.button>

        {/* Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </motion.div>

        {/* Mobile menu Toggle */}
        <motion.button
          className="menu-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '4px',
            display: 'none',
          }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex' }}
              >
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex' }}
              >
                <Menu size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Floating Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: scrolled ? '75px' : '85px',
              left: 0,
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              gap: '12px',
              borderRadius: '24px',
              border: '1px solid var(--nav-border)',
              backgroundColor: 'var(--nav-bg)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-premium)',
            }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                whileHover={{ x: 6, color: 'var(--text-primary)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--border-color)',
                  display: 'block',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS Styles injection for mobile responsive navbar */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none !important;
          }
          .menu-toggle-btn {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
