import { func } from 'prop-types'
import { APP_HEAD, TYPED_HEADERS } from 'germy/constants'
import { useLocalStorage } from 'germy/hooks'
import { getTransition, theme } from 'germy/theme'
import { makeStyles } from 'germy/utils'
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

const useStyles = makeStyles<Props>({
  header: {
    fontSize: '8vw',
    transition: getTransition('transform'),
    transform: props => `translateY(${
      props.isTypingComplete
        ? 0
        : theme.spacing(6)
    }px)`,
  },
})

export const TypingHeader: FunctionComponent<Props> = props => {
  const styles = useStyles(props)
  const [lastVisitedTime, setLastVisitedTime] = useLocalStorage('lastVisitedTime', 0)
  const [hasAllStrings, setHasAllStrings] = useState(false)

  useEffect(() => {
    const lastVisited = new Date(lastVisitedTime)
    const now = new Date()

    if (
      now.getFullYear() > lastVisited.getFullYear()
      || now.getMonth() > lastVisited.getMonth()
    ) {
      setLastVisitedTime(Date.now())
      setHasAllStrings(true)
    }
  }, [
    lastVisitedTime,
    setHasAllStrings,
    setLastVisitedTime,
  ])

  const strings = hasAllStrings
    ? TYPED_HEADERS.concat(APP_HEAD.AUTHOR)
    : [APP_HEAD.AUTHOR]

  return (
    <Typed
      backSpeed={30}
      className={styles.header}
      onComplete={() => props.setIsTypingComplete(true)}
      strings={strings}
      typeSpeed={30}
    />
  )
}

TypingHeader.propTypes = {
  setIsTypingComplete: func.isRequired,
}
