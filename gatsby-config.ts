import type { GatsbyConfig } from 'gatsby';

import autoprefixer from 'autoprefixer';
import postCssDiscardDuplicates from 'postcss-discard-duplicates';
import postCssFlexbugsFixes from 'postcss-flexbugs-fixes';
import postCssFocus from 'postcss-focus';

import { languages, defaultLanguage } from './languages';

require('dotenv').config({
  path: '.env',
});

interface i18nContext {
  language: string;
  languages: [string];
  defaultLanguage: string;
  originalPath: string;
}

interface SitePageContext {
  i18n: i18nContext;
}

interface SitePage {
  context: SitePageContext;
}

interface AllSitePages {
  allSitePage: {
    nodes: SitePage[];
  };
}

const isProduction = process.env.NODE_ENV === 'production';
const isDevDeployment = process.env.DEPLOY_ENV === 'development';
const isLocalMachine = process.env.DEPLOY_ENV === 'local';

const siteUrl = isDevDeployment ? 'https://dev.macondogames.com' : 'https://www.macondogames.com';

const config: GatsbyConfig = {
  flags: {
    DEV_SSR: true,
  },
  siteMetadata: {
    title: 'Macondo Games',
    description:
      'Macondo Games is a studio located in Goa, India working on their first title, a 2d run and gun shooter Global Steel.',
    author: 'Mrinal Mech',
    siteUrl,
    googleSiteVerification: 'z9-8K1FfiaGau_IyT7Wu09kWn800XDnlTJUshG8bSCs',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        disable: !isLocalMachine,
      },
    },
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        disableOnDev: true,
        reportOnly: false,
        mergeScriptHashes: true,
        mergeStyleHashes: true,
        mergeDefaultDirectives: true,
        directives: {
          'script-src': "'self' www.google-analytics.com",
          'style-src': "'self' 'unsafe-inline'",
          'img-src': "'self' data: www.google-analytics.com",
        },
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
        {
          allSitePage(filter: {context: {i18n: {routed: {eq: false}}}}) {
            nodes {
              context {
                i18n {
                  defaultLanguage
                  languages
                  originalPath
                }
              }
              path
            }
          }
        }
      `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({ allSitePage: { nodes: allPages } }: AllSitePages) => {
          const pressPage = allPages.find(page => page.context.i18n.originalPath === '/press/');

          if (pressPage) {
            const pressGlobalSteelPage = {
              ...pressPage,
              context: {
                ...pressPage.context,
                i18n: {
                  ...pressPage.context.i18n,
                  originalPath: '/press/globalsteel/',
                },
              },
            };

            return [...allPages, pressGlobalSteelPage];
          }

          return allPages;
        },
        serialize: (node: SitePage) => {
          const { languages, originalPath, defaultLanguage } = node.context.i18n;

          const newPath = originalPath === '/home/' ? '/' : originalPath;

          const url = siteUrl + newPath;
          const links = [
            { lang: defaultLanguage, url },
            { lang: 'x-default', url },
          ];
          languages.forEach(lang => {
            if (lang === defaultLanguage) return;
            links.push({ lang, url: `${siteUrl}/${lang}${newPath}` });
          });

          return {
            url,
            changefreq: 'daily',
            priority: newPath === '/' ? 1.0 : 0.7,
            links,
          };
        },
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: isDevDeployment ? 'https://dev.macondogames.com/' : 'https://www.macondogames.com',
        sitemap: isDevDeployment
          ? 'https://dev.macondogames.com/sitemap-index.xml'
          : 'https://www.macondogames.com/sitemap-index.xml',
        policy: [
          {
            userAgent: '*',
            disallow: [
              '/*wallShade.png',
              '/*wallShade.webp',
              '/*monitor.png',
              '*/monitor.webp',
              '*/websiteBaseL1.png',
              '*/websiteBaseL1.webp',
              '*/websiteBaseL2.png',
              '*/websiteBaseL2.webp',
            ],
          },
        ],
      },
    },
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
        name: `homeImages`,
        path: `${__dirname}/src/pages/home/images`,
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
        name: `logoShineImages`,
        path: `${__dirname}/src/pageComponents/home/Hero/images/logoShine`,
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
          {
            matchPath: '/dev-404-page',
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
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        tailwind: true,
        purgeOnly: ['/src/styles/global.scss'],
      },
    },
  ],
};

export default config;
