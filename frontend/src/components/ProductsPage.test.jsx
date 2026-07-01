import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductsPage from './ProductsPage';
import { AppContext } from '../context/AppContext';

describe('ProductsPage', () => {
  const mockProducts = [
    { id: 1, name: 'iPhone 17 Pro', price: '30.000.000đ', image: 'test.png' }
  ];

  it('calls addToCart when user is logged in', async () => {
    const setCurrentView = vi.fn();
    const addToCart = vi.fn();
    
    render(
      <AppContext.Provider value={{ 
        setCurrentView, addToCart, user: { name: 'test' }, 
        favorites: [], productsData: mockProducts, addViewedProduct: vi.fn(), viewedProducts: []
      }}>
        <ProductsPage />
      </AppContext.Provider>
    );

    const addBtn = await screen.findByText(/Thêm vào giỏ/i, {}, { timeout: 1500 });
    fireEvent.click(addBtn);

    expect(addToCart).toHaveBeenCalledWith(mockProducts[0]);
    expect(setCurrentView).not.toHaveBeenCalled();
  });
});
