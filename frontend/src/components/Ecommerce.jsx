import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Heart, ShoppingBag } from 'lucide-react';
import { trackEvent } from '../utils/tracking';

import toast from 'react-hot-toast';

const Ecommerce = () => {
  const { addToCart, favorites, toggleFavorite, user, setCurrentView, productsData } = useContext(AppContext);
  const featuredProducts = productsData.slice(0, 3);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    if (!user) {
      setCurrentView('auth');
      return;
    }
    addToCart(product);
    toast.success(`Đã thêm ${product.name} vào giỏ hàng`);
    trackEvent('add_to_cart', product.id, '/ecommerce');
  };

  const handleToggleFavorite = (e, product) => {
    e.stopPropagation();
    if (!user) {
      setCurrentView('auth');
      return;
    }
    toggleFavorite(product.id);
    trackEvent('toggle_favorite', product.id, '/ecommerce');
  };

  return (
    <section id="store" style={{ padding: '80px 20px', backgroundColor: 'var(--bg-color)' }}>
      <h2 className="section-title">Chọn iPhone của bạn</h2>
      <div className="product-grid">
        {featuredProducts.map(product => (
          <div key={product.id} className="product-card" style={{ backgroundColor: 'var(--secondary-bg)' }}>
            <img src={product.image} alt={product.name} loading="lazy" width="300" height="300" />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{product.name}</h3>
            <p style={{ color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: 'bold' }}>{product.price}</p>
            <div className="product-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button 
                className="btn" 
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                onClick={(e) => handleAddToCart(e, product)}
              >
                <ShoppingBag size={18} /> Thêm vào giỏ
              </button>
              <button 
                className={`btn-icon ${favorites.includes(product.id) ? 'active' : ''}`}
                aria-label={favorites.includes(product.id) ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                onClick={(e) => handleToggleFavorite(e, product)}
              >
                <Heart size={20} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn" onClick={() => setCurrentView('products')}>Xem tất cả sản phẩm</button>
      </div>
    </section>
  );
};

export default Ecommerce;
