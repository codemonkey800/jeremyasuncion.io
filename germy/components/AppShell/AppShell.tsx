import PropTypes from 'prop-types'
import { FunctionComponent, ReactNode } from 'react'

import styles from 'germy/components/AppShell/AppShell.mod.css'

interface Props {
  children: ReactNode
}

const AppShell: FunctionComponent<Props> = ({ children }) => (
  <main className={styles.appShell}>
    {children}
  </main>
)

AppShell.propTypes = {
  children: PropTypes.node,
}

AppShell.defaultProps = {
  children: null,
}

export default AppShell
