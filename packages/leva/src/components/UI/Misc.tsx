import React, { useContext } from 'react'
import * as P from '@radix-ui/react-portal'
import { ThemeContext } from '../../context'
export { Overlay } from './StyledUI'

// @ts-ignore
export function Portal({ children, container = globalThis?.document?.body }) {
  const { className } = useContext(ThemeContext)!
  return (
    <P.Root className={className} container={container}>
      {children}
    </P.Root>
  )
}
