// import { Joystick3d } from './UI/Joystick3d'
import type { Vector3jProps, Vector3dProps } from './vector3j-types'

// export function Vector3j() {
//   const { label, displayValue, onUpdate, settings } = useInputContext<Vector3jProps>()
//   return (
//     <Row input>
//       <Label>{label}</Label>
//       <Container withJoystick={!!settings.joystick}>
//         {settings.joystick && <Joystick3d value={displayValue} settings={settings} onUpdate={onUpdate} />}
//         <Vector value={displayValue} settings={settings} onUpdate={onUpdate} />
//       </Container>
//     </Row>
//   )
// }

import React from 'react'
import { Components, useInputContext } from 'leva/plugin'
import { InputContainer } from './StyledVector3j'

const { Label, Row, Vector } = Components

export function Vector3j() {
  const { label, displayValue, onUpdate, settings } = useInputContext<Vector3dProps>()

  console.log('Vector3j', displayValue, settings)

  /* FIXME: replace true with !!settings.joystick */
  /* FIXME: replace true with settings.joystick */
  return (
    <Row input>
      <Label>{label}</Label>
      {/* <InputContainer withJoystick={true}> */}
      {/* {true && <Joystick3d value={displayValue} settings={settings} onUpdate={onUpdate} />} */}
      <Vector value={displayValue} settings={settings} onUpdate={onUpdate} />
      {/* </InputContainer> */}
    </Row>
  )
}
