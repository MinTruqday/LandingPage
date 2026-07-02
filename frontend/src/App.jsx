import React, { useEffect, useContext, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { initScrollTracking } from './utils/tracking';
import { AppProvider, AppContext } from './context/AppContext';
import { Toaster } from 'react-hot-toast';

const Features = lazy(() => import('./components/Features'));
const Specs = lazy(() => import('./components/Specs'));
const Ecommerce = lazy(() => import('./components/Ecommerce'));
const RegistrationForm = lazy(() => import('./components/RegistrationForm'));
const Checkout = lazy(() => import('./components/Checkout'));
const ProductsPage = lazy(() => import('./components/ProductsPage'));
const AuthPage = lazy(() => import('./components/AuthPage'));
const FavoritesPage = lazy(() => import('./components/FavoritesPage'));
const Chatbot = lazy(() => import('./components/Chatbot'));

function MainApp() {
  const { currentView } = useContext(AppContext);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'checkout':
        return <Suspense fallback={null}><Checkout /></Suspense>;
      case 'products':
        return <Suspense fallback={null}><ProductsPage /></Suspense>;
      case 'auth':
        return <Suspense fallback={null}><AuthPage /></Suspense>;
      case 'favorites':
        return <Suspense fallback={null}><FavoritesPage /></Suspense>;
      default:
        return (
          <>
            <Hero />
            <Suspense fallback={null}>
              <Features />
              <Specs />
              <Ecommerce />
              <RegistrationForm />
            </Suspense>
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
