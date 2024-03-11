const isIframeLoaded = $iframe => {
  const contentWindow = $iframe.contentWindow;

  const src = $iframe.attributes.src;
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

      $iframes.each((_, $iframe) => {
        loaded.push(
          new Promise(subResolve => {
            if (isIframeLoaded($iframe)) {
              subResolve($iframe.contentDocument.body);
            } else {
              Cypress.$($iframe).on('load.appearHere', () => {
                if (isIframeLoaded($iframe)) {
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
