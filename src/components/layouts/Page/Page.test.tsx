import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  test('Expect Page to be presented', async () => {
    const currentYear = new Date().getFullYear();

    render(<Page>Test content</Page>);

    await waitFor(() => {
      expect(screen.getByText(/Test content/)).toBeInTheDocument();
    });

    expect(screen.getByAltText(/Company Logo/)).toBeInTheDocument();
    expect(screen.getByAltText(/Company Logo/).parentElement?.parentElement).toHaveAttribute(
      'href',
      '/',
    );
    expect(screen.getByRole('link', { name: /Blog/ })).toHaveAttribute(
      'href',
      'https://blog.macondogames.com/',
    );
    expect(screen.getByRole('link', { name: /Press/ })).toHaveAttribute('href', '/press');
    expect(screen.getByRole('link', { name: /Contact/ })).toHaveAttribute(
      'href',
      'mailto:info@macondogames.com',
    );
    expect(screen.getByRole('link', { name: /Steam/ })).toHaveAttribute(
      'href',
      'https://store.steampowered.com/app/1073970/Global_Steel/',
    );

    expect(screen.getByText(/Keep up with us!/)).toBeInTheDocument();
    expect(
      screen.getByText(`Copyright © ${currentYear} | Macondo Games Pvt. Ltd.`),
    ).toBeInTheDocument();

    expect(screen.getAllByRole('link', { name: /Twitter/ })).toHaveLength(2);
    expect(screen.getAllByRole('link', { name: /Facebook/ })).toHaveLength(2);
    expect(screen.getAllByRole('link', { name: /Instagram/ })).toHaveLength(2);
    expect(screen.getAllByRole('link', { name: /Youtube/ })).toHaveLength(2);
    expect(screen.getAllByRole('link', { name: /Discord/ })).toHaveLength(2);
    expect(screen.getAllByRole('link', { name: /Twitch/ })).toHaveLength(2);
  });
});
