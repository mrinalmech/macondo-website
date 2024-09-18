const isIframeLoaded = ($iframe: HTMLIFrameElement) => {
  const contentWindow = $iframe.contentWindow;

  if (!contentWindow) {
    return null;
  }

  const src = $iframe.src;
  const href = contentWindow.location.href;
  if (contentWindow.document.readyState === 'complete') {
    return href !== 'about:blank' || src === 'about:blank' || src === '';
  }

  return false;
};

Cypress.Commands.add(
  'iframe',
  { prevSubject: 'element' },
  $iframes =>
    new Cypress.Promise(resolve => {
      const loaded: Promise<unknown>[] = [];

      ($iframes as Cypress.JQueryWithSelector<HTMLIFrameElement>).each((_, $iframe) => {
        loaded.push(
          new Promise(subResolve => {
            if (isIframeLoaded($iframe) && $iframe.contentDocument) {
              subResolve($iframe.contentDocument.body);
            } else {
              Cypress.$($iframe).on('load.appearHere', () => {
                if (isIframeLoaded($iframe) && $iframe.contentDocument) {
                  subResolve($iframe.contentDocument.body);
                  Cypress.$($iframe).off('load.appearHere');
                }
              });
            }
          }),
        );
      });

      return Promise.all(loaded).then(resolve);
    }),
);

export {};
declare global {
  namespace Cypress {
    interface Chainable {
      iframe(): Chainable<Cypress.JQueryWithSelector>;
    }
  }
}
