import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const Contact = ({ onMessageSent }) => {
  const contactDetails = [
    { icon: <Mail size={18} color="var(--accent-primary)" />, label: 'Email', value: 'vidco407@gmail.com', href: 'mailto:vidco407@gmail.com' },
    { icon: <Phone size={18} color="var(--accent-primary)" />, label: 'Phone', value: '+94 70 620 2560', href: 'tel:+94706202560' },
    { icon: <MapPin size={18} color="var(--accent-primary)" />, label: 'Location', value: 'Sri Lanka', href: null }
  ];

  return (
    <section 
      id="contact" 
      style={{ 
        backgroundColor: 'var(--bg-primary)', 
        padding: '120px 0',
        position: 'relative'
      }}
    >
      {/* Ambient background glow */}
      <div className="ambient-glow" style={{ bottom: '-10%', right: '20%' }} />

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
            — Contact
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
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Get in touch for contract inquiries, collaborations, or general questions
          </motion.p>
        </motion.div>

        <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap', marginTop: '40px' }}>
          
          {/* Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: '28px', textAlign: 'left' }}
          >
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ 
                fontSize: '24px', 
                fontWeight: 600, 
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
                lineHeight: 1.3,
                letterSpacing: '-0.3px'
              }}
            >
              Let's discuss your next{' '}
              <span 
                style={{ 
                  color: 'var(--accent-primary)',
                  fontStyle: 'italic',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400
                }}
              >
                big idea
              </span>.
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7 }}
            >
              I'm always open to learning, building new things, and connecting with people in the tech community. Feel free to reach out and let's connect!
            </motion.p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {contactDetails.map((detail, index) => (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1.5px solid var(--border-color)',
                    padding: '18px 24px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    boxShadow: 'var(--shadow-premium)',
                    transition: 'border-color 0.3s ease'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--accent-secondary)')}
                  onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                >
                  <div
                    style={{ 
                      background: 'var(--bg-tertiary)', 
                      border: '1px solid var(--border-color)',
                      padding: '10px', 
                      borderRadius: '12px', 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {detail.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                      {detail.label}
                    </div>
                    {detail.href ? (
                      <a 
                        href={detail.href} 
                        style={{ 
                          fontSize: '15px', 
                          fontWeight: 600, 
                          color: 'var(--text-primary)',
                          textDecoration: 'none',
                          transition: 'color 0.2s ease'
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent-secondary)')}
                        onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {detail.value}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ flex: '2 1 420px', display: 'flex' }}
          >
            <ContactForm onMessageSent={onMessageSent} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
