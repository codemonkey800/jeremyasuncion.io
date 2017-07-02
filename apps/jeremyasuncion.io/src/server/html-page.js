/* eslint-disable react/no-danger */

import React from 'react';

export default function HTMLPage({ appHtml, helmet }) {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  return (
    <html lang="en" {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
      </head>
      <body {...bodyAttrs}>
        <div
          id="app"
          dangerouslySetInnerHTML={{ __html: appHtml }}
        />
      </body>
    </html>
  );
}

