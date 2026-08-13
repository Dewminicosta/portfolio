import React, { useState } from 'react';
import { X, Trash2, MailOpen, Mail, RefreshCw, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminInbox = ({ isOpen, onClose, messages, onRefresh, onDelete, onUpdateStatus }) => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredMessages = messages.filter((msg) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'unread' && msg.status === 'unread') ||
      (filter === 'read' && msg.status === 'read');

    const matchesSearch =
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase()) ||
      msg.subject.toLowerCase().includes(search.toLowerCase()) ||
      msg.message.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 150,
            }}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="glass"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '100%',
              maxWidth: '500px',
              height: '100vh',
              zIndex: 200,
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.3)',
              backgroundColor: 'var(--bg-secondary)',
              borderLeft: '1px solid var(--border-glass)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  Message Inbox
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                  Manage client inquiries from database
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={onRefresh}
                  className="btn btn-secondary"
                  style={{ padding: '8px', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Refresh messages"
                >
                  <RefreshCw size={16} />
                </button>
                <button
                  onClick={onClose}
                  className="btn btn-secondary"
                  style={{ padding: '8px', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Close inbox"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {/* Search input */}
              <div style={{ position: 'relative', width: '100%' }}>
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '40px', width: '100%' }}
                />
                <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              </div>

              {/* Filters */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {['all', 'unread', 'read'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className="badge"
                    style={{
                      cursor: 'pointer',
                      border: filter === f ? '1px solid var(--accent-primary)' : '1px solid var(--border-glass)',
                      background: filter === f ? 'var(--accent-bg-glow)' : 'transparent',
                      color: filter === f ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      textTransform: 'capitalize',
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages list */}
            <div
              style={{
                flexGrow: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                paddingRight: '4px',
              }}
            >
              {filteredMessages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
                  No messages found
                </div>
              ) : (
                filteredMessages.map((msg) => (
                  <div
                    key={msg._id}
                    className="glass"
                    style={{
                      padding: '16px',
                      borderRadius: '10px',
                      borderLeft: `4px solid ${msg.status === 'unread' ? 'var(--accent-primary)' : 'var(--border-glass)'}`,
                      position: 'relative',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
                        {msg.name}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', wordBreak: 'break-all' }}>
                      <strong>Email:</strong> {msg.email} <br />
                      <strong>Subject:</strong> {msg.subject}
                    </div>

                    <div
                      style={{
                        background: 'rgba(0,0,0,0.1)',
                        padding: '10px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: 'var(--text-primary)',
                        whiteSpace: 'pre-line',
                        border: '1px solid var(--border-glass)',
                        marginBottom: '12px',
                      }}
                    >
                      {msg.message}
                    </div>

                    {/* Actions on message */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                      <button
                        onClick={() => onUpdateStatus(msg._id, msg.status === 'unread' ? 'read' : 'unread')}
                        className="btn btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '12px', gap: '4px' }}
                      >
                        {msg.status === 'unread' ? (
                          <>
                            <MailOpen size={14} /> Mark Read
                          </>
                        ) : (
                          <>
                            <Mail size={14} /> Mark Unread
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => onDelete(msg._id)}
                        className="btn btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '12px', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)', gap: '4px' }}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdminInbox;
