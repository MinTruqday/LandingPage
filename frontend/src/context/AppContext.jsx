import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [viewedProducts, setViewedProducts] = useState(() => {
    const saved = localStorage.getItem('viewed');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('viewed', JSON.stringify(viewedProducts));
  }, [viewedProducts]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  
  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const addViewedProduct = (productId) => {
    setViewedProducts(prev => {
      if (!prev.includes(productId)) {
        return [...prev, productId].slice(-5); // Keep last 5
      }
      return prev;
    });
  };

  return (
    <AppContext.Provider value={{
      isDarkMode, toggleDarkMode,
      cart, addToCart,
      favorites, toggleFavorite,
      viewedProducts, addViewedProduct
    }}>
      {children}
    </AppContext.Provider>
  );
};
