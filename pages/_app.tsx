/* eslint-disable no-unused-expressions, react/jsx-props-no-spreading */

import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { AppShell } from 'germy/components'
import { APP_HEAD, JSS_SERVER_STYLES_ID } from 'germy/constants'
import theme from 'germy/theme'
import App from 'next/app'
import Head from 'next/head'
import { ReactElement } from 'react'


export default class GermyApp extends App {
  componentDidMount(): void {
    const styles = document.querySelector(JSS_SERVER_STYLES_ID)
    styles?.parentElement?.removeChild(styles)
  }

  render(): ReactElement {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>{APP_HEAD.TITLE}</title>
        </Head>

        <AppShell>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </AppShell>
      </>
    )
  }
}
