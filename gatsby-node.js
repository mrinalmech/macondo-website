exports.onCreatePage = async ({ actions, page }) => {
  const { createPage, deletePage } = actions

  function deleteAndCreatePages(pageToDelete, pageToCreate) {
    deletePage(pageToDelete)
    createPage(pageToCreate)
  }

  return new Promise((resolve, reject) => {
    const oldPage = { ...page }

    if (/home/.test(page.path)) {
      page.path = '/'
      deleteAndCreatePages(oldPage, page)
    }

    resolve()
  })
}
