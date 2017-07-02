/* eslint-disable */

import React from 'react';
import { MuiThemeProvider } from 'material-ui';
import { renderToString } from 'react-dom/server';

import AppRouter from './app-router';
import { createStyleManager } from '../shared/theme';

export function renderPage(ctx) {
  const { styleManager, theme } = createStyleManager();

  const html = renderToString((
    <MuiThemeProvider styleManager={styleManager} theme={theme}>
      <AppRouter location={ctx.url} />
    </MuiThemeProvider>
  ));

  const css = styleManager.sheetsToString();

  ctx.body = css;
}

