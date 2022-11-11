import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

test('renders the landing page', () => {
  render(<App />);
});