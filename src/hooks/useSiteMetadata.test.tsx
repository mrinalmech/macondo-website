import { useSiteMetadata } from './useSiteMetadata';
import * as Gatsby from 'gatsby';

const useStaticQuery = jest.spyOn(Gatsby, `useStaticQuery`);
const mockUseStaticQuery = {
  site: {
    siteMetadata: {
      title: 'Test title',
      description: 'Test description',
      author: 'Test author',
      siteUrl: '/',
      googleSiteVerification: 'Test site verification',
    },
  },
};

beforeEach(() => {
  useStaticQuery.mockImplementation(() => mockUseStaticQuery);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useSiteMetadata', () => {
  test('Expect useSiteMetaData to return correct data', () => {
    const metaData = useSiteMetadata();

    expect(metaData).toEqual({
      title: 'Test title',
      description: 'Test description',
      author: 'Test author',
      siteUrl: '/',
      googleSiteVerification: 'Test site verification',
    });
  });
});
