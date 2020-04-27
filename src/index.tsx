import 'typeface-roboto'

import { ThemeProvider } from '@material-ui/styles'
import { AppShell } from 'germy/components'
import { Home } from 'germy/pages'
import { theme } from 'germy/theme'
import React, { FunctionComponent } from 'react'
import { render } from 'react-dom'

const App: FunctionComponent = () => (
  <ThemeProvider theme={theme}>
    <AppShell>
      <Home />
    </AppShell>
  </ThemeProvider>
)

render(<App />, document.querySelector('main'))
