import React from 'react';
import { render, screen } from '@testing-library/react';
import * as Gatsby from 'gatsby';

import LoadedImg from './LoadedImg';
import { AppReadyContext } from '../../../contexts/AppReadyContext';
import { ImageLoadedContext } from '../../../contexts/ImageLoadedContext';

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
    expect(screen.getByAltText(/testImgAlt/)).toBeInTheDocument();
  });

  test('Expect LoadedImg to be not presented if image not in filesystem', () => {
    render(<LoadedImg imgName="testImg2" alt="testImgAlt" />);
    expect(screen.queryByAltText(/testImgAlt/)).not.toBeInTheDocument();
  });

  test('Expect LoadedImg to be visible if app is loaded', () => {
    render(
      <AppReadyContext.Provider value={true}>
        <LoadedImg imgName="testImg" alt="testImgAlt" />
      </AppReadyContext.Provider>,
    );
    expect(screen.queryByAltText(/testImgAlt/)?.parentElement?.parentElement).toHaveClass(
      'opacity-100',
    );
  });

  test('Expect LoadedImg to not be visible if app is not loaded', () => {
    render(
      <AppReadyContext.Provider value={false}>
        <LoadedImg imgName="testImg" alt="testImgAlt" />
      </AppReadyContext.Provider>,
    );
    expect(screen.queryByAltText(/testImgAlt/)?.parentElement?.parentElement).toHaveClass(
      'opacity-0',
    );
  });

  test('Expect imageLoaded to be called after img is complete', () => {
    const mockImageLoaded = jest.fn();
    render(
      <ImageLoadedContext.Provider value={mockImageLoaded}>
        <LoadedImg imgName="testImg" />
      </ImageLoadedContext.Provider>,
    );

    expect(mockImageLoaded).toHaveBeenCalledWith('testImg');
  });
});
