import { languages } from './languages';

let languagesPrefixes = languages.map(lng => `/${lng}/`);
languagesPrefixes.push('/');

export async function onCreatePage({ actions, page }) {
  const { createPage, deletePage } = actions;

  function deleteAndCreatePages(pageToDelete, pageToCreate) {
    deletePage(pageToDelete);
    createPage(pageToCreate);
  }

  return new Promise<void>(resolve => {
    const oldPage = { ...page };

    for (const lngPrefix of languagesPrefixes) {
      if (`${lngPrefix}home/` === page.path) {
        page.path = lngPrefix;
        deleteAndCreatePages(oldPage, page);
      }
    }

    resolve();
  });
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
  type SitePage implements Node {
    context: SitePageContext
  }
  type SitePageContext {
    i18n: i18nContext
  }
  type i18nContext {
      language: String,
      languages: [String],
      defaultLanguage: String,
      originalPath: String
      routed: Boolean
  }
`);
};
