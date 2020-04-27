import { createMuiTheme } from '@material-ui/core'
import { grey, purple } from '@material-ui/core/colors'

export const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: purple,
    type: 'dark',
  },
})

export const getTransition = (key = 'all'): string => theme.transitions.create(
  key,
  {
    duration: theme.transitions.duration.complex,
    easing: theme.transitions.easing.easeInOut,
  },
)
