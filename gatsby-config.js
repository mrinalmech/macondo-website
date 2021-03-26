const autoprefixer = require("autoprefixer")
const postCssDiscardDuplicates = require("postcss-discard-duplicates")
const postCssFlexbugsFixes = require("postcss-flexbugs-fixes")
const postCssFocus = require("postcss-focus")

module.exports = {
  siteMetadata: {
    title: "Macondo Games",
    description: "Purveyor of the finest gaming wares",
    author: "Mrinal Mech",
    siteUrl: "https://www.macondogames.com",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Macondo Games`,
        short_name: `Macondo Games`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-sass",
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
}
