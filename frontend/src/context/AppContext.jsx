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
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.name === product.name);
      if (existingProduct) {
        return prevCart.map(item =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productName, delta) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.name === productName) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    }));
  };

  const removeFromCart = (productName) => {
    setCart(prevCart => prevCart.filter(item => item.name !== productName));
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
        return [...prev, productId].slice(-5);
      }
      return prev;
    });
  };

  const [isCheckout, setIsCheckout] = useState(false);
  const [isProductsPage, setIsProductsPage] = useState(false);
  const [user, setUser] = useState(null);
  
  const clearCart = () => setCart([]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AppContext.Provider value={{
      isDarkMode, toggleDarkMode,
      cart, addToCart, updateQuantity, removeFromCart, clearCart,
      favorites, toggleFavorite,
      viewedProducts, addViewedProduct,
      isCheckout, setIsCheckout,
      isProductsPage, setIsProductsPage,
      user, login, logout
    }}>
      {children}
    </AppContext.Provider>
  );
};
