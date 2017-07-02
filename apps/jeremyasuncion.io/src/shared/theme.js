import createPalette from 'material-ui/styles/palette';
import createMuiTheme from 'material-ui/styles/theme';
import { MuiThemeProvider } from 'material-ui';
import { orange, purple } from 'material-ui/styles/colors';

const validThemeTypes = ['light', 'dark'];

export function getTheme(type = 'dark') {
  if (!validThemeTypes.includes(type)) {
    throw new Error(`Invalid type: ${type}`);
  }

  const palette = createPalette({
    type,
    primaryColor: purple,
    accent: orange,
  });

  return createMuiTheme({ palette });
}

export function createStyleManager(theme = getTheme()) {
  return MuiThemeProvider.createDefaultContext({ theme });
}

