import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AuthPage from './AuthPage';
import { AppContext } from '../context/AppContext';

describe('AuthPage', () => {
  it('renders login form by default and can switch to register', () => {
    const setCurrentView = vi.fn();
    const login = vi.fn();
    
    const { container } = render(
      <AppContext.Provider value={{ setCurrentView, login }}>
        <AuthPage />
      </AppContext.Provider>
    );

    const submitBtn = screen.getByRole('button', { name: 'Đăng nhập' });

    const emailInput = container.querySelector('input[type="email"]');
    const passwordInput = container.querySelector('input[type="password"]');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    fireEvent.click(submitBtn);

    expect(login).toHaveBeenCalledWith('test');
    expect(setCurrentView).toHaveBeenCalledWith('home');
  });
});
