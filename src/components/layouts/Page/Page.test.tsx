import React from 'react';
import { render, screen } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  test('Expect Page to be presented', () => {
    const currentYear = new Date().getFullYear();

    render(<Page>Test content</Page>);

    expect(screen.getByText(/Test content/i)).toBeInTheDocument();

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

    expect(screen.getByText(/Keep up with us!/i)).toBeInTheDocument();
    expect(
      screen.getByText(`Copyright © ${currentYear} | Macondo Games Pvt. Ltd.`),
    ).toBeInTheDocument();

    expect(screen.getAllByRole('link', { name: /Twitter/i })).toHaveLength(2);
    expect(screen.getAllByRole('link', { name: /Facebook/i })).toHaveLength(2);
    expect(screen.getAllByRole('link', { name: /Instagram/i })).toHaveLength(2);
    expect(screen.getAllByRole('link', { name: /Youtube/i })).toHaveLength(2);
    expect(screen.getAllByRole('link', { name: /Discord/i })).toHaveLength(2);
    expect(screen.getAllByRole('link', { name: /Twitch/i })).toHaveLength(2);
  });
});
