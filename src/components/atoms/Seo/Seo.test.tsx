import React from 'react';
import { render, screen } from '@testing-library/react';
import * as Gatsby from 'gatsby';

import SEO, { Props } from './Seo';

const useStaticQuery = jest.spyOn(Gatsby, `useStaticQuery`);
const mockUseStaticQuery = {
  site: {
    siteMetadata: {
      title: 'TestDefaultTitle',
      description: 'TestDefaultDescription',
      author: 'TestDefaultAuthor',
      siteUrl: 'test-default-url',
    },
  },
};

function getMeta(metaName: string) {
  const metas = document.getElementsByTagName('meta');
  for (let i = 0; i < metas.length; i += 1) {
    if (metas[i].getAttribute('name') === metaName) {
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
  const Component = ({ children, ...props }: Props) => <SEO {...props}>{children}</SEO>;

  test('Expect SEO to be presented with defaults', () => {
    render(<Component />);

    expect(screen.getByText(/TestDefaultTitle/i)).toBeInTheDocument();
    expect(getMeta('description')).toEqual('TestDefaultDescription');
    expect(getMeta('og:title')).toEqual('TestDefaultTitle');
    expect(getMeta('og:description')).toEqual('TestDefaultDescription');
    expect(getMeta('og:type')).toEqual('website');
    expect(getMeta('twitter:card')).toEqual('summary');
    expect(getMeta('twitter:title')).toEqual('TestDefaultTitle');
    expect(getMeta('twitter:url')).toEqual('test-default-url');
    expect(getMeta('twitter:description')).toEqual('TestDefaultDescription');
    expect(getMeta('twitter:creator')).toEqual('TestDefaultAuthor');
  });

  test('Expect SEO to be presented with overriden values', () => {
    render(<Component title="TestTitle" description="TestDescription" pathname="/test-path" />);

    expect(screen.getByText(/TestTitle/i)).toBeInTheDocument();
    expect(getMeta('description')).toEqual('TestDescription');
    expect(getMeta('og:title')).toEqual('TestTitle');
    expect(getMeta('og:description')).toEqual('TestDescription');
    expect(getMeta('twitter:title')).toEqual('TestTitle');
    expect(getMeta('twitter:url')).toEqual('test-default-url/test-path');
    expect(getMeta('twitter:description')).toEqual('TestDescription');
  });

  test('Expect SEO to be presented with optional meta tags', () => {
    render(
      <Component>
        <meta name="test-meta" content="test-content" />
      </Component>,
    );

    expect(getMeta('test-meta')).toEqual('test-content');
  });
});
