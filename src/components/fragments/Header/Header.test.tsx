import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  test('Expect header to be presented', () => {
    render(<Header />);

    expect(screen.getByAltText(/Company Logo/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Company Logo/i).parentElement).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /Blog/i })).toHaveAttribute(
      'href',
      'https://blog.macondogames.com/',
    );
    expect(screen.getByRole('link', { name: /Press/i })).toHaveAttribute('href', '/press');
    expect(screen.getByRole('link', { name: /Contact/i })).toHaveAttribute(
      'href',
      'mailto:info@macondogames.com',
    );
    expect(screen.getByRole('link', { name: /Steam/i })).toHaveAttribute(
      'href',
      'https://store.steampowered.com/app/1073970/Global_Steel/',
    );
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
  });
});
