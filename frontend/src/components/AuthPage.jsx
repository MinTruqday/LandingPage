import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ArrowLeft, Smartphone } from 'lucide-react';

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
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', margin: 0, padding: 0 }}>
      {/* Left Side - Image/Gradient */}
      <div style={{ 
        flex: 1, 
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        color: 'white',
        padding: '40px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Abstract decorative circles */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', filter: 'blur(40px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', filter: 'blur(60px)' }}></div>
        
        <Smartphone size={80} style={{ marginBottom: '30px', strokeWidth: 1 }} />
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', letterSpacing: '-1px' }}>iPhone 17 Pro</h1>
        <p style={{ fontSize: '1.2rem', textAlign: 'center', maxWidth: '400px', opacity: 0.8, lineHeight: 1.6 }}>
          Tuyệt tác công nghệ định hình tương lai. Đăng nhập để trải nghiệm mua sắm đẳng cấp và lưu lại những sản phẩm yêu thích của riêng bạn.
        </p>
      </div>

      {/* Right Side - Form */}
      <div style={{ 
        flex: 1, 
        backgroundColor: 'var(--bg-color)', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '40px',
        position: 'relative'
      }}>
        <button 
          onClick={() => setCurrentView('home')} 
          style={{ position: 'absolute', top: '40px', left: '40px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-color)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' }}
        >
          <ArrowLeft size={20} /> Về trang chủ
        </button>

        <div style={{ width: '100%', maxWidth: '400px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
            {isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản'}
          </h2>
          <p style={{ color: 'var(--text-color)', opacity: 0.7, marginBottom: '40px' }}>
            {isLogin ? 'Vui lòng điền thông tin để đăng nhập vào hệ thống.' : 'Tham gia cùng chúng tôi để trải nghiệm ngay hôm nay.'}
          </p>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Họ và tên</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={formData.name} 
                  onChange={handleChange} 
                  style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--secondary-bg)', color: 'var(--text-color)', fontSize: '1rem' }} 
                />
              </div>
            )}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
              <input 
                type="email" 
                name="email" 
                required 
                value={formData.email} 
                onChange={handleChange} 
                style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--secondary-bg)', color: 'var(--text-color)', fontSize: '1rem' }} 
              />
            </div>
            <div className="form-group" style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Mật khẩu</label>
              <input 
                type="password" 
                name="password" 
                required 
                value={formData.password} 
                onChange={handleChange} 
                style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--secondary-bg)', color: 'var(--text-color)', fontSize: '1rem' }} 
              />
            </div>
            
            <button type="submit" className="btn" style={{ width: '100%', padding: '14px', fontSize: '1.1rem', borderRadius: '10px', fontWeight: 'bold' }}>
              {isLogin ? 'Đăng nhập' : 'Đăng ký'}
            </button>
          </form>

          <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '1rem' }}>
            <span style={{ color: 'var(--text-color)', opacity: 0.8 }}>
              {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
            </span>
            <button 
              onClick={() => setIsLogin(!isLogin)}
              style={{ color: 'var(--primary-color)', marginLeft: '8px', fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem' }}
            >
              {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
            </button>
          </div>
        </div>
      </div>

      {/* Media query for mobile responsive split screen */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          div[style*="display: flex; min-height: 100vh; width: 100vw;"] {
            flex-direction: column !important;
          }
          div[style*="background: linear-gradient"] {
            padding: 60px 20px 40px !important;
            flex: none !important;
          }
        }
      `}} />
    </div>
  );
};

export default AuthPage;
