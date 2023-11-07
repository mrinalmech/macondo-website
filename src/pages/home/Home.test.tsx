import React from 'react';
import { render, screen } from '@testing-library/react';
import * as Gatsby from 'gatsby';
import { FileSystemNode } from 'gatsby-source-filesystem';

import Home from './index';

const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
const mockUseStaticQuery = {
  site: {
    siteMetadata: {
      title: 'TestDefaultTitle',
      description: 'TestDefaultDescription',
      author: 'TestDefaultAuthor',
      siteUrl: 'test-default-url',
    },
  },
  allFile: {
    nodes: [{ name: 'players' }, { name: 'enemies' }, { name: 'upgrades' }],
  },
  monitorImg: {
    nodes: [{ name: 'monitor' }],
  },
  otherImgs: {
    nodes: [
      { name: 'logo' },
      { name: 'wallShade' },
      { name: 'websiteBaseL1' },
      { name: 'websiteBaseL2' },
      { name: 'screenshot0' },
      { name: 'screenshot1' },
      { name: 'screenshot2' },
      { name: 'screenshot3' },
      { name: 'screenshot4' },
    ],
  },
};

beforeEach(() => {
  jest.useFakeTimers();
  useStaticQuery.mockImplementation(() => mockUseStaticQuery);
});

afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllTimers();
});

describe('Home', () => {
  const nodes = [
    { name: 'monitor' },
    { name: 'logo' },
    { name: 'wallShade' },
    { name: 'websiteBaseL1' },
    { name: 'websiteBaseL2' },
    { name: 'screenshot0' },
    { name: 'screenshot1' },
    { name: 'screenshot2' },
    { name: 'screenshot3' },
    { name: 'screenshot4' },
  ] as FileSystemNode[];

  const data = {
    allFile: {
      nodes,
    },
  };

  test('Expect Home to be presented', () => {
    render(<Home data={data} />);
  });
});
