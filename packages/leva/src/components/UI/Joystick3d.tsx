import React from 'react'
import { Joystick } from './Joystick'
import { useKeyPress } from '../../hooks/useKeyPress'
import { JoystickButtons, KeyLabel } from './StyledJoystick3d'
import { Button } from '../Button'
import type { InternalVector2dSettings } from '../Vector2d/vector2d-types'
import type { Vector3d } from '../../types'
import type { Vector3dProps } from '../Vector3d/vector3d-types'
import { JoyCube } from './JoyCube'

type Joystick3dProps = { value: Vector3d } & Pick<Vector3dProps, 'onUpdate' | 'settings'>

const joystick3dKeyBindings = [
  { key: 'Control', keyLabel: 'ctrl', plane: 'xz', label: 'XZ' },
  { key: '', keyLabel: '', plane: 'xy', label: 'XY' },
  { key: 'Meta', keyLabel: 'meta', plane: 'zy', label: 'ZY' },
]

export function Joystick3d({ value, settings, onUpdate }: Joystick3dProps) {
  const [plane, setPlane] = React.useState('xy')
  const keyPress0 = useKeyPress(joystick3dKeyBindings[0].key)
  // const keyPress1 = useKeyPress(joystick3dKeyBindings[1].key)
  const keyPress2 = useKeyPress(joystick3dKeyBindings[2].key)

  React.useEffect(() => {
    if (keyPress0) setPlane(joystick3dKeyBindings[0].plane)
    else if (keyPress2) setPlane(joystick3dKeyBindings[2].plane)
    else setPlane(joystick3dKeyBindings[1].plane)
  }, [keyPress0, keyPress2])

  const settings2d = React.useMemo(() => {
    const { keys, ...rest } = settings
    return { keys: plane, ...rest } as unknown as InternalVector2dSettings
  }, [settings, plane])

  return (
    <>
      <Joystick value={value} settings={settings2d} onUpdate={onUpdate}>
        <JoyCube isTop={keyPress0} isRight={keyPress2} />
        <JoystickButtons>
          {joystick3dKeyBindings.map((kb) => (
            <Button
              key={kb.label}
              label={
                <>
                  <span>{kb.label}</span>
                  <KeyLabel>{kb.keyLabel || kb.key}</KeyLabel>
                </>
              }
              onClick={() => ''}
              settings={{ disabled: plane !== kb.plane }}
            />
          ))}
        </JoystickButtons>
      </Joystick>
    </>
  )
}
