import React from 'react';
import { act, render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';

import Header from './Header';

function resize(width: number) {
  const event = new Event('resize', { bubbles: true, cancelable: true });

  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  window.dispatchEvent(event);
}

function scroll(scrollY: number) {
  const event = new Event('scroll', { bubbles: true, cancelable: true });

  Object.defineProperty(window, 'scrollY', {
    writable: true,
    configurable: true,
    value: scrollY,
  });
  window.dispatchEvent(event);
}

describe('Header', () => {
  test('Expect header to be presented', () => {
    render(<Header />);

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

    fireEvent.click(screen.getByLabelText(/Open the menu/));

    expect(screen.getByTestId(/drawer/)).toBeInTheDocument();
  });

  test('Expect drawer to be hidden if screen is expanded', async () => {
    act(() => resize(400));

    render(<Header />);

    fireEvent.click(screen.getByLabelText(/Open the menu/));

    expect(screen.getByTestId(/drawer/)).toBeInTheDocument();

    act(() => resize(1920));

    await waitForElementToBeRemoved(() => screen.queryByTestId(/drawer/));
  });
});
