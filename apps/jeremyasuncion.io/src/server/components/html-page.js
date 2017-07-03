/* eslint-disable react/no-danger */

import React from 'react';

/**
  * React component representing the base HTML page. The base page should be
  * rendered using <code>ReactDOMServer.renderToStaticMarkup()</code>, whereas
  * the <code>appHtml</code> should be rendered with
  * <code>ReactDOMServer.renderToString()</code>.
  *
  * @param props React props object.
  * @param props.appCss JSS extracted styles.
  * @param props.appHtml Application rendered as HTML string.
  * @param props.helmet Helmet object rendered using <code>Helmet.renderStatic()</code>.
  */
export default function HTMLPage({
  appCss,
  appHtml,
  helmet,
}) {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  return (
    <html lang="en" {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        <style id="jss-server-side">{appCss}</style>
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

