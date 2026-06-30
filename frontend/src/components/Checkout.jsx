import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Checkout = () => {
  const { cart, clearCart, setIsCheckout } = useContext(AppContext);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace(/\D/g, ''));
      return total + (price * (item.quantity || 1));
    }, 0).toLocaleString('vi-VN') + 'đ';
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (paymentMethod === 'bank') {
      alert('Tính năng đang phát triển');
      return;
    }
    
    alert('Đặt hàng thành công! Cảm ơn bạn đã tin tưởng iPhone 17 Pro.');
    clearCart();
    setIsCheckout(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '100px auto 50px', padding: '20px' }}>
      <button onClick={() => setIsCheckout(false)} style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>
        Quay lại
      </button>
      <h2 style={{ marginBottom: '30px', fontSize: '2.5rem' }}>Thanh toán</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <div>
          <h3>Thông tin giao hàng</h3>
          <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            <input 
              type="text" 
              placeholder="Họ và tên" 
              required 
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', color: 'var(--text-color)' }}
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="tel" 
              placeholder="Số điện thoại" 
              required 
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', color: 'var(--text-color)' }}
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
            <textarea 
              placeholder="Địa chỉ giao hàng" 
              required 
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', color: 'var(--text-color)', minHeight: '100px' }}
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
            />
            
            <h3 style={{ marginTop: '20px' }}>Phương thức thanh toán</h3>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
              Thanh toán tiền mặt khi nhận hàng (COD)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="radio" name="payment" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} />
              Chuyển khoản ngân hàng
            </label>
            
            <button type="submit" className="btn" style={{ marginTop: '20px' }}>Đặt hàng ngay</button>
          </form>
        </div>
        
        <div>
          <h3>Đơn hàng của bạn</h3>
          <div style={{ backgroundColor: 'var(--bg-color)', padding: '20px', borderRadius: '10px', marginTop: '20px', border: '1px solid var(--border-color)' }}>
            {cart.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                  <div>
                    <p style={{ fontWeight: 'bold' }}>{item.name}</p>
                    <p style={{ fontSize: '0.9rem' }}>Số lượng: {item.quantity || 1}</p>
                  </div>
                </div>
                <p style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{item.price}</p>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <span>Tổng cộng:</span>
              <span style={{ color: 'var(--primary-color)' }}>{calculateTotal()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
