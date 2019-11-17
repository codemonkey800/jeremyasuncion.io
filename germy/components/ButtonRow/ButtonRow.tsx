import {
  Button,
  Grow,
} from '@material-ui/core'
import * as styles from 'germy/components/ButtonRow/ButtonRow.mod.css'
import { BUTTON_ROW } from 'germy/constants'
import theme from 'germy/theme'
import { ButtonRowKey } from 'germy/types'
import { bool } from 'prop-types'
import { FunctionComponent } from 'react'

const buttonKeys = Object.keys(BUTTON_ROW) as ButtonRowKey[]

interface Props {
  isTypingComplete: boolean
}

const ButtonRow: FunctionComponent<Props> = ({ isTypingComplete }) => (
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

ButtonRow.propTypes = {
  isTypingComplete: bool.isRequired,
}

export default ButtonRow
