import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, CheckCircle2 } from 'lucide-react';
import userImg from '../assets/1769700459085.jfif';
import api from '../lib/axios';

const About = () => {
  const [cvUrl, setCvUrl] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [name, setName] = useState('Dewmini Costa');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await api.get('/portfolio');
        if (response.data?.success) {
          const portfolio = response.data.data;
          let url = portfolio.cv || '';
          if (url && !url.startsWith('http')) {
            url = 'https://' + url;
          }
          setCvUrl(url);
          if (portfolio.about) {
            setAboutText(portfolio.about);
          }
          if (portfolio.name) {
            setName(portfolio.name);
          }
        }
      } catch (error) {
        console.error('Failed to fetch portfolio:', error.message);
      }
    };

    fetchPortfolio();
  }, []);



  const floatingTags = [
    'React', 'Node.js', 'Express', 'MongoDB',
    'Mongoose', 'REST API', 'JavaScript'
  ];

  return (
    <section
      id="about"
      style={{
        backgroundColor: 'var(--bg-dark)',
        color: 'var(--text-light)',
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative background element */}
      <div 
        style={{
          position: 'absolute',
          top: '10%',
          left: '80%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229, 193, 88, 0.05) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none'
        }}
      />

      <div
        className="section-container"
        style={{
          display: 'flex',
          gap: '70px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        {/* Left column - Masked Photo with overlapping tags */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            flex: '1 1 400px',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            height: '440px',
          }}
        >
          {/* Main Gold Circle */}
          <div
            style={{
              position: 'relative',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              border: '2.5px dashed var(--accent-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 45px rgba(0,0,0,0.25)',
            }}
          >
            <div
              style={{
                width: '290px',
                height: '290px',
                borderRadius: '50%',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '4px solid var(--accent-secondary)',
                boxSizing: 'border-box',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
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
            </div>
          </div>

          {/* Overlapping Tech Badges Container */}
          <div
            style={{
              position: 'absolute',
              bottom: '15px',
              width: '100%',
              maxWidth: '380px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
              zIndex: 3
            }}
          >
            {floatingTags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#ffffff',
                  background: 'rgba(3, 5, 4, 0.85)',
                  border: '1px solid rgba(255, 184, 0, 0.3)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                  backdropFilter: 'blur(6px)',
                  letterSpacing: '0.3px',
                }}
                whileHover={{ scale: 1.05, borderColor: 'var(--accent-secondary)' }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Right column - Biography & Stats */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: '1 1 500px', textAlign: 'left' }}
        >
          <motion.span
            initial={{ opacity: 0, y: -15 }}
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
            — About Me
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '40px',
              color: 'var(--text-light)',
              fontWeight: 400,
              marginBottom: '24px'
            }}
          >
            Who is <span style={{ color: 'var(--accent-secondary)', fontStyle: 'italic' }}>{name}</span>?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              color: 'var(--text-light-secondary)',
              fontSize: '16px',
              lineHeight: 1.75,
              marginBottom: '35px'
            }}
          >
            {aboutText || 'I am a full-stack engineer who loves bridging the gap between design and implementation. I design clean layouts, compile high-speed server APIs, and map optimized database queries. With the MERN stack, I am able to control the user experience from the database collections up to the pixel rendering in the browser.'}
          </motion.p>



          {/* CTA & Signature */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}
          >
            {cvUrl ? (
              <motion.a 
                href={cvUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-gold" 
                style={{ gap: '10px' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Download CV <ArrowDown size={16} />
              </motion.a>
            ) : (
              <span style={{ color: 'var(--text-light-secondary)', fontSize: '13px' }}>
                No CV uploaded yet
              </span>
            )}
            
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '24px',
                color: 'var(--accent-secondary)',
                letterSpacing: '0.5px'
              }}
            >
              {name}
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
