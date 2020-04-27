import { Button } from '@material-ui/core'
import { BUTTON_ROW } from 'germy/constants'
import { getTransition, theme } from 'germy/theme'
import { ButtonRowKey } from 'germy/types'
import { logOpenedLink, makeStyles } from 'germy/utils'
import { bool } from 'prop-types'
import React, { FunctionComponent } from 'react'

const buttonKeys = Object.keys(BUTTON_ROW) as ButtonRowKey[]

interface Props {
  isTypingComplete: boolean
}

const useStyles = makeStyles<Props>({
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    transition: getTransition(),

    opacity: props => (props.isTypingComplete ? 1 : 0),
    transform: props =>
      `translateY(${props.isTypingComplete ? 0 : theme.spacing(2)}px)`,
  },

  buttonRow: {
    alignItems: 'center',
    display: 'flex',
    flex: 'initial',
    justifyContent: 'center',
  },
})

const ButtonRow: FunctionComponent<Props> = ({ isTypingComplete }) => {
  const styles = useStyles({ isTypingComplete })

  return (
    <div className={styles.buttonRow}>
      {buttonKeys.map(key => (
        <Button
          classes={{ root: styles.button }}
          key={key}
          onClick={() => {
            const href = BUTTON_ROW[key].LINK
            logOpenedLink(href)
            window.location.href = href
          }}
        >
          {BUTTON_ROW[key].TITLE}
        </Button>
      ))}
    </div>
  )
}

ButtonRow.propTypes = {
  isTypingComplete: bool.isRequired,
}

export { ButtonRow }
