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

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation(() => true),
  useDispatch: jest.fn().mockImplementation(() => {}),
}));

beforeEach(() => {
  useStaticQuery.mockImplementation(() => mockUseStaticQuery);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Features', () => {
  test('Expect Features to be presented', () => {
    render(<Features />);

    expect(screen.getByAltText(/feature_1_alt/)).toBeInTheDocument();
    expect(screen.getByText(/feature_1_heading/)).toBeInTheDocument();

    expect(screen.getByAltText(/feature_2_alt/)).toBeInTheDocument();
    expect(screen.getByText(/feature_2_heading/)).toBeInTheDocument();

    expect(screen.getByAltText(/feature_3_alt/)).toBeInTheDocument();
    expect(screen.getByText(/feature_3_heading/)).toBeInTheDocument();
  });
});
