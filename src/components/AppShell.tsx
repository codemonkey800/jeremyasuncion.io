import { CssBaseline } from '@material-ui/core'
import { APP_HEAD } from 'germy/constants'
import { theme } from 'germy/theme'
import { getViewportString, makeStyles } from 'germy/utils'
import PropTypes from 'prop-types'
import React, { FunctionComponent, ReactNode } from 'react'
import { Helmet } from 'react-helmet'

interface Props {
  children: ReactNode
}

const useStyles = makeStyles({
  '@global': {
    'html, body': {
      border: 0,
      boxSizing: 'content-box',
      display: 'flex',
      flex: 'auto',
      height: '100vh',
      margin: 0,
      padding: 0,
      width: '100vw',
    },

    '#__next': {
      display: 'flex',
      flex: 'auto',
    },

    main: {
      alignItems: 'center',
      display: 'flex',
      flex: 'auto',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
})

const viewportString = getViewportString(APP_HEAD.VIEWPORT)

export const AppShell: FunctionComponent<Props> = ({ children }) => {
  useStyles()

  return (
    <>
      <Helmet>
        <title>{APP_HEAD.TITLE}</title>

        <meta charSet="utf-8" />
        <meta name="viewport" content={viewportString} />
        <meta name="description" content={APP_HEAD.DESCRIPTION} />
        <meta name="theme-color" content={theme.palette.primary.main} />

        <link rel="stylesheet" href={APP_HEAD.ROBOTO} />
      </Helmet>

      <CssBaseline />

      {children}
    </>
  )
}

AppShell.propTypes = {
  children: PropTypes.node,
}

AppShell.defaultProps = {
  children: null,
}
