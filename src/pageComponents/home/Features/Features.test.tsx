import React from 'react';
import { render, screen } from '@testing-library/react';
import * as Gatsby from 'gatsby';

import Features from './Features';

const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
const mockUseStaticQuery = {
  allFile: {
    nodes: [{ name: 'players' }, { name: 'enemies' }, { name: 'upgrades' }],
  },
};

beforeEach(() => {
  useStaticQuery.mockImplementation(() => mockUseStaticQuery);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Features', () => {
  test('Expect Features to be presented', () => {
    render(<Features />);

    expect(screen.getByAltText(/Players/i)).toBeInTheDocument();
    expect(screen.getByText(/THE GOOD/i)).toBeInTheDocument();

    expect(screen.getByAltText(/Enemies/i)).toBeInTheDocument();
    expect(screen.getByText(/THE BAD/i)).toBeInTheDocument();

    expect(screen.getByAltText(/Upgrades/i)).toBeInTheDocument();
    expect(screen.getByText(/...AND, THE UPGRADES/i)).toBeInTheDocument();
  });
});
