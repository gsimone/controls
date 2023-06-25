import React, { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react'
import { useDrag } from 'leva/plugin'
import { clamp } from 'leva/plugin'

// FIXME: Module '"leva/plugin"' has no exported member 'multiplyStep'.ts(2305)
// import { multiplyStep } from 'leva/plugin'
import { multiplyStep } from 'leva/src/utils'

import { JoystickTrigger, JoystickPlayground } from 'leva/src/components/Vector2d/StyledJoystick'

import { JoyCube } from './JoyCube'

import { useTh } from 'leva/plugin'
import { useKeyPress } from '../hooks/useKeyPress'

// FIXME: Module '"leva/plugin"' has no exported member 'Portal'.ts(2305)
// import { Portal } from 'leva/plugin'
import { Portal } from 'leva/src/components/UI'

import { useTransform } from 'leva/plugin'
// import type { Vector2d, Vector3d } from 'leva/plugin'
import type { Vector3d } from 'leva/plugin'

// import type { Vector2dProps } from 'leva/src/components/Vector2d/vector2d-types'
import type { Vector3jProps } from '../vector3j-types'

// FIXME: Most likely not ok to import Internal anything
import type { InternalVector2dSettings } from 'leva/src/components/Vector2d/vector2d-types'

// type JoystickProps = { value: Vector3d } & Pick<Vector2dProps, 'onUpdate' | 'settings'>
// type Joystick3dProps = { value: Vector3d } & Pick<Vector3dProps, 'onUpdate' | 'settings'>
type JoystickProps = { value: Vector3d } & Pick<Vector3jProps, 'onUpdate' | 'settings'>

const joystick3dKeyBindings = [
  { key: 'Control', keyLabel: 'ctrl', plane: 'xz', label: 'XZ' },
  { key: '', keyLabel: '', plane: 'xy', label: 'XY' },
  { key: 'Meta', keyLabel: 'meta', plane: 'zy', label: 'ZY' },
]

export function Joystick3d({ value, settings, onUpdate }: JoystickProps) {
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

  const timeout = useRef<number | undefined>()
  const outOfBoundsX = useRef(0)
  const outOfBoundsY = useRef(0)
  const stepMultiplier = useRef(1)

  const [joystickShown, setShowJoystick] = useState(false)
  const [isOutOfBounds, setIsOutOfBounds] = useState(false)

  const [spanRef, set] = useTransform<HTMLSpanElement>()

  const joystickeRef = useRef<HTMLDivElement>(null)
  const playgroundRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (joystickShown) {
      const { top, left, width, height } = joystickeRef.current!.getBoundingClientRect()
      playgroundRef.current!.style.left = left + width / 2 + 'px'
      playgroundRef.current!.style.top = top + height / 2 + 'px'
    }
  }, [joystickShown])

  const {
    keys: [v1, v2],
    joystick,
  } = settings2d
  const yFactor = joystick === 'invertY' ? 1 : -1
  // prettier-ignore
  const {[v1]: { step: stepV1 }, [v2]: { step: stepV2 }} = settings

  const wpx = useTh('sizes', 'joystickWidth')
  const hpx = useTh('sizes', 'joystickHeight')

  const w = (parseFloat(wpx) * 0.8) / 2
  const h = (parseFloat(hpx) * 0.8) / 2

  const startOutOfBounds = useCallback(() => {
    if (timeout.current) return
    setIsOutOfBounds(true)
    if (outOfBoundsX.current) set({ x: outOfBoundsX.current * w })
    if (outOfBoundsY.current) set({ y: outOfBoundsY.current * -h })
    timeout.current = window.setInterval(() => {
      onUpdate((v: Vector3d) => {
        const incX = stepV1 * outOfBoundsX.current * stepMultiplier.current
        const incY = yFactor * stepV2 * outOfBoundsY.current * stepMultiplier.current
        return Array.isArray(v)
          ? {
              [v1]: v[['x', 'y', 'z'].indexOf(v1)] + incX,
              [v2]: v[['x', 'y', 'z'].indexOf(v2)] + incY,
            }
          : {
              [v1]: v[v1] + incX,
              [v2]: v[v2] + incY,
            }
      })
    }, 16)
  }, [w, h, onUpdate, set, stepV1, stepV2, v1, v2, yFactor])

  const endOutOfBounds = useCallback(() => {
    window.clearTimeout(timeout.current)
    timeout.current = undefined
    setIsOutOfBounds(false)
  }, [])

  useEffect(() => {
    function setStepMultiplier(event: KeyboardEvent) {
      stepMultiplier.current = multiplyStep(event)
    }
    window.addEventListener('keydown', setStepMultiplier)
    window.addEventListener('keyup', setStepMultiplier)
    return () => {
      window.clearTimeout(timeout.current)
      window.removeEventListener('keydown', setStepMultiplier)
      window.removeEventListener('keyup', setStepMultiplier)
    }
  }, [])

  const bind = useDrag(({ first, active, delta: [dx, dy], movement: [mx, my] }) => {
    if (first) setShowJoystick(true)

    const _x = clamp(mx, -w, w)
    const _y = clamp(my, -h, h)

    outOfBoundsX.current = Math.abs(mx) > Math.abs(_x) ? Math.sign(mx - _x) : 0
    outOfBoundsY.current = Math.abs(my) > Math.abs(_y) ? Math.sign(_y - my) : 0

    // @ts-expect-error
    let newX = value[v1]
    // @ts-expect-error
    let newY = value[v2]

    if (active) {
      if (!outOfBoundsX.current) {
        newX += dx * stepV1 * stepMultiplier.current
        set({ x: _x })
      }
      if (!outOfBoundsY.current) {
        newY -= yFactor * dy * stepV2 * stepMultiplier.current
        set({ y: _y })
      }
      if (outOfBoundsX.current || outOfBoundsY.current) startOutOfBounds()
      else endOutOfBounds()

      onUpdate({ [v1]: newX, [v2]: newY })
    } else {
      setShowJoystick(false)
      outOfBoundsX.current = 0
      outOfBoundsY.current = 0
      set({ x: 0, y: 0 })
      endOutOfBounds()
    }
  })

  return (
    <JoystickTrigger ref={joystickeRef} {...bind()}>
      {joystickShown && (
        <Portal>
          <JoystickPlayground ref={playgroundRef} isOutOfBounds={isOutOfBounds}>
            <JoyCube isTop={keyPress0} isRight={keyPress2} />
            {/*<JoystickButtons>
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
            </JoystickButtons> */}
            <span ref={spanRef} />
          </JoystickPlayground>
        </Portal>
      )}
    </JoystickTrigger>
  )
}
