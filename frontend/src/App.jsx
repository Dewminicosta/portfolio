import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import AdminInbox from './components/AdminInbox';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import api from './lib/axios';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [messages, setMessages] = useState([]);
  const [isAdminInboxOpen, setIsAdminInboxOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // Set initial theme class on body
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Fetch messages from DB
  const fetchMessages = async () => {
    try {
      const response = await api.get('/contact/messages');
      if (response.data?.success) {
        setMessages(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Update status (mark read/unread)
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await api.patch(`/contact/messages/${id}`, { status: newStatus });
      if (response.data?.success) {
        setMessages((prev) =>
          prev.map((msg) => (msg._id === id ? { ...msg, status: newStatus } : msg))
        );
      }
    } catch (error) {
      console.error('Failed to update status:', error.message);
    }
  };

  // Delete message
  const handleDeleteMessage = async (id) => {
    try {
      const response = await api.delete(`/contact/messages/${id}`);
      if (response.data?.success) {
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete message:', error.message);
    }
  };

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const isDashboardRoute = location.pathname === '/dashboard';

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/dashboard" element={
          isAuthenticated ? (
            <Dashboard 
              onLogout={handleLogout}
              messages={messages}
              onRefresh={fetchMessages}
              onDelete={handleDeleteMessage}
              onUpdateStatus={handleUpdateStatus}
            />
          ) : (
            <Login onLogin={handleLogin} />
          )
        } />
        <Route path="/" element={
          <>
            <Navbar
              theme={theme}
              toggleTheme={toggleTheme}
              toggleAdminInbox={() => setIsAdminInboxOpen(!isAdminInboxOpen)}
              messageCount={unreadCount}
            />
            <main style={{ flexGrow: 1 }}>
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Contact onMessageSent={fetchMessages} />
            </main>
            <Footer />
            <AdminInbox
              isOpen={isAdminInboxOpen}
              onClose={() => setIsAdminInboxOpen(false)}
              messages={messages}
              onRefresh={fetchMessages}
              onDelete={handleDeleteMessage}
              onUpdateStatus={handleUpdateStatus}
            />
          </>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
