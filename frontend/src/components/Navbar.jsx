import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Moon, Sun, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode, cart } = useContext(AppContext);

  return (
    <nav>
      <div className="logo" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
        iPhone 17 Pro
      </div>
      <div className="nav-links">
        <a href="#features">Tính năng</a>
        <a href="#specs">Thông số</a>
        <a href="#store">Cửa hàng</a>
        <button onClick={toggleDarkMode} style={{ color: 'var(--text-color)', marginLeft: '10px' }}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
          <ShoppingCart size={20} color="var(--text-color)" />
          {cart.length > 0 && (
            <span style={{
              position: 'absolute', top: '-8px', right: '-8px',
              backgroundColor: 'red', color: 'white', borderRadius: '50%',
              width: '16px', height: '16px', fontSize: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {cart.length}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
