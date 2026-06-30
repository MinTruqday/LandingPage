import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Ecommerce from './components/Ecommerce';
import RegistrationForm from './components/RegistrationForm';
import Chatbot from './components/Chatbot';
import { initScrollTracking } from './utils/tracking';
import { AppProvider } from './context/AppContext';

function App() {
  useEffect(() => {
    initScrollTracking();
  }, []);

  return (
    <AppProvider>
      <div className="app-container">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Ecommerce />
          <RegistrationForm />
        </main>
        <Chatbot />
        <footer style={{ textAlign: 'center', padding: '40px', borderTop: '1px solid var(--border-color)', marginTop: '40px' }}>
          <p>&copy; 2026 Bản quyền thuộc về Công ty. Landing Page iPhone 17 Pro.</p>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;
