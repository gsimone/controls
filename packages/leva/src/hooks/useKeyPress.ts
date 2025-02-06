import { useEffect, useState } from 'react'

/**
 * @use const aKeyPress = useKeyPress('a')
 */
export function useKeyPress(targetKey: string) {
  const [keyPressed, setKeyPressed] = useState(false)

  // NOTE: consider event.getModifierState("CapsLock") etc.
  function downHandler(e: KeyboardEvent) {
    if (e.key === targetKey) {
      setKeyPressed(true)
    }
  }

  function upHandler(e: KeyboardEvent) {
    if (e.key === targetKey) {
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [])

  return keyPressed
}
