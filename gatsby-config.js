const autoprefixer = require('autoprefixer');
const postCssDiscardDuplicates = require('postcss-discard-duplicates');
const postCssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postCssFocus = require('postcss-focus');

module.exports = {
  flags: {
    DEV_SSR: true,
  },
  siteMetadata: {
    title: 'Macondo Games',
    description:
      'Purveyor of the finest gaming wares. Macondo Games is a studio located in Mumbai, India working on their first title, a 2d run and gun shooter Global Steel.',
    author: 'Mrinal Mech',
    siteUrl: 'https://www.macondogames.com',
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Macondo Games`,
        short_name: `Macondo Games`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        display: `standalone`,
        icon: `src/images/icon.png`,
        icons: [
          {
            src: 'src/images/icon.png',
            sizes: '512X512',
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
