/* eslint-disable global-require */

import 'babel-polyfill';
import 'index.css';

import { AppContainer } from 'react-hot-loader';
import { MuiThemeProvider } from 'material-ui';
import { render } from 'react-dom';

import App from 'components/App';
import theme from 'utils/Theme';

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
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
