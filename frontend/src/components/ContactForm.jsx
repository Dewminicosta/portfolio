import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import api from '../lib/axios';
import { validateForm } from '../utils/validation';

const ContactForm = ({ onMessageSent }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setStatusMessage('');

    try {
      const response = await api.post('/contact', values);
      if (response.data.success) {
        setSubmitStatus('success');
        setStatusMessage('Your message has been sent successfully!');
        setValues({ name: '', email: '', subject: '', message: '' });
        if (onMessageSent) onMessageSent();
      }
    } catch (error) {
      setSubmitStatus('error');
      const apiError = error.response?.data?.errors;
      if (apiError) {
        setErrors(apiError);
        setStatusMessage('Please fix the validation errors below.');
      } else {
        setStatusMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="glass-panel" 
      style={{ 
        padding: '36px', 
        borderRadius: '24px', 
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      <div className="form-group" style={{ margin: 0 }}>
        <label className="form-label" htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          className="form-input"
          placeholder="John Doe"
          disabled={isSubmitting}
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-group" style={{ margin: 0 }}>
        <label className="form-label" htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className="form-input"
          placeholder="john@example.com"
          disabled={isSubmitting}
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-group" style={{ margin: 0 }}>
        <label className="form-label" htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={values.subject}
          onChange={handleChange}
          className="form-input"
          placeholder="Project Inquiry"
          disabled={isSubmitting}
        />
        {errors.subject && <span className="form-error">{errors.subject}</span>}
      </div>

      <div className="form-group" style={{ margin: 0 }}>
        <label className="form-label" htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={handleChange}
          className="form-input"
          style={{ height: '140px', resize: 'vertical' }}
          placeholder="Hi, I'd like to collaborate with you on..."
          disabled={isSubmitting}
        />
        {errors.message && <span className="form-error">{errors.message}</span>}
      </div>

      {submitStatus && (
        <div
          style={{
            padding: '14px 18px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 500,
            background: submitStatus === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: submitStatus === 'success' ? '1.5px solid rgba(16, 185, 129, 0.2)' : '1.5px solid rgba(239, 68, 68, 0.2)',
            color: submitStatus === 'success' ? 'var(--accent-secondary)' : '#ef4444',
            textAlign: 'center'
          }}
        >
          {statusMessage}
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%', justifyContent: 'center', fontWeight: 600, padding: '14px' }}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={16} /> Sending...
          </>
        ) : (
          <>
            <Send size={16} /> Send Message
          </>
        )}
      </button>

      <style>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
};

export default ContactForm;
