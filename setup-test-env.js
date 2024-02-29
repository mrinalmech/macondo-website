import '@testing-library/jest-dom';

jest.mock('gatsby-plugin-image', () => {
  const React = require('react');
  const plugin = jest.requireActual('gatsby-plugin-image');

  const mockImage = ({ alt, handleLoad }) => (
    <div>
      <img alt={alt} onLoad={handleLoad} />
    </div>
  );
  const mockImageData = () => ({ width: 100 });

  const mockPlugin = {
    ...plugin,
    getImage: jest.fn().mockImplementation(mockImageData),
    GatsbyImage: jest.fn().mockImplementation(mockImage),
    StaticImage: jest.fn().mockImplementation(mockImage),
  };

  return mockPlugin;
});

jest.mock('react-i18next', () => {
  const React = require('react');
  const plugin = jest.requireActual('react-i18next');

  const mockTrans = ({ children }) => <>{children}</>;

  return {
    ...plugin,
    useTranslation: () => {
      return {
        t: str => str,
        i18n: {
          changeLanguage: () => new Promise(() => {}),
        },
      };
    },
    Trans: jest.fn().mockImplementation(mockTrans),
    initReactI18next: {
      type: '3rdParty',
      init: () => {},
    },
  };
});
