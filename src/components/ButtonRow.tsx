import { Button } from '@material-ui/core'
import cns from 'classnames'
import styles from 'germy/components/ButtonRow.scss'
import { BUTTON_ROW } from 'germy/constants'
import { ButtonRowKey } from 'germy/types'
import { logOpenedLink } from 'germy/utils'
import { bool } from 'prop-types'
import React, { FunctionComponent } from 'react'

const buttonKeys = Object.keys(BUTTON_ROW) as ButtonRowKey[]

interface Props {
  isTypingComplete: boolean
}

const ButtonRow: FunctionComponent<Props> = ({ isTypingComplete }) => {
  return (
    <div
      className={cns(
        styles.buttonRow,
        isTypingComplete && styles.typingComplete,
      )}
    >
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
