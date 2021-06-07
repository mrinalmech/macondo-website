const path = require(`path`)
const glob = require(`glob`)

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const createBlog = require(`./create/createBlog`)

const getTemplates = () => {
  const sitePath = path.resolve(`./`)
  return glob.sync(`./src/templates/**/*.{js,ts,jsx,tsx}`, { cwd: sitePath })
}

exports.onCreatePage = async ({ actions, page }) => {
  const { createPage, deletePage } = actions

  function deleteAndCreatePages(pageToDelete, pageToCreate) {
    deletePage(pageToDelete)
    createPage(pageToCreate)
  }

  return new Promise((resolve, reject) => {
    const oldPage = { ...page }

    if (/home/.test(page.path)) {
      page.path = "/"
      deleteAndCreatePages(oldPage, page)
    }

    resolve()
  })
}


/*exports.createPages = async (props) => {
  const { data: wpSettings } = await props.graphql(`
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const perPage = wpSettings.wp.readingSettings.postsPerPage || 10
  const blogURI = "/dev-diary"
  const templates = getTemplates()

  await createBlog(props, { perPage, blogURI })
}*/

// We do this, because the Avatar doesn't get handled as a File from the gatsby-source plugin yet. This might change in the future.
exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  await createResolvers({
    WpAvatar: {
      imageFile: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.url

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}
