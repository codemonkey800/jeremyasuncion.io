/* eslint-disable */

import React from 'react';
import Helmet from 'react-helmet';
import { MuiThemeProvider } from 'material-ui';
import {
  renderToStaticMarkup,
  renderToString,
} from 'react-dom/server';

import AppRouter from './app-router';
import HTMLPage from './html-page';
import { createStyleManager } from '../shared/theme';

export function renderPage(ctx) {
  const { styleManager, theme } = createStyleManager();

  const context = {};
  const appStyles = styleManager.sheetsToString();
  const appHtml = renderToString((
    <MuiThemeProvider styleManager={styleManager} theme={theme}>
      <AppRouter context={context} location={ctx.url} />
    </MuiThemeProvider>
  ));

  if (context.url) {
    ctx.redirect(context.url);
  } else {
    const helmet = Helmet.renderStatic();
    const html = renderToStaticMarkup((
      <HTMLPage
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

