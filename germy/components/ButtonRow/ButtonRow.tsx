import { Button } from '@material-ui/core'
import * as styles from 'germy/components/ButtonRow/ButtonRow.mod.css'
import { BUTTON_ROW } from 'germy/constants'
import { ButtonRowKey } from 'germy/types'
import { FunctionComponent } from 'react'

const buttonKeys = Object.keys(BUTTON_ROW) as ButtonRowKey[]

const ButtonRow: FunctionComponent = () => (
  <div className={styles.buttonRow}>
    {buttonKeys.map(key => (
      <Button
        classes={{ root: styles.button }}
        key={key}
        onClick={(): void => {
          window.location.href = BUTTON_ROW[key].LINK
        }}
      >
        {BUTTON_ROW[key].TITLE}
      </Button>
    ))}
  </div>
)

export default ButtonRow
