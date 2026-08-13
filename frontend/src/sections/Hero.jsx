import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Star, Linkedin, Github, Code, Sparkles } from 'lucide-react';
import userImg from '../assets/1769700459085.jfif';
import api from '../lib/axios';

const Hero = () => {
  const [name, setName] = useState('Dewmini Costa');
  const [title, setTitle] = useState('Full-Stack Developer');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await api.get('/portfolio');
        if (response.data?.success) {
          const portfolio = response.data.data;
          if (portfolio.name) setName(portfolio.name);
          if (portfolio.title) setTitle(portfolio.title);
        }
      } catch (error) {
        console.error('Failed to fetch portfolio:', error.message);
      }
    };
    fetchPortfolio();
  }, []);



  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        padding: '140px 0 80px',
        backgroundColor: 'var(--bg-primary)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background glows */}
      <div className="ambient-glow" style={{ top: '-10%', right: '5%' }} />
      <div className="ambient-glow-gold" style={{ bottom: '20%', left: '-5%' }} />

      {/* Subtle Grid overlay for high-tech look */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.7,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div
        className="section-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '60px',
          width: '100%',
          flexGrow: 1,
          paddingBottom: '80px',
          zIndex: 1
        }}
      >
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: '1 1 500px', textAlign: 'left', zIndex: 2 }}
        >
          {/* Hello Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: '28px' }}
          >
            <span className="dashed-badge">
              <Sparkles size={13} style={{ color: 'var(--accent-primary)' }} />
              Hello There!
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontSize: 'calc(2.6rem + 2vw)',
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              marginBottom: '24px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700
            }}
          >
            I'm{' '}
            <span 
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontWeight: 400, 
                fontStyle: 'italic',
                color: 'var(--accent-primary)',
                position: 'relative',
                display: 'inline-block'
              }}
            >
              {name}
            </span>
            <br />
            <span
              style={{
                fontSize: 'calc(1.8rem + 1.2vw)',
                fontWeight: 600,
                background: 'linear-gradient(90deg, var(--text-primary), var(--text-secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'block',
                marginTop: '8px'
              }}
            >
              {title}
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              color: 'var(--text-secondary)',
              fontSize: '16px',
              marginBottom: '40px',
              maxWidth: '500px',
              lineHeight: 1.7,
            }}
          >
            Passionate about building high-performance, secure web applications and translating complex business requirements into sleek, interactive digital solutions.
          </motion.p>

          {/* Action buttons & Socials Row */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <motion.a 
              href="#projects" 
              className="btn btn-primary" 
              style={{ gap: '10px' }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Projects
              <ArrowUpRight size={16} />
            </motion.a>
            
            <motion.a 
              href="#contact" 
              className="btn btn-secondary" 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Let's Talk
            </motion.a>
            
            <div style={{ width: '1px', height: '24px', background: 'var(--border-color)', margin: '0 8px' }} />

            <motion.a
              href="https://www.linkedin.com/in/dewminicosta/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1.5px solid var(--border-color)',
                color: 'var(--text-secondary)',
                background: 'transparent',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition-smooth)'
              }}
              whileHover={{ scale: 1.08, color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', background: 'rgba(229, 193, 88, 0.05)' }}
              whileTap={{ scale: 0.95 }}
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </motion.a>

            <motion.a
              href="https://github.com/Dewminicosta"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1.5px solid var(--border-color)',
                color: 'var(--text-secondary)',
                background: 'transparent',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition-smooth)'
              }}
              whileHover={{ scale: 1.08, color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', background: 'rgba(229, 193, 88, 0.05)' }}
              whileTap={{ scale: 0.95 }}
              title="GitHub"
            >
              <Github size={18} />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Column - Layered Visual Profile */}
        <div
          style={{
            flex: '1 1 400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Animated decorative ring background */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            style={{
              position: 'absolute',
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              border: '1.5px dashed var(--border-color)',
              opacity: 0.6,
              zIndex: 0
            }}
          />

          {/* Main Visual Capsule */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              width: '310px',
              height: '380px',
              borderRadius: '160px', /* Premium Capsule shape */
              overflow: 'hidden',
              boxShadow: 'var(--shadow-premium)',
              zIndex: 2,
              background: 'var(--bg-secondary)',
              border: '3px solid var(--border-color)',
            }}
          >
            {/* Ambient overlay behind image */}
            <div 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(to bottom, transparent 60%, var(--bg-secondary) 100%)',
                zIndex: 1
              }} 
            />

            <img
              src={userImg}
              alt={name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
              }}
            />
          </motion.div>

          {/* Floating Badge 1: Product Developer */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 50 }}
            animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
            transition={{ 
              opacity: { delay: 0.8, duration: 0.5 },
              x: { delay: 0.8, duration: 0.5 },
              y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
            }}
            className="glass-panel"
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '-20px',
              padding: '10px 18px',
              borderRadius: '20px',
              zIndex: 3,
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-primary)',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-secondary)' }} />
            Product Developer
          </motion.div>

          {/* Floating Badge 2: UI/UX Designer */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: -50 }}
            animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
            transition={{ 
              opacity: { delay: 1, duration: 0.5 },
              x: { delay: 1, duration: 0.5 },
              y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.5 }
            }}
            className="glass-panel"
            style={{
              position: 'absolute',
              top: '40px',
              right: '-20px',
              padding: '10px 18px',
              borderRadius: '20px',
              zIndex: 3,
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-primary)',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
            UI/UX Designer
          </motion.div>

          {/* Circular Rotating Sticker Stamp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="rotating-sticker"
            style={{
              position: 'absolute',
              bottom: '-15px',
              right: '-15px',
              width: '76px',
              height: '76px',
              background: 'var(--accent-primary)',
              borderRadius: '50%',
              zIndex: 4,
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg viewBox="0 0 100 100" width="70" height="70">
              <path id="circlePath" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
              <text fontStyle="var(--font-sans)" fontSize="9" fontWeight="800" fill="var(--bg-primary)" letterSpacing="2.5">
                <textPath href="#circlePath" startOffset="0%">HIRE ME • HIRE ME • HIRE ME • </textPath>
              </text>
            </svg>
          </motion.div>
        </div>
      </div>


    </section>
  );
};

export default Hero;
