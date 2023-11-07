import '@testing-library/jest-dom';

jest.mock('gatsby-plugin-image', () => {
  const React = require('react');
  const plugin = jest.requireActual('gatsby-plugin-image');

  const mockImage = ({ alt }) =>
    React.createElement('img', {
      alt: alt,
    });

  const mockImageData = () => ({ width: 100 });

  const mockPlugin = {
    ...plugin,
    getImage: jest.fn().mockImplementation(mockImageData),
    GatsbyImage: jest.fn().mockImplementation(mockImage),
    StaticImage: jest.fn().mockImplementation(mockImage),
  };

  return mockPlugin;
});
