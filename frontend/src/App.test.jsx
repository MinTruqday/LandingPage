import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { expect, test } from 'vitest';

test('renders App successfully', () => {
  render(<App />);
  const titleElements = screen.getAllByText(/iPhone 17 Pro/i);
  expect(titleElements.length).toBeGreaterThan(0);
});

test('cart has initial state 0', () => {
  render(<App />);
  const cartIcon = screen.queryByText('1');
  expect(cartIcon).toBeNull();
});
