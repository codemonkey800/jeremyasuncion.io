import {
  Button,
} from '@material-ui/core'
import { BUTTON_ROW } from 'germy/constants'
import {
  defaultTransition,
  theme,
} from 'germy/theme'
import { ButtonRowKey } from 'germy/types'
import { makeStyles } from 'germy/utils'
import { bool } from 'prop-types'
import { FunctionComponent } from 'react'

const buttonKeys = Object.keys(BUTTON_ROW) as ButtonRowKey[]

interface Props {
  isTypingComplete: boolean
}

const useStyles = makeStyles<Props>({
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    transition: defaultTransition,

    opacity: props => (props.isTypingComplete ? 1 : 0),
    transform: props => `translateY(${
      props.isTypingComplete
        ? 0
        : theme.spacing(2)
    }px)`,
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
            window.location.href = BUTTON_ROW[key].LINK
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
