import React from 'react';
import { render, screen } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  test('Expect Page to be presented', () => {
    const currentYear = new Date().getFullYear();

    render(<Page>Test content</Page>);

    expect(screen.getByText(/Test content/)).toBeInTheDocument();

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

  test('Expect Page to have overflow hidden', () => {
    render(<Page overFlowHidden>Test content</Page>);

    expect(screen.getByTestId(/page/)).toHaveClass('overflow-hidden');
  });
});
