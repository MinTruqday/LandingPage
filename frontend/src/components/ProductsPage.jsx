import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Heart, ShoppingBag } from 'lucide-react';
import { trackEvent } from '../utils/tracking';
import ProductDetail from './ProductDetail';
import ViewedProducts from './ViewedProducts';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const ProductsPage = () => {
  const { addToCart, favorites, toggleFavorite, addViewedProduct, user, setCurrentView, productsData } = useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    if (!user) {
      setCurrentView('auth');
      return;
    }
    addToCart(product);
    toast.success(`Đã thêm ${product.name} vào giỏ hàng`);
    trackEvent('add_to_cart', product.id, '/products');
  };

  const handleToggleFavorite = (e, product) => {
    e.stopPropagation();
    if (!user) {
      setCurrentView('auth');
      return;
    }
    toggleFavorite(product.id);
    trackEvent('toggle_favorite', product.id, '/products');
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    trackEvent('view_product_detail', product.id, '/products');
  };

  return (
    <div style={{ paddingTop: '80px', paddingBottom: '50px', backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem' }}>Tất cả Sản phẩm</h1>
        </div>

        <div className="product-grid" style={{ padding: 0 }}>
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="product-card skeleton-card">
                <div className="skeleton skeleton-img"></div>
                <div className="skeleton skeleton-text" style={{ width: '80%', margin: '15px auto' }}></div>
                <div className="skeleton skeleton-text" style={{ width: '50%', margin: '0 auto' }}></div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <div className="skeleton skeleton-btn" style={{ flex: 1 }}></div>
                  <div className="skeleton skeleton-btn" style={{ width: '40px' }}></div>
                </div>
              </div>
            ))
          ) : (
            productsData.map(product => (
              <div 
                key={product.id} 
                className="product-card"
                style={{ cursor: 'pointer', backgroundColor: 'var(--secondary-bg)' }}
                onClick={() => {
                  addViewedProduct(product.id);
                  handleProductClick(product);
                }}
              >
                <img src={product.image} alt={product.name} loading="lazy" width="200" height="200" style={{ width: '100%', height: '200px', objectFit: 'contain', marginBottom: '15px' }} />
                <h3 style={{ fontSize: '1.1rem' }}>{product.name}</h3>
                <p style={{ color: 'var(--primary-color)', margin: '10px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>{product.price}</p>
                <div className="product-actions">
                  <motion.button 
                    className="btn" 
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    onClick={(e) => handleAddToCart(e, product)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingBag size={18} /> Thêm vào giỏ
                  </motion.button>
                  <motion.button 
                    className={`btn-icon ${favorites.includes(product.id) ? 'active' : ''}`}
                    onClick={(e) => handleToggleFavorite(e, product)}
                    aria-label={favorites.includes(product.id) ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <Heart size={20} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
                  </motion.button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <ViewedProducts />
      </div>
      
      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default ProductsPage;
