import React from 'react';
import { render, screen } from '@testing-library/react';
import * as Gatsby from 'gatsby';

import LoadedImg from './LoadedImg';
import { AppReadyContext } from '../../../contexts/AppReadyContext';

const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
const mockUseStaticQuery = {
  monitorImg: {
    nodes: [],
  },
  otherImgs: {
    nodes: [{ name: 'testImg' }],
  },
};

beforeEach(() => {
  useStaticQuery.mockImplementation(() => mockUseStaticQuery);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('LoadedImg', () => {
  test('Expect LoadedImg to be presented', () => {
    render(<LoadedImg imgName="testImg" alt="testImgAlt" />);
    expect(screen.getByAltText(/testImgAlt/i)).toBeInTheDocument();
  });

  test('Expect LoadedImg to be not presented if image not in filesystem', () => {
    render(<LoadedImg imgName="testImg2" alt="testImgAlt" />);
    expect(screen.queryByAltText(/testImgAlt/i)).not.toBeInTheDocument();
  });

  test('Expect LoadedImg to be not visible if app is loaded', () => {
    render(
      <AppReadyContext.Provider value={true}>
        <LoadedImg imgName="testImg" alt="testImgAlt" />
      </AppReadyContext.Provider>,
    );
    expect(screen.queryByAltText(/testImgAlt/i)?.parentElement).toHaveClass('animFinal');
  });
});