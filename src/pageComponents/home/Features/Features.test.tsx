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

    expect(screen.getByAltText(/Three figures leaping into action/)).toBeInTheDocument();
    expect(screen.getByText(/feature-1-heading/)).toBeInTheDocument();

    expect(screen.getByAltText(/Four figures in a menacing pose/)).toBeInTheDocument();
    expect(screen.getByText(/feature-2-heading/)).toBeInTheDocument();

    expect(screen.getByAltText(/Three different guns, disassembled/)).toBeInTheDocument();
    expect(screen.getByText(/feature-3-heading/)).toBeInTheDocument();
  });
});
