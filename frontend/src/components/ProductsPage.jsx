import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Heart, ShoppingBag } from 'lucide-react';
import { trackEvent } from '../utils/tracking';
import ProductDetail from './ProductDetail';
import { allProducts } from '../data/products';

const ProductsPage = () => {
  const { addToCart, favorites, toggleFavorite, addViewedProduct, setView } = useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    trackEvent('add_to_cart', product.id, '/products');
  };

  const handleToggleFavorite = (e, product) => {
    e.stopPropagation();
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
          {allProducts.map(product => (
            <div 
              key={product.id} 
              className="product-card"
              style={{ cursor: 'pointer', backgroundColor: 'var(--secondary-bg)' }}
              onMouseEnter={() => addViewedProduct(product.id)}
              onClick={() => handleProductClick(product)}
            >
              <img src={product.image} alt={product.name} loading="lazy" />
              <h3 style={{ fontSize: '1.1rem' }}>{product.name}</h3>
              <p style={{ color: 'var(--primary-color)', margin: '10px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>{product.price}</p>
              <div className="product-actions">
                <button 
                  className="btn" 
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  <ShoppingBag size={18} /> Thêm vào giỏ
                </button>
                <button 
                  className={`btn-icon ${favorites.includes(product.id) ? 'active' : ''}`}
                  onClick={(e) => handleToggleFavorite(e, product)}
                >
                  <Heart size={20} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default ProductsPage;
