const autoprefixer = require("autoprefixer")
const postCssDiscardDuplicates = require("postcss-discard-duplicates")
const postCssFlexbugsFixes = require("postcss-flexbugs-fixes")
const postCssFocus = require("postcss-focus")

module.exports = {
  siteMetadata: {
    title: "Macondo Games",
    description: "Purveyor of the finest gaming wares. Macondo Games is a studio located in Mumbai, India working on their first title, a 2d run and gun shooter Global Steel.",
    author: "Mrinal Mech",
    siteUrl: "https://www.macondogames.com",
  },
  plugins: [{
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
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: "http://devdiary.local/graphql",
        verbose: true,
        develop: {
          hardCacheMediaFiles: true,
        },
        debug: {
          graphql: {
            writeQueriesToDisk: true,
          },
        },
        html: {
          fallbackImageMaxWidth: 800,
        },
        // fields can be excluded globally.
        // this example is for wp-graphql-gutenberg.
        // since we can get block data on the `block` field
        // we don't need these fields
        excludeFieldNames: [`blocksJSON`, `saveContent`],
        type: {
          Post: {
            limit:
              process.env.NODE_ENV === `development`
                ? // Lets just pull 50 posts in development to make it easy on ourselves.
                  35
                : // And then we can pull all posts in production
                  null,
          },
          // this shows how to exclude entire types from the schema
          // this example is for wp-graphql-gutenberg
          CoreParagraphBlockAttributesV2: {
            exclude: true,
          },
        },
      },
    },
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
    /*{
      resolve: `gatsby-plugin-offline`,
      options: {
        workboxConfig: {
          globPatterns: ['*.html','*.png','*.jpg']
        }
      }
    },*/
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
    `gatsby-plugin-fontawesome-css`
  ],
}
