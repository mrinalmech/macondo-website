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

    expect(screen.getByAltText(/game_logo_alt/)).toBeInTheDocument();
    expect(screen.getByTestId(/wall-shade/)).toBeInTheDocument();
    expect(screen.getByTestId(/websiteBaseL1-left/)).toBeInTheDocument();
    expect(screen.getByTestId(/websiteBaseL2-left/)).toBeInTheDocument();
    expect(screen.getByTestId(/websiteBaseL1-right/)).toBeInTheDocument();
    expect(screen.getByTestId(/websiteBaseL2-right/)).toBeInTheDocument();
    expect(screen.getByTestId(/monitor/)).toBeInTheDocument();

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

    expect(screen.getByAltText(/screenshot_0_alt/).closest('.duration-1000')).not.toHaveClass(
      'opacity-0',
    );
    expect(screen.getByAltText(/screenshot_1_alt/).closest('.duration-1000')).toHaveClass(
      'opacity-0',
    );

    act(() => jest.advanceTimersByTime(slideDuration));

    expect(screen.getByAltText(/screenshot_1_alt/).closest('.duration-1000')).not.toHaveClass(
      'opacity-0',
    );
    expect(screen.getByAltText(/screenshot_2_alt/).closest('.duration-1000')).toHaveClass(
      'opacity-0',
    );

    act(() => jest.advanceTimersByTime(slideDuration));

    expect(screen.getByAltText(/screenshot_2_alt/).closest('.duration-1000')).not.toHaveClass(
      'opacity-0',
    );
    expect(screen.getByAltText(/screenshot_3_alt/).closest('.duration-1000')).toHaveClass(
      'opacity-0',
    );

    act(() => jest.advanceTimersByTime(slideDuration));

    expect(screen.getByAltText(/screenshot_3_alt/).closest('.duration-1000')).not.toHaveClass(
      'opacity-0',
    );
    expect(screen.getByAltText(/screenshot_4_alt/).closest('.duration-1000')).toHaveClass(
      'opacity-0',
    );

    act(() => jest.advanceTimersByTime(slideDuration));

    expect(screen.getByAltText(/screenshot_4_alt/).closest('.duration-1000')).not.toHaveClass(
      'opacity-0',
    );
    expect(screen.getByAltText(/screenshot_0_alt/).closest('.duration-1000')).toHaveClass(
      'opacity-0',
    );
  });
});
