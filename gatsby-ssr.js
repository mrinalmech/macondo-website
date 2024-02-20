import * as React from 'react';

export const onRenderBody = ({ setHeadComponents, setHtmlAttributes }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/retro_computer.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="retroFont"
    />,
  ]);
  setHtmlAttributes({ lang: 'en' });
};
