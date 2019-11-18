import { createMuiTheme } from '@material-ui/core'
import { grey, purple } from '@material-ui/core/colors'

export const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: purple,
    type: 'dark',
  },
})

export const defaultTransition = theme.transitions.create(
  'all',
  {
    duration: theme.transitions.duration.complex,
    easing: theme.transitions.easing.easeInOut,
  },
)
