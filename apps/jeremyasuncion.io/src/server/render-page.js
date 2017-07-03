import React from 'react';
import Helmet from 'react-helmet';
import { MuiThemeProvider } from 'material-ui';
import {
  renderToStaticMarkup,
  renderToString,
} from 'react-dom/server';
import { StaticRouter } from 'react-router';

import HTMLPage from './components/html-page';

import App from '../shared/app';
import { createStyleManager } from '../shared/theme';

/**
  * Koa middleware that handles data fetching, client hydration, and server side
  * rendering.
  *
  * @param ctx A Koa context object.
  */
export default function renderPage(ctx) {
  const { styleManager, theme } = createStyleManager();

  const context = {};
  const appCss = styleManager.sheetsToString();
  const appHtml = renderToString((
    <StaticRouter context={context} location={ctx.url}>
      <MuiThemeProvider styleManager={styleManager} theme={theme}>
        <App />
      </MuiThemeProvider>
    </StaticRouter>
  ));

  if (context.url) {
    ctx.redirect(context.url);
  } else {
    const helmet = Helmet.renderStatic();
    const html = renderToStaticMarkup((
      <HTMLPage
        appCss={appCss}
        appHtml={appHtml}
        helmet={helmet}
      />
    ));

    ctx.body = `
      <!doctype html>
      ${html}
    `;
  }
}

