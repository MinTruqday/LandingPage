import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ViewedProducts = () => {
  const { viewedProducts, setCurrentView, productsData, user } = useContext(AppContext);

  if (!user || viewedProducts.length === 0 || !productsData || productsData.length === 0) return null;

  const recentProducts = viewedProducts.slice().reverse().map(id => productsData.find(p => p.id === id)).filter(Boolean);

  return (
    <div style={{ marginTop: '60px', padding: '40px 0', borderTop: '1px solid var(--border-color)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.8rem' }}>Sản phẩm đã xem</h2>
        <button 
          onClick={() => setCurrentView('products')}
          style={{ color: 'var(--primary-color)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Xem tất cả
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px' }} className="hide-scrollbar">
        {recentProducts.map(product => (
          <div key={product.id} style={{ minWidth: '200px', backgroundColor: 'var(--secondary-bg)', padding: '15px', borderRadius: '10px' }}>
            <img src={product.image} alt={product.name} loading="lazy" width="150" height="150" style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '10px' }} />
            <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}>{product.name}</h4>
            <p style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewedProducts;
