import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Checkout from './Checkout';
import { AppContext } from '../context/AppContext';

describe('Checkout', () => {
  const mockCart = [
    { name: 'iPhone 17', price: '30.000.000đ', quantity: 2, image: 'test.png' }
  ];

  it('calculates correct total and allows checkout', () => {
    const clearCart = vi.fn();
    const setIsCheckout = vi.fn();
    
    // Mock window.alert
    window.alert = vi.fn();

    render(
      <AppContext.Provider value={{ cart: mockCart, clearCart, setIsCheckout }}>
        <Checkout />
      </AppContext.Provider>
    );

    // 30,000,000 * 2 = 60,000,000
    expect(screen.getByText('60.000.000đ')).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText('Họ và tên');
    const phoneInput = screen.getByPlaceholderText('Số điện thoại');
    const addressInput = screen.getByPlaceholderText('Địa chỉ giao hàng');
    
    fireEvent.change(nameInput, { target: { value: 'Nguyen Van A' } });
    fireEvent.change(phoneInput, { target: { value: '0123456789' } });
    fireEvent.change(addressInput, { target: { value: 'Ha Noi' } });

    const submitBtn = screen.getByRole('button', { name: 'Đặt hàng ngay' });
    fireEvent.click(submitBtn);

    expect(clearCart).toHaveBeenCalled();
    expect(setIsCheckout).toHaveBeenCalledWith(false);
  });
});
