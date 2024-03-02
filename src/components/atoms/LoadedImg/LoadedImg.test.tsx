import React from 'react';
import { render, screen } from '@testing-library/react';

import LoadedImg from './LoadedImg';
import { AppReadyContext } from '../../../contexts/AppReadyContext';
import { ImageLoadedContext } from '../../../contexts/ImageLoadedContext';
import { IGatsbyImageData } from 'gatsby-plugin-image';

const mockImgData = { width: 100 } as IGatsbyImageData;

describe('LoadedImg', () => {
  test('Expect LoadedImg to be presented', () => {
    render(<LoadedImg imgName="testImg" alt="testImgAlt" imgData={mockImgData} />);
    expect(screen.getByAltText(/testImgAlt/)).toBeInTheDocument();
  });

  test('Expect LoadedImg to be visible if app is loaded', () => {
    render(
      <AppReadyContext.Provider value={true}>
        <LoadedImg imgName="testImg" alt="testImgAlt" imgData={mockImgData} />
      </AppReadyContext.Provider>,
    );
    expect(screen.queryByAltText(/testImgAlt/)?.parentElement?.parentElement).toHaveClass(
      'opacity-100',
    );
  });

  test('Expect LoadedImg to not be visible if app is not loaded', () => {
    render(
      <AppReadyContext.Provider value={false}>
        <LoadedImg imgName="testImg" alt="testImgAlt" imgData={mockImgData} />
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
        <LoadedImg imgName="testImg" imgData={mockImgData} />
      </ImageLoadedContext.Provider>,
    );

    expect(mockImageLoaded).toHaveBeenCalledWith('testImg');
  });
});
