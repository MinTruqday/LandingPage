import React, { useState } from 'react';
import { trackEvent } from '../utils/tracking';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(formData.phone)) {
      setStatus('Số điện thoại không hợp lệ');
      return;
    }
    
    trackEvent('form_submit', 'registration_form', window.location.pathname);
    setStatus('Đang xử lý');
    try {
      const response = await fetch('/api/webhook/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('Đăng ký thành công');
        setFormData({ name: '', email: '', phone: '' });
      } else {
        setStatus('Có lỗi xảy ra từ máy chủ');
      }
    } catch (error) {
      setStatus('Lỗi kết nối máy chủ');
    }
  };

  return (
    <section id="register" style={{ padding: '80px 20px', textAlign: 'center' }}>
      <h2 className="section-title">Nhận thông tin sớm nhất</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ và tên</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Số điện thoại</label>
            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
          </div>
          <button type="submit" className="btn">Đăng ký ngay</button>
          {status && <p style={{ marginTop: '15px', color: 'var(--primary-color)' }}>{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;
