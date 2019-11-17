import {
  Button,
  Grow,
} from '@material-ui/core'
import { BUTTON_ROW } from 'germy/constants'
import theme from 'germy/theme'
import { ButtonRowKey } from 'germy/types'
import { makeStyles } from 'germy/utils'
import { bool } from 'prop-types'
import { FunctionComponent } from 'react'

const buttonKeys = Object.keys(BUTTON_ROW) as ButtonRowKey[]

interface Props {
  isTypingComplete: boolean
}

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },

  buttonRow: {
    alignItems: 'center',
    display: 'flex',
    flex: 'initial',
    justifyContent: 'center',
  },
}))

const ButtonRow: FunctionComponent<Props> = ({ isTypingComplete }) => {
  const styles = useStyles()

  return (
    <div className={styles.buttonRow}>
      {buttonKeys.map((key, index) => (
        <Grow
          in={isTypingComplete}
          key={key}
          timeout={index * theme.transitions.duration.complex}
        >
          <Button
            classes={{ root: styles.button }}
            onClick={(): void => {
              window.location.href = BUTTON_ROW[key].LINK
            }}
          >
            {BUTTON_ROW[key].TITLE}
          </Button>
        </Grow>
      ))}
    </div>
  )
}

ButtonRow.propTypes = {
  isTypingComplete: bool.isRequired,
}

export default ButtonRow
