import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui';

import App from '../shared/app';
import { createStyleManager } from '../shared/theme';

function renderApp() {
  const { styleManager, theme } = createStyleManager();
  render((
    <AppContainer>
      <BrowserRouter>
        <MuiThemeProvider styleManager={styleManager} theme={theme}>
          <App />
        </MuiThemeProvider>
      </BrowserRouter>
    </AppContainer>
  ));
}

renderApp();

if (module.hot) {
  module.hot.accept('../shared/app', () => renderApp());
}

