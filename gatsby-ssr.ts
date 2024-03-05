import type { GatsbySSR } from 'gatsby';

import wrapWithProvider from './src/store/wrapWithProvider';

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'en' });
};

export const wrapRootElement: GatsbySSR['wrapRootElement'] = wrapWithProvider;
