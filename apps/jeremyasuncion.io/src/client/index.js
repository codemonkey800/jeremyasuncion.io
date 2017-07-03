import React from 'react';

import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import AppRouter from './app-router';

function renderApp() {
  render((
    <AppContainer>
      <AppRouter />
    </AppContainer>
  ));
}

renderApp();

if (module.hot) {
  module.hot.accept('../shared/app', () => renderApp());
}

