import React, { useState } from 'react';
import { X } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate auth
    onLogin(formData.name || formData.email.split('@')[0]);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="cart-modal-overlay" onClick={onClose} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      <div className="form-container" onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '400px', backgroundColor: 'var(--bg-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
          <button onClick={onClose} style={{ color: 'var(--text-color)' }}><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Họ và tên</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input type="password" name="password" required value={formData.password} onChange={handleChange} />
          </div>
          
          <button type="submit" className="btn" style={{ marginTop: '10px' }}>
            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </form>

        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
          {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: 'var(--primary-color)', marginLeft: '5px', fontWeight: 'bold', border: 'none', background: 'none' }}
          >
            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
