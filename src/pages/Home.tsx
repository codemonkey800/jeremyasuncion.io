import {
  ButtonRow,
  TypingHeader,
} from 'germy/components'
import {
  initAnalytics,
  logPageView,
} from 'germy/utils'
import React, {
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from 'react'

export const Home: FunctionComponent = () => {
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const isGaInitializedRef = useRef(false)

  useEffect(() => {
    if (!isGaInitializedRef.current) {
      isGaInitializedRef.current = true
      initAnalytics()
    }
    logPageView()
  }, [])

  return (
    <>
      <TypingHeader
        isTypingComplete={isTypingComplete}
        setIsTypingComplete={setIsTypingComplete}
      />
      <ButtonRow isTypingComplete={isTypingComplete} />
    </>
  )
}
