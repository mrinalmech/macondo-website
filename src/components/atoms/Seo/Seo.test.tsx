import React from 'react';
import { render, screen } from '@testing-library/react';
import * as Gatsby from 'gatsby';

import SEO from './Seo';

const useStaticQuery = jest.spyOn(Gatsby, `useStaticQuery`);
const mockUseStaticQuery = {
  site: {
    siteMetadata: {
      title: 'TestDefaultTitle',
      description: 'TestDefaultDescription',
      author: 'TestDefaultAuthor',
      siteUrl: 'test-default-url',
      googleSiteVerification: 'TestDefaultGoogleSiteVerification',
    },
  },
};

function getMeta(metaName: string) {
  const metas = document.getElementsByTagName('meta');
  for (let i = 0; i < metas.length; i += 1) {
    if (metas[i].getAttribute('name') === metaName) {
      return metas[i].getAttribute('content');
    } else if (metas[i].getAttribute('property') === metaName) {
      return metas[i].getAttribute('content');
    }
  }
  return '';
}

beforeEach(() => {
  useStaticQuery.mockImplementation(() => mockUseStaticQuery);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('SEO', () => {
  const TestSEO = (props: { [prop: string]: any }) => <SEO isTest {...props} />;

  test('Expect SEO to be presented with defaults', () => {
    render(<TestSEO />);

    expect(screen.getByText(/TestDefaultTitle/)).toBeInTheDocument();
    expect(getMeta('lang')).toEqual('en');
    expect(getMeta('description')).toEqual('TestDefaultDescription');
    expect(getMeta('og:type')).toEqual('website');
    expect(getMeta('og:title')).toEqual('TestDefaultTitle');
    expect(getMeta('og:description')).toEqual('TestDefaultDescription');
    expect(getMeta('og:url')).toEqual('test-default-url');
    expect(getMeta('og:site_name')).toEqual('TestDefaultTitle');
    expect(getMeta('twitter:card')).toEqual('summary');
    expect(getMeta('twitter:title')).toEqual('TestDefaultTitle');
    expect(getMeta('twitter:url')).toEqual('test-default-url');
    expect(getMeta('twitter:description')).toEqual('TestDefaultDescription');
    expect(getMeta('twitter:creator')).toEqual('TestDefaultAuthor');
    expect(getMeta('google-site-verification')).toEqual('TestDefaultGoogleSiteVerification');
  });

  test('Expect SEO to be presented with overriden values', () => {
    render(
      <TestSEO
        lang="de"
        title="TestTitle"
        description="TestDescription"
        pathname="/test-path"
        ogImg={{
          width: 100,
          height: 100,
          images: {
            fallback: {
              src: '/og-img-url',
            },
          },
        }}
        ogImgAlt="TestOgImgAlt"
      />,
    );

    expect(screen.getByText(/TestDefaultTitle \| TestTitle/)).toBeInTheDocument();
    expect(getMeta('lang')).toEqual('de');
    expect(getMeta('description')).toEqual('TestDescription');
    expect(getMeta('og:title')).toEqual('TestDefaultTitle | TestTitle');
    expect(getMeta('og:description')).toEqual('TestDescription');
    expect(getMeta('og:url')).toEqual('test-default-url/test-path');
    expect(getMeta('og:site_name')).toEqual('TestDefaultTitle | TestTitle');
    expect(getMeta('og:image')).toEqual('test-default-url/og-img-url');
    expect(getMeta('og:image:width')).toEqual('100');
    expect(getMeta('og:image:height')).toEqual('100');
    expect(getMeta('og:image:alt')).toEqual('TestOgImgAlt');
    expect(getMeta('twitter:title')).toEqual('TestDefaultTitle | TestTitle');
    expect(getMeta('twitter:url')).toEqual('test-default-url/test-path');
    expect(getMeta('twitter:description')).toEqual('TestDescription');
    expect(getMeta('twitter:image')).toEqual('test-default-url/og-img-url');
    expect(getMeta('twitter:image:alt')).toEqual('TestOgImgAlt');
  });

  test('Expect SEO to be presented with optional meta tags', () => {
    render(
      <TestSEO>
        <meta name="test-meta" content="test-content" />
      </TestSEO>,
    );

    expect(getMeta('test-meta')).toEqual('test-content');
  });
});
