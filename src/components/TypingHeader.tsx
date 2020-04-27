import cns from 'classnames'
import { bool, func } from 'prop-types'
import styles from 'germy/components/TypingHeader.scss'
import { APP_HEAD, TYPED_HEADERS } from 'germy/constants'
import { useLocalStorage } from 'germy/hooks'
import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import Typed from 'react-typed'

interface Props {
  isTypingComplete: boolean
  setIsTypingComplete: Dispatch<SetStateAction<boolean>>
}

export const TypingHeader: FunctionComponent<Props> = ({
  isTypingComplete,
  setIsTypingComplete,
}) => {
  const [lastVisitedTime, setLastVisitedTime] = useLocalStorage(
    'lastVisitedTime',
    0,
  )
  const [hasAllStrings, setHasAllStrings] = useState(false)

  useEffect(() => {
    const lastVisited = new Date(lastVisitedTime)
    const now = new Date()

    if (
      now.getFullYear() > lastVisited.getFullYear() ||
      now.getMonth() > lastVisited.getMonth()
    ) {
      setLastVisitedTime(Date.now())
      setHasAllStrings(true)
    }
  }, [lastVisitedTime, setHasAllStrings, setLastVisitedTime])

  const strings = hasAllStrings
    ? TYPED_HEADERS.concat(APP_HEAD.AUTHOR)
    : [APP_HEAD.AUTHOR]

  return (
    <Typed
      backSpeed={30}
      className={cns(styles.header, isTypingComplete && styles.typingComplete)}
      onComplete={() => setIsTypingComplete(true)}
      strings={strings}
      typeSpeed={30}
    />
  )
}

TypingHeader.propTypes = {
  isTypingComplete: bool.isRequired,
  setIsTypingComplete: func.isRequired,
}
