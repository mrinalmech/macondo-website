import React from 'react';
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import * as gatsByPluginI18 from 'gatsby-plugin-react-i18next';

import { scroll, resize } from '../../../util/tests';

import Header from './Header';

describe('Header', () => {
  test('Expect header to be presented', async () => {
    jest.spyOn(gatsByPluginI18, 'useI18next').mockImplementation(
      () =>
        ({
          languages: ['en', 'de'],
          i18n: {
            resolvedLanguage: 'en',
          },
          originalPath: '/',
        } as any),
    );

    render(<Header />);

    await waitFor(() => {
      expect(screen.getByAltText(/company_logo_alt/)).toBeInTheDocument();
    });

    expect(screen.getByAltText(/company_logo_alt/)).toBeInTheDocument();
    expect(screen.getByAltText(/company_logo_alt/).closest('a')).toHaveAttribute('href', '/');

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
    expect(screen.getByRole('link', { name: /Twitter/ })).toHaveAttribute(
      'href',
      'https://twitter.com/macondostudios',
    );
    expect(screen.getByRole('link', { name: /Facebook/ })).toHaveAttribute(
      'href',
      'https://www.facebook.com/macondostudios',
    );
    expect(screen.getByRole('link', { name: /Instagram/ })).toHaveAttribute(
      'href',
      'https://www.instagram.com/globalsteelgame',
    );
    expect(screen.getByRole('link', { name: /Youtube/ })).toHaveAttribute(
      'href',
      'https://www.youtube.com/channel/UCfYKziK0Ll8UZ9AiMTZT9DA',
    );
    expect(screen.getByRole('link', { name: /Discord/ })).toHaveAttribute(
      'href',
      'https://discord.gg/qVBvuy7Ny3',
    );
    expect(screen.getByRole('link', { name: /Twitch/ })).toHaveAttribute(
      'href',
      'https://www.twitch.tv/macondogames',
    );

    expect(screen.getByRole('link', { name: /en/ })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /en/ })).toHaveClass('underline');

    expect(screen.getByRole('link', { name: /de/ })).toHaveAttribute('href', '/de/');
    expect(screen.getByRole('link', { name: /de/ })).not.toHaveClass('underline');
  });

  test('Expect correct language link to be active', () => {
    jest.spyOn(gatsByPluginI18, 'useI18next').mockImplementation(
      () =>
        ({
          languages: ['en', 'de'],
          i18n: {
            resolvedLanguage: 'de',
          },
          originalPath: '/',
        } as any),
    );

    render(<Header />);

    expect(screen.getByRole('link', { name: /en/ })).not.toHaveClass('underline');

    expect(screen.getByRole('link', { name: /de/ })).toHaveClass('underline');
  });

  test('Expect header to have black background on scroll', () => {
    render(<Header />);

    expect(screen.getByTestId(/nav-holder/)).toBeInTheDocument();
    expect(screen.getByTestId(/nav-holder/)).not.toHaveClass('bg-black');

    act(() => scroll(50));

    expect(screen.getByTestId(/nav-holder/)).toHaveClass('bg-black');
  });

  test('Expect drawer to be only visible on click', () => {
    render(<Header />);

    expect(screen.queryByTestId(/drawer/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/hamburger_open/));

    expect(screen.getByTestId(/drawer/)).toBeInTheDocument();
  });

  test('Expect drawer to be hidden if screen is expanded', async () => {
    act(() => resize(400));

    render(<Header />);

    fireEvent.click(screen.getByLabelText(/hamburger_open/));

    expect(screen.getByTestId(/drawer/)).toBeInTheDocument();

    act(() => resize(1920));

    await waitForElementToBeRemoved(() => screen.queryByTestId(/drawer/));
  });
});
