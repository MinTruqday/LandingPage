import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Heart, ShoppingBag } from 'lucide-react';

const FavoritesPage = () => {
  const { favorites, toggleFavorite, addToCart, productsData } = useContext(AppContext);

  const favoriteProducts = productsData.filter(product => favorites.includes(product.id));

  return (
    <div style={{ paddingTop: '80px', paddingBottom: '50px', backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Sản phẩm Yêu thích</h1>

        {favoriteProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', backgroundColor: 'var(--secondary-bg)', borderRadius: '15px' }}>
            <Heart size={64} style={{ color: 'var(--border-color)', margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Chưa có sản phẩm nào</h2>
            <p style={{ color: 'var(--text-color)', opacity: 0.7 }}>Hãy thả tim những sản phẩm bạn thích để lưu vào đây nhé.</p>
          </div>
        ) : (
          <div className="product-grid" style={{ padding: 0 }}>
            {favoriteProducts.map(product => (
              <div key={product.id} className="product-card" style={{ backgroundColor: 'var(--secondary-bg)' }}>
                <img src={product.image} alt={product.name} />
                <h3 style={{ fontSize: '1.1rem' }}>{product.name}</h3>
                <p style={{ color: 'var(--primary-color)', margin: '10px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>{product.price}</p>
                <div className="product-actions">
                  <button 
                    className="btn" 
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingBag size={18} /> Thêm vào giỏ
                  </button>
                  <button 
                    className="btn-icon active"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart size={20} fill="currentColor" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
