import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { X, ShoppingBag, Check } from 'lucide-react';
import { trackEvent } from '../utils/tracking';

const ProductDetail = ({ product, onClose }) => {
  const { addToCart, cart } = useContext(AppContext);

  const handleAddToCart = () => {
    addToCart(product);
    trackEvent('add_to_cart_from_detail', product.id, window.location.pathname);
  };

  const isInCart = cart.some(item => item.id === product.id);

  return (
    <div className="cart-modal-overlay" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div 
        className="cart-modal" 
        onClick={e => e.stopPropagation()} 
        style={{ width: '90%', maxWidth: '800px', height: 'auto', maxHeight: '90vh', borderRadius: '20px', flexDirection: 'row', overflow: 'hidden' }}
      >
        <div style={{ flex: 1, backgroundColor: 'white', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
        </div>
        
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', color: 'var(--text-color)', backgroundColor: 'transparent', border: 'none' }}>
            <X size={24} />
          </button>
          
          <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>{product.name}</h2>
          <p style={{ color: 'var(--primary-color)', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '30px' }}>{product.price}</p>
          
          <div style={{ marginBottom: '30px' }}>
            <h4 style={{ marginBottom: '10px' }}>Đặc điểm nổi bật:</h4>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>Khung viền Titanium chuẩn hàng không vũ trụ</li>
              <li>Chip A19 Pro siêu mạnh mẽ</li>
              <li>Camera chính 48MP bắt trọn mọi khoảnh khắc</li>
              <li>Màn hình Super Retina XDR 120Hz mượt mà</li>
            </ul>
          </div>
          
          <button 
            className="btn" 
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: 'auto', padding: '15px' }}
            onClick={handleAddToCart}
          >
            {isInCart ? <><Check size={20} /> Đã thêm vào giỏ</> : <><ShoppingBag size={20} /> Thêm vào giỏ hàng</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
