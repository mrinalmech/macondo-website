import React from 'react';
import { render, screen } from '@testing-library/react';

import FadeInElement from './FadeInElement';

describe('FadeInElement', () => {
  test('Expect FadeInElement to be visible if fadeIn prop is true', () => {
    render(<FadeInElement fadeIn={false}>TestContent</FadeInElement>);

    expect(screen.getByText(/TestContent/)).toBeInTheDocument();
    expect(screen.getByText(/TestContent/)).toHaveClass('opacity-0');
  });

  test('Expect FadeInElement to be invisible if fadeIn prop is false', () => {
    render(<FadeInElement fadeIn>TestContent</FadeInElement>);

    expect(screen.getByText(/TestContent/)).toBeInTheDocument();
    expect(screen.getByText(/TestContent/)).toHaveClass('opacity-100');
  });
});
