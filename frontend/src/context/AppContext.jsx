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
  const [productsData, setProductsData] = useState([]);
  const [viewedProducts, setViewedProducts] = useState(() => {
    const saved = localStorage.getItem('viewed');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:8000' : 'https://landingpage-x1qu.onrender.com');
        const res = await fetch(`${apiUrl}/api/products`);
        if (res.ok) {
          const data = await res.json();
          setProductsData(data);
        }
      } catch (e) {
        console.error("Error fetching products", e);
      }
    };
    fetchProducts();
  }, []);

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
        return { ...item, quantity: item.quantity + delta };
      }
      return item;
    }).filter(item => item.quantity > 0));
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

  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user_name');
    return savedUser ? { name: savedUser } : null;
  });
  const [tokens, setTokens] = useState(() => {
    const access = localStorage.getItem('access_token');
    const refresh = localStorage.getItem('refresh_token');
    return access ? { access_token: access, refresh_token: refresh } : null;
  });
  
  const clearCart = () => setCart([]);

  const login = (userData, accessToken, refreshToken) => {
    setUser({ name: userData });
    setTokens({ access_token: accessToken, refresh_token: refreshToken });
    localStorage.setItem('user_name', userData);
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    setFavorites([]);
    setCart([]);
    localStorage.removeItem('user_name');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('favorites');
    localStorage.removeItem('cart');
  };

  return (
    <AppContext.Provider value={{
      isDarkMode, toggleDarkMode,
      cart, addToCart, updateQuantity, removeFromCart, clearCart,
      favorites, toggleFavorite,
      viewedProducts, addViewedProduct,
      currentView, setCurrentView,
      user, tokens, login, logout,
      productsData
    }}>
      {children}
    </AppContext.Provider>
  );
};
