import React from 'react';
import { render, screen } from '@testing-library/react';

import LoadedImg from './LoadedImg';
import { IGatsbyImageData } from 'gatsby-plugin-image';

const mockImgData = { width: 100 } as IGatsbyImageData;
const mockImageLoaded = jest.fn();

describe('LoadedImg', () => {
  test('Expect LoadedImg to be presented', () => {
    render(
      <LoadedImg
        imgName="testImg"
        alt="testImgAlt"
        imgData={mockImgData}
        imageLoaded={mockImageLoaded}
        fadeIn
      />,
    );
    expect(screen.getByAltText(/testImgAlt/)).toBeInTheDocument();
  });

  test('Expect LoadedImg to be visible if fadeIn prop is true', () => {
    render(
      <LoadedImg
        imgName="testImg"
        alt="testImgAlt"
        imgData={mockImgData}
        imageLoaded={mockImageLoaded}
        fadeIn
      />,
    );
    expect(screen.queryByAltText(/testImgAlt/)?.parentElement?.parentElement).toHaveClass(
      'opacity-100',
    );
  });

  test('Expect LoadedImg to be invisible if fadeIn prop is true', () => {
    render(
      <LoadedImg
        imgName="testImg"
        alt="testImgAlt"
        imgData={mockImgData}
        imageLoaded={mockImageLoaded}
        fadeIn={false}
      />,
    );
    expect(screen.queryByAltText(/testImgAlt/)?.parentElement?.parentElement).toHaveClass(
      'opacity-0',
    );
  });

  test('Expect imageLoaded to be called after img is complete', () => {
    render(
      <LoadedImg imgName="testImg" imgData={mockImgData} imageLoaded={mockImageLoaded} fadeIn />,
    );

    expect(mockImageLoaded).toHaveBeenCalledWith('testImg');
  });
});
