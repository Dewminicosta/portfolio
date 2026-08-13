import React from 'react';
import { motion } from 'framer-motion';

const SkillBadge = ({ name, level, color }) => {
  return (
    <motion.div
      className="glass"
      whileHover={{ y: -3, scale: 1.02 }}
      style={{
        padding: '12px 18px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flex: '1 1 calc(33% - 16px)',
        minWidth: '140px',
        borderLeft: `3px solid ${color || 'var(--accent-primary)'}`
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>{name}</span>
        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>{level}%</span>
      </div>
      
      {/* Skill progress bar */}
      <div style={{ height: '4px', width: '100%', background: 'var(--border-glass)', borderRadius: '2px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ height: '100%', background: color || 'var(--accent-primary)', borderRadius: '2px' }}
        />
      </div>
    </motion.div>
  );
};

export default SkillBadge;
