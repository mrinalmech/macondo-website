import React from 'react';
import { render, screen } from '@testing-library/react';
import * as Gatsby from 'gatsby';

import Hero from './Hero';
import { AppReadyContext } from '../../../contexts/AppReadyContext';

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
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Hero', () => {
  test('Expect Hero to be presented', () => {
    render(
      <AppReadyContext.Provider value={true}>
        <Hero />
      </AppReadyContext.Provider>,
    );

    expect(screen.getByAltText(/Game Logo/)).toBeInTheDocument();
    expect(screen.getByAltText(/WallShade/)).toBeInTheDocument();
    expect(screen.getByAltText(/WebsiteBaseL1Left/)).toBeInTheDocument();
    expect(screen.getByAltText(/WebsiteBaseL2Left/)).toBeInTheDocument();
    expect(screen.getByAltText(/WebsiteBaseL1Right/)).toBeInTheDocument();
    expect(screen.getByAltText(/WebsiteBaseL2Right/)).toBeInTheDocument();
    expect(screen.getByAltText(/Monitor/)).toBeInTheDocument();

    expect(screen.getByAltText(/Red figure/)).toBeInTheDocument();
    expect(screen.getByAltText(/Green figure/)).toBeInTheDocument();
    expect(screen.getByAltText(/Three figures/)).toBeInTheDocument();
    expect(screen.getByAltText(/flaming figure/)).toBeInTheDocument();
    expect(screen.getByAltText(/light beams/)).toBeInTheDocument();

    expect(screen.getByText(/Global Steel is a 2d run-and-gun video game/)).toBeInTheDocument();
  });
});
