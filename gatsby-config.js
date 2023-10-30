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
    /*{
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },*/
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
