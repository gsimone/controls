import React from 'react'
import { useStoreContext } from '../..'
import { ButtonInput } from '../../types'
import { Row } from '../UI'
import { StyledButton } from './StyledButton'

type ButtonProps = {
  label: string | JSX.Element
} & Omit<ButtonInput, 'type'>

export function Button({ onClick, settings, label }: ButtonProps) {
  const store = useStoreContext()
  return (
    <Row>
      <StyledButton disabled={settings.disabled} onClick={() => onClick(store.get)}>
        {label}
      </StyledButton>
    </Row>
  )
}
