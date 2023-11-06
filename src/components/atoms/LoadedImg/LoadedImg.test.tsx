import React from 'react';
import { render, screen } from '@testing-library/react';
import * as Gatsby from 'gatsby';
import * as GatsbyPluginImage from 'gatsby-plugin-image';

import LoadedImg from './LoadedImg';

interface ImageProps {
  alt: string;
}

const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
const mockUseStaticQuery = {
  monitorImg: {
    nodes: [],
  },
  otherImgs: {
    nodes: [{ name: 'testImg' }],
  },
};

jest.mock('gatsby-plugin-image', () => {
  const React = require('react');
  const plugin = jest.requireActual('gatsby-plugin-image');

  const mockImage = ({ alt }: ImageProps) =>
    React.createElement('img', {
      alt: alt,
    });

  const mockImageData = () => ({ width: 100 } as GatsbyPluginImage.IGatsbyImageData);

  const mockPlugin = {
    ...plugin,
    getImage: jest.fn().mockImplementation(mockImageData),
    GatsbyImage: jest.fn().mockImplementation(mockImage),
  };

  return mockPlugin;
});

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
});
