import React, { useEffect, useContext, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Specs from './components/Specs';
import Ecommerce from './components/Ecommerce';
import RegistrationForm from './components/RegistrationForm';
import Checkout from './components/Checkout';
import ProductsPage from './components/ProductsPage';
import { initScrollTracking } from './utils/tracking';
import { AppProvider, AppContext } from './context/AppContext';

import AuthPage from './components/AuthPage';
import FavoritesPage from './components/FavoritesPage';
import AdminTracking from './components/AdminTracking';
import { Toaster } from 'react-hot-toast';

const Chatbot = lazy(() => import('./components/Chatbot'));

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
      case 'admin-tracking':
        return <AdminTracking />;
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
      {currentView !== 'auth' && <Navbar />}
      <main>
        {renderView()}
      </main>
      {currentView === 'home' && (
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      )}
      {currentView !== 'auth' && (
        <footer style={{ textAlign: 'center', padding: '40px', borderTop: '1px solid var(--border-color)', marginTop: '40px' }}>
          <p>&copy; 2026 Bản quyền thuộc về Cao Minh Trung.</p>
        </footer>
      )}
    </div>
  );
}

function App() {
  useEffect(() => {
    initScrollTracking();
  }, []);

  return (
    <AppProvider>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--secondary-bg)',
            color: 'var(--text-color)',
            border: '1px solid var(--border-color)'
          }
        }}
      />
      <MainApp />
    </AppProvider>
  );
}

export default App;
