import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Moon, Sun, ShoppingCart, X } from 'lucide-react';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode, cart, updateQuantity, removeFromCart, setIsCheckout, setIsProductsPage } = useContext(AppContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace(/\D/g, ''));
      return total + (price * (item.quantity || 1));
    }, 0).toLocaleString('vi-VN') + 'đ';
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckout(true);
  };

  return (
    <>
      <nav>
        <div className="logo" style={{ fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => {setIsCheckout(false); setIsProductsPage(false);}}>
          iPhone 17 Pro
        </div>
        <div className="nav-links">
          <a href="#features" onClick={() => {setIsCheckout(false); setIsProductsPage(false);}}>Tính năng</a>
          <a href="#specs" onClick={() => {setIsCheckout(false); setIsProductsPage(false);}}>Thông số</a>
          <a href="#store" onClick={(e) => {e.preventDefault(); setIsCheckout(false); setIsProductsPage(true);}}>Sản phẩm</a>
          <button onClick={toggleDarkMode} style={{ color: 'var(--text-color)', marginLeft: '10px' }}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            <button onClick={() => setIsCartOpen(true)} style={{ color: 'var(--text-color)' }}>
              <ShoppingCart size={20} />
            </button>
            {cart.length > 0 && (
              <span style={{
                position: 'absolute', top: '-8px', right: '-8px',
                backgroundColor: 'red', color: 'white', borderRadius: '50%',
                width: '16px', height: '16px', fontSize: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
              </span>
            )}
          </div>
        </div>
      </nav>

      {isCartOpen && (
        <div className="cart-modal-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-modal" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Giỏ hàng của bạn</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X size={24} color="var(--text-color)" />
              </button>
            </div>
            <div className="cart-items">
              {cart.length === 0 ? (
                <p>Giỏ hàng trống.</p>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-details" style={{ flex: 1 }}>
                      <h4>{item.name}</h4>
                      <p style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>{item.price}</p>
                      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', gap: '10px' }}>
                        <button onClick={() => updateQuantity(item.name, -1)} style={{ padding: '2px 8px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'transparent', color: 'var(--text-color)' }}>-</button>
                        <span>{item.quantity || 1}</span>
                        <button onClick={() => updateQuantity(item.name, 1)} style={{ padding: '2px 8px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'transparent', color: 'var(--text-color)' }}>+</button>
                        <button onClick={() => removeFromCart(item.name)} style={{ marginLeft: 'auto', color: 'red', fontSize: '0.9rem', backgroundColor: 'transparent', border: 'none' }}>Xóa</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Tổng cộng:</span>
                  <span style={{ color: 'var(--primary-color)' }}>{calculateTotal()}</span>
                </div>
                <button className="btn" onClick={handleCheckoutClick}>Tiến hành thanh toán</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
