import React from 'react';
import { render, screen } from '@testing-library/react';

import Footer from './Footer';

describe('Footer', () => {
  test('Expect footer to be presented', () => {
    const currentYear = new Date().getFullYear();

    render(<Footer />);

    expect(screen.getByText(/Keep up with us!/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Twitter/i })).toHaveAttribute(
      'href',
      'https://twitter.com/macondostudios',
    );
    expect(screen.getByRole('link', { name: /Facebook/i })).toHaveAttribute(
      'href',
      'https://www.facebook.com/macondostudios',
    );
    expect(screen.getByRole('link', { name: /Instagram/i })).toHaveAttribute(
      'href',
      'https://www.instagram.com/globalsteelgame',
    );
    expect(screen.getByRole('link', { name: /Youtube/i })).toHaveAttribute(
      'href',
      'https://www.youtube.com/channel/UCfYKziK0Ll8UZ9AiMTZT9DA',
    );
    expect(screen.getByRole('link', { name: /Discord/i })).toHaveAttribute(
      'href',
      'https://discord.gg/qVBvuy7Ny3',
    );
    expect(screen.getByRole('link', { name: /Twitch/i })).toHaveAttribute(
      'href',
      'https://www.twitch.tv/macondogames',
    );
    expect(
      screen.getByText(`Copyright © ${currentYear} | Macondo Games Pvt. Ltd.`),
    ).toBeInTheDocument();
  });
});