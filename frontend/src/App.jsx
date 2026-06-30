import React, { useEffect, useContext } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Specs from './components/Specs';
import Ecommerce from './components/Ecommerce';
import RegistrationForm from './components/RegistrationForm';
import Chatbot from './components/Chatbot';
import Checkout from './components/Checkout';
import ProductsPage from './components/ProductsPage';
import { initScrollTracking } from './utils/tracking';
import { AppProvider, AppContext } from './context/AppContext';

import AuthPage from './components/AuthPage';
import FavoritesPage from './components/FavoritesPage';

function MainApp() {
  const { currentView } = useContext(AppContext);

  const renderView = () => {
    switch (currentView) {
      case 'checkout':
        return <Checkout />;
      case 'products':
        return <ProductsPage />;
      case 'auth':
        return <AuthPage />;
      case 'favorites':
        return <FavoritesPage />;
      default:
        return (
          <>
            <Hero />
            <Features />
            <Specs />
            <Ecommerce />
            <RegistrationForm />
          </>
        );
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <main>
        {renderView()}
      </main>
      {currentView === 'home' && <Chatbot />}
      <footer style={{ textAlign: 'center', padding: '40px', borderTop: '1px solid var(--border-color)', marginTop: '40px' }}>
        <p>&copy; 2026 Bản quyền thuộc về Cao Minh Trung.</p>
      </footer>
    </div>
  );
}

function App() {
  useEffect(() => {
    initScrollTracking();
  }, []);

  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;
