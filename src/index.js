/* eslint-disable global-require */

import 'babel-polyfill';
import 'index.css';

import * as OfflinePlugin from 'offline-plugin/runtime';
import injectTapEvents from 'react-tap-event-plugin';
import { AppContainer } from 'react-hot-loader';
import { MuiThemeProvider } from 'material-ui';
import { render } from 'react-dom';

import App from 'components/App';
import theme from 'utils/Theme';

injectTapEvents();

if (process.env.NODE_ENV === 'production') {
  OfflinePlugin.install();
}

function renderApp() {
  render(
    <AppContainer>
      <MuiThemeProvider muiTheme={theme}>
        <App />
      </MuiThemeProvider>
    </AppContainer>,
    document.querySelector('#root'),
  );
}

renderApp();

if (module.hot) module.hot.accept('./components/App', () => renderApp());
