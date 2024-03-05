import type { GatsbyConfig } from 'gatsby';

import autoprefixer from 'autoprefixer';
import postCssDiscardDuplicates from 'postcss-discard-duplicates';
import postCssFlexbugsFixes from 'postcss-flexbugs-fixes';
import postCssFocus from 'postcss-focus';

import { languages, defaultLanguage } from './languages';

const isProduction = process.env.NODE_ENV === 'production';
const isDevDeployment = process.env.DEPLOY_ENV === 'development';

const config: GatsbyConfig = {
  flags: {
    DEV_SSR: true,
  },
  siteMetadata: {
    title: 'Macondo Games',
    description:
      'Purveyor of the finest gaming wares. Macondo Games is a studio located in Mumbai, India working on their first title, a 2d run and gun shooter Global Steel.',
    author: 'Mrinal Mech',
    siteUrl: isDevDeployment ? 'https://dev.macondogames.com/' : 'https://www.macondogames.com',
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          quality: 100,
        },
      },
    },
    'gatsby-plugin-eslint',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Macondo Games`,
        short_name: `Macondo Games`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#000`,
        display: `standalone`,
        icon: `src/images/icon.png`,
        icons: [
          {
            src: 'src/images/icon.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'src/images/maskable-icon.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `ogImages`,
        path: `${__dirname}/src/components/atoms/Seo/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `featureImages`,
        path: `${__dirname}/src/pageComponents/home/Features/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `loadingHeroImages`,
        path: `${__dirname}/src/pageComponents/home/Hero/images/loading`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `locale`,
        path: `${__dirname}/locales`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        languages,
        defaultLanguage,
        siteUrl: 'https://www.macondogames.com',
        i18nextOptions: {
          fallbackLng: defaultLanguage,
          supportedLngs: languages,
          defaultNS: 'common',
          interpolation: {
            escapeValue: false,
          },
        },
        redirect: isProduction,
        pages: [
          {
            matchPath: '/press',
            languages: ['en'],
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        cssLoaderOptions: {
          camelCase: false,
        },
        postCssPlugins: [
          autoprefixer(),
          postCssDiscardDuplicates(),
          postCssFlexbugsFixes(),
          postCssFocus(),
        ],
      },
    },
  ],
};

export default config;
