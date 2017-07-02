import 'normalize.css';
import 'babel-polyfill';

import React from 'react';

import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from '../shared/app';

function renderApp() {
  render((
    <AppContainer>
      <App />
    </AppContainer>
  ));
}

renderApp();

if (module.hot) {
  module.hot.accept('../shared/app', () => renderApp());
}

