import {
  ButtonRow,
  TypingHeader,
} from 'germy/components'
import { FunctionComponent, useState } from 'react'

const Home: FunctionComponent = () => {
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  return (
    <>
      <TypingHeader setIsTypingComplete={setIsTypingComplete} />
      <ButtonRow isTypingComplete={isTypingComplete} />
    </>
  )
}

export default Home
