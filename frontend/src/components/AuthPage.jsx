import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { X } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const { login, setCurrentView } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.name || formData.email.split('@')[0]);
    setCurrentView('home');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--bg-color)', padding: '20px' }}>
      <div className="form-container" style={{ width: '100%', maxWidth: '400px', backgroundColor: 'var(--secondary-bg)', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
          <button onClick={() => setCurrentView('home')} style={{ color: 'var(--text-color)', background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Họ và tên</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
            </div>
          )}
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Mật khẩu</label>
            <input type="password" name="password" required value={formData.password} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
          </div>
          
          <button type="submit" className="btn" style={{ width: '100%', padding: '12px' }}>
            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </form>

        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
          {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: 'var(--primary-color)', marginLeft: '5px', fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer' }}
          >
            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
