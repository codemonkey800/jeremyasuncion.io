import { func } from 'prop-types'
import { TYPED_HEADERS } from 'germy/constants'
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
} from 'react'
import Typed from 'react-typed'

interface Props {
  setIsTypingComplete: Dispatch<SetStateAction<boolean>>
}

const TypingHeader: FunctionComponent<Props> = ({ setIsTypingComplete }) => (
  <Typed
    onComplete={(): void => setIsTypingComplete(true)}
    backSpeed={30}
    strings={TYPED_HEADERS.concat('Jeremy Asuncion')}
    typeSpeed={30}
  />
)

TypingHeader.propTypes = {
  setIsTypingComplete: func.isRequired,
}

export default TypingHeader
