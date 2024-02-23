import React from 'react';
import { render, screen } from '@testing-library/react';

import FadeInElement from './FadeInElement';

describe('FadeInElement', () => {
  test('Expect FadeInElement to be presented when invisible', () => {
    render(<FadeInElement fadeIn={false}>TestContent</FadeInElement>);

    expect(screen.getByText(/TestContent/i)).toBeInTheDocument();
    expect(screen.getByText(/TestContent/i)).toHaveClass('opacity-0');
  });

  test('Expect FadeInElement to be presented when visible', () => {
    render(<FadeInElement fadeIn>TestContent</FadeInElement>);

    expect(screen.getByText(/TestContent/i)).toBeInTheDocument();
    expect(screen.getByText(/TestContent/i)).toHaveClass('opacity-100');
  });
});
