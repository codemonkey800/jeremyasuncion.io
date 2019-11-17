import { makeStyles } from 'germy/utils'
import PropTypes from 'prop-types'
import { FunctionComponent, ReactNode } from 'react'

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
  },

  appShell: {
    alignItems: 'center',
    display: 'flex',
    flex: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

const AppShell: FunctionComponent<Props> = ({ children }) => {
  const styles = useStyles()

  return (
    <main className={styles.appShell}>
      {children}
    </main>
  )
}

AppShell.propTypes = {
  children: PropTypes.node,
}

AppShell.defaultProps = {
  children: null,
}

export default AppShell
