import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ArrowLeft, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { login, setCurrentView } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isForgotPassword) {
      toast.success('Đã gửi liên kết khôi phục mật khẩu vào email của bạn!');
      setIsForgotPassword(false);
      return;
    }
    
    setIsLoading(true);
    const loadingToast = toast.loading('Đang xử lý...');
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:8000' : 'https://landingpage-x1qu.onrender.com');
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const bodyData = isLogin 
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

      const res = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(isLogin ? 'Đăng nhập thành công!' : 'Đăng ký thành công!', { id: loadingToast });
        login(data.user_name, data.access_token, data.refresh_token);
        
        // Add small delay so user can see the toast before redirect
        setTimeout(() => {
          setCurrentView('home');
        }, 1200);
      } else {
        toast.error(data.detail || 'Có lỗi xảy ra', { id: loadingToast });
      }
    } catch (err) {
      toast.error('Lỗi kết nối máy chủ', { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', margin: 0, padding: 0 }}>
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
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', filter: 'blur(40px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', filter: 'blur(60px)' }}></div>
        
        <Smartphone size={80} style={{ marginBottom: '30px', strokeWidth: 1 }} />
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', letterSpacing: '-1px' }}>iPhone 17 Pro</h1>
        <p style={{ fontSize: '1.2rem', textAlign: 'center', maxWidth: '400px', opacity: 0.8, lineHeight: 1.6 }}>
          Tuyệt tác công nghệ định hình tương lai. Đăng nhập để trải nghiệm mua sắm đẳng cấp và lưu lại những sản phẩm yêu thích của riêng bạn.
        </p>
      </div>

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
            {isForgotPassword ? 'Khôi phục mật khẩu' : isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản'}
          </h2>
          <p style={{ color: 'var(--text-color)', opacity: 0.7, marginBottom: '40px' }}>
            {isForgotPassword 
              ? 'Nhập email của bạn và chúng tôi sẽ gửi liên kết khôi phục mật khẩu.' 
              : isLogin ? 'Vui lòng điền thông tin để đăng nhập vào hệ thống.' : 'Tham gia cùng chúng tôi để trải nghiệm ngay hôm nay.'}
          </p>

          <form onSubmit={handleSubmit}>
            {!isLogin && !isForgotPassword && (
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="auth-name" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Họ và tên</label>
                <input 
                  id="auth-name"
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
              <label htmlFor="auth-email" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
              <input 
                id="auth-email"
                type="email" 
                name="email" 
                required 
                value={formData.email} 
                onChange={handleChange} 
                style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--secondary-bg)', color: 'var(--text-color)', fontSize: '1rem' }} 
              />
            </div>
            {!isForgotPassword && (
              <div className="form-group" style={{ marginBottom: '30px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label htmlFor="auth-password" style={{ fontWeight: '500' }}>Mật khẩu</label>
                  {isLogin && (
                    <button 
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      style={{ color: 'var(--primary-color)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}
                    >
                      Quên mật khẩu?
                    </button>
                  )}
                </div>
                <input 
                  id="auth-password"
                  type="password" 
                  name="password" 
                  required 
                  value={formData.password} 
                  onChange={handleChange} 
                  style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--secondary-bg)', color: 'var(--text-color)', fontSize: '1rem' }} 
                />
              </div>
            )}
            
            <button type="submit" className="btn" style={{ width: '100%', padding: '14px', fontSize: '1.1rem', borderRadius: '10px', fontWeight: 'bold' }}>
              {isForgotPassword ? 'Gửi liên kết' : isLogin ? 'Đăng nhập' : 'Đăng ký'}
            </button>
          </form>

          <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '1rem' }}>
            <span style={{ color: 'var(--text-color)', opacity: 0.8 }}>
              {isForgotPassword ? 'Đã nhớ mật khẩu?' : isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
            </span>
            <button 
              onClick={() => {
                setIsForgotPassword(false);
                setIsLogin(isForgotPassword ? true : !isLogin);
              }}
              style={{ color: 'var(--primary-color)', marginLeft: '8px', fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem' }}
            >
              {isForgotPassword ? 'Đăng nhập' : isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
            </button>
          </div>
        </div>
      </div>

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
