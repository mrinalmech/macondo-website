import React from 'react';
import { act, render, screen } from '@testing-library/react';
import * as Gatsby from 'gatsby';

import Hero from './Hero';
import { SLIDE_DURATION } from './constants';

const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
const mockUseStaticQuery = {
  monitorImg: {
    nodes: [{ name: 'monitor' }],
  },
  otherImgs: {
    nodes: [
      { name: 'logo' },
      { name: 'wallShade' },
      { name: 'websiteBaseL1' },
      { name: 'websiteBaseL2' },
      { name: 'screenshot0' },
      { name: 'screenshot1' },
      { name: 'screenshot2' },
      { name: 'screenshot3' },
      { name: 'screenshot4' },
    ],
  },
};

beforeEach(() => {
  useStaticQuery.mockImplementation(() => mockUseStaticQuery);
  jest.useFakeTimers();
});

afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllTimers();
});

describe('Hero', () => {
  test('Expect Hero to be presented', () => {
    render(<Hero />);

    expect(screen.getByAltText(/Game Logo/)).toBeInTheDocument();
    expect(screen.getByAltText(/WallShade/)).toBeInTheDocument();
    expect(screen.getByAltText(/WebsiteBaseL1Left/)).toBeInTheDocument();
    expect(screen.getByAltText(/WebsiteBaseL2Left/)).toBeInTheDocument();
    expect(screen.getByAltText(/WebsiteBaseL1Right/)).toBeInTheDocument();
    expect(screen.getByAltText(/WebsiteBaseL2Right/)).toBeInTheDocument();
    expect(screen.getByAltText(/Monitor/)).toBeInTheDocument();

    expect(screen.getByAltText(/screenshot_0_alt/)).toBeInTheDocument();
    expect(screen.getByAltText(/screenshot_1_alt/)).toBeInTheDocument();
    expect(screen.getByAltText(/screenshot_2_alt/)).toBeInTheDocument();
    expect(screen.getByAltText(/screenshot_3_alt/)).toBeInTheDocument();
    expect(screen.getByAltText(/screenshot_4_alt/)).toBeInTheDocument();

    expect(screen.getByText(/Global Steel is a 2d run-and-gun video game/)).toBeInTheDocument();
  });

  test('Expect slideshow to function properly', () => {
    render(<Hero />);

    const slideDuration = SLIDE_DURATION * 1000;

    expect(screen.getByAltText(/screenshot_0_alt/).parentElement?.parentElement).not.toHaveClass(
      'opacity-0',
    );
    expect(screen.getByAltText(/screenshot_1_alt/).parentElement?.parentElement).toHaveClass(
      'opacity-0',
    );

    act(() => jest.advanceTimersByTime(slideDuration));

    expect(screen.getByAltText(/screenshot_1_alt/).parentElement?.parentElement).not.toHaveClass(
      'opacity-0',
    );
    expect(screen.getByAltText(/screenshot_2_alt/).parentElement?.parentElement).toHaveClass(
      'opacity-0',
    );

    act(() => jest.advanceTimersByTime(slideDuration));

    expect(screen.getByAltText(/screenshot_2_alt/).parentElement?.parentElement).not.toHaveClass(
      'opacity-0',
    );
    expect(screen.getByAltText(/screenshot_3_alt/).parentElement?.parentElement).toHaveClass(
      'opacity-0',
    );

    act(() => jest.advanceTimersByTime(slideDuration));

    expect(screen.getByAltText(/screenshot_3_alt/).parentElement?.parentElement).not.toHaveClass(
      'opacity-0',
    );
    expect(screen.getByAltText(/screenshot_4_alt/).parentElement?.parentElement).toHaveClass(
      'opacity-0',
    );

    act(() => jest.advanceTimersByTime(slideDuration));

    expect(screen.getByAltText(/screenshot_4_alt/).parentElement?.parentElement).not.toHaveClass(
      'opacity-0',
    );
    expect(screen.getByAltText(/screenshot_0_alt/).parentElement?.parentElement).toHaveClass(
      'opacity-0',
    );
  });
});
