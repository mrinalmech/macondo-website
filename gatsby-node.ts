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
