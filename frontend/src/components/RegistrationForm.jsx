import React, { useState } from 'react';
import { trackEvent } from '../utils/tracking';
import { toast } from 'react-hot-toast';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Số điện thoại không hợp lệ');
      return;
    }
    
    trackEvent('form_submit', 'registration_form', window.location.pathname);
    const loadingToast = toast.loading('Đang xử lý');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:8000' : 'https://landingpage-x1qu.onrender.com');
      const response = await fetch(`${apiUrl}/api/webhook/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        toast.success('Đăng ký thành công', { id: loadingToast });
        setFormData({ name: '', email: '', phone: '' });
      } else {
        toast.error('Có lỗi xảy ra từ máy chủ', { id: loadingToast });
      }
    } catch (error) {
      toast.error('Lỗi kết nối máy chủ', { id: loadingToast });
    }
  };

  return (
    <section id="register" style={{ padding: '80px 20px', textAlign: 'center' }}>
      <h2 className="section-title">Nhận thông tin sớm nhất</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reg-name">Họ và tên</label>
            <input id="reg-name" type="text" name="name" required value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="reg-email">Email</label>
            <input id="reg-email" type="email" name="email" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="reg-phone">Số điện thoại</label>
            <input id="reg-phone" type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
          </div>
          <button type="submit" className="btn">Đăng ký ngay</button>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;
