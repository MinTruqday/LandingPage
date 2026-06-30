import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Heart, ShoppingBag } from 'lucide-react';
import { trackEvent } from '../utils/tracking';

const products = [
  {
    id: 'ip17p-1',
    name: 'iPhone 17 Pro 256GB - Titan Tự Nhiên',
    price: '28.990.000đ',
    image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692846363993'
  },
  {
    id: 'ip17pm-1',
    name: 'iPhone 17 Pro Max 256GB - Titan Đen',
    price: '34.990.000đ',
    image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-blacktitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692846362489'
  }
];

const Ecommerce = () => {
  const { addToCart, favorites, toggleFavorite, addViewedProduct } = useContext(AppContext);

  const handleAddToCart = (product) => {
    addToCart(product);
    trackEvent('add_to_cart', product.id, window.location.pathname);
  };

  const handleToggleFavorite = (product) => {
    toggleFavorite(product.id);
    trackEvent('toggle_favorite', product.id, window.location.pathname);
  };

  return (
    <section id="store" style={{ padding: '80px 20px', backgroundColor: 'var(--secondary-bg)' }}>
      <h2 className="section-title">Chọn phiên bản của bạn</h2>
      <div className="product-grid">
        {products.map(product => (
          <div 
            key={product.id} 
            className="product-card"
            onMouseEnter={() => addViewedProduct(product.id)}
          >
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p style={{ color: 'var(--primary-color)', margin: '10px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>{product.price}</p>
            <div className="product-actions">
              <button 
                className="btn" 
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingBag size={18} /> Thêm vào giỏ
              </button>
              <button 
                className={`btn-icon ${favorites.includes(product.id) ? 'active' : ''}`}
                onClick={() => handleToggleFavorite(product)}
              >
                <Heart size={20} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Ecommerce;
