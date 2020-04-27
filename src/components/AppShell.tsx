import 'germy/components/AppShell.scss'

import { CssBaseline } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { FunctionComponent, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const AppShell: FunctionComponent<Props> = ({ children }) => {
  return (
    <>
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
