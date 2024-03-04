import type { GatsbyBrowser } from 'gatsby';

import './src/styles/global.scss';

import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';

import wrapWithProvider from './src/store/wrapWithProvider';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = wrapWithProvider;
