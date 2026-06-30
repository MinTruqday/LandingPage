import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Moon, Sun, ShoppingCart, X, Menu, User, LogOut, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode, cart, updateQuantity, removeFromCart, setCurrentView, currentView, user, logout, favorites } = useContext(AppContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace(/\D/g, ''));
      return total + (price * (item.quantity || 1));
    }, 0).toLocaleString('vi-VN') + 'đ';
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  const handleLogout = () => {
    logout();
    toast.success('Đã đăng xuất');
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav>
        <div className="logo" style={{ fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => {setCurrentView('home'); closeMobileMenu();}}>
          iPhone 17 Pro
        </div>
        
        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="#features" onClick={() => {setCurrentView('home'); closeMobileMenu();}}>Tính năng</a>
          <a href="#specs" onClick={() => {setCurrentView('home'); closeMobileMenu();}}>Thông số</a>
          <a href="#store" onClick={(e) => {e.preventDefault(); setCurrentView('products'); closeMobileMenu();}}>Sản phẩm</a>
          
          <div className="nav-actions">
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Hi, {user}</span>
                <button onClick={handleLogout} style={{ color: 'var(--text-color)', border: 'none', background: 'none', cursor: 'pointer' }}><LogOut size={18} /></button>
              </div>
            ) : (
              <button onClick={() => {setCurrentView('auth'); closeMobileMenu();}} style={{ color: 'var(--text-color)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '5px 15px', background: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>
                Đăng nhập
              </button>
            )}
            
            {user && (
              <button onClick={() => {
                setCurrentView('favorites');
                closeMobileMenu();
              }} style={{ color: 'var(--text-color)', border: 'none', background: 'none', cursor: 'pointer', position: 'relative' }}>
                <Heart size={20} />
                {favorites.length > 0 && (
                  <span style={{
                    position: 'absolute', top: '-8px', right: '-8px',
                    backgroundColor: 'var(--primary-color)', color: 'white', borderRadius: '50%',
                    width: '16px', height: '16px', fontSize: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {favorites.length}
                  </span>
                )}
              </button>
            )}

            <button onClick={toggleDarkMode} style={{ color: 'var(--text-color)', border: 'none', background: 'none', cursor: 'pointer' }}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <button onClick={() => {setIsCartOpen(true); closeMobileMenu();}} style={{ color: 'var(--text-color)', border: 'none', background: 'none', cursor: 'pointer' }}>
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
        </div>
      </nav>

      {isCartOpen && (
        <div className="cart-modal-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-modal" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Giỏ hàng của bạn</h2>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
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
                        <button onClick={() => updateQuantity(item.name, -1)} style={{ padding: '2px 8px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'transparent', color: 'var(--text-color)', cursor: 'pointer' }}>-</button>
                        <span>{item.quantity || 1}</span>
                        <button onClick={() => updateQuantity(item.name, 1)} style={{ padding: '2px 8px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'transparent', color: 'var(--text-color)', cursor: 'pointer' }}>+</button>
                        <button onClick={() => removeFromCart(item.name)} style={{ marginLeft: 'auto', color: 'red', fontSize: '0.9rem', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>Xóa</button>
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
