import React from 'react'
import { StyledJoyCubeFace, StyledJoyCube } from './StyledJoystick3d'

export function JoyCube({
  isTop,
  isRight,
  showFront = true,
  showMid = true,
  showRear = false,
}: {
  isTop?: boolean
  isRight?: boolean
  showFront?: boolean
  showMid?: boolean
  showRear?: boolean
}) {
  return (
    <StyledJoyCube top={isTop} right={isRight}>
      {showFront && (
        <>
          <StyledJoyCubeFace className="joycube-face--front" />
          <StyledJoyCubeFace className="joycube-face--back" />
          <StyledJoyCubeFace className="joycube-face--right" />
          <StyledJoyCubeFace className="joycube-face--left" />
          <StyledJoyCubeFace className="joycube-face--top" />
          <StyledJoyCubeFace className="joycube-face--bottom" />
        </>
      )}
      {showMid && (
        <>
          <StyledJoyCubeFace className="joycube-face--front-mid" />
          <StyledJoyCubeFace className="joycube-face--back-mid" />
          <StyledJoyCubeFace className="joycube-face--right-mid" />
          <StyledJoyCubeFace className="joycube-face--left-mid" />
          <StyledJoyCubeFace className="joycube-face--top-mid" />
          <StyledJoyCubeFace className="joycube-face--bottom-mid" />
        </>
      )}
      {showRear && (
        <>
          <StyledJoyCubeFace className="joycube-face--front-rear" />
          <StyledJoyCubeFace className="joycube-face--back-rear" />
          <StyledJoyCubeFace className="joycube-face--right-rear" />
          <StyledJoyCubeFace className="joycube-face--left-rear" />
          <StyledJoyCubeFace className="joycube-face--top-rear" />
          <StyledJoyCubeFace className="joycube-face--bottom-rear" />
        </>
      )}
    </StyledJoyCube>
  )
}
