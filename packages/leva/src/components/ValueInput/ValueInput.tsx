import React, { useCallback, useRef } from 'react'
import { useInputContext } from '../../context'
import { parseNumber } from '../../utils'
import { StyledInput, InputContainer, InnerLabel } from './StyledInput'

type ValueInputProps = {
  id?: string
  value: string
  innerLabel?: false | React.ReactNode
  type?: 'number' | undefined
  onUpdate: (value: any) => void
  onChange: (value: string) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
}

export function ValueInput({ innerLabel, value, onUpdate, onChange, onKeyDown, type, id, ...props }: ValueInputProps) {
  const { id: _id } = useInputContext()
  const inputId = id || _id
  const previousOnUpdate = useRef(onUpdate)

  const update = useCallback(
    (fn: (value: string) => void) => (event: any) => {
      const _value = event.currentTarget.value
      fn(_value)
    },
    []
  )

  const onBlur = useCallback(
    (event: any) => {
      update(previousOnUpdate.current)(event)
      previousOnUpdate.current = onUpdate
    },
    [update, onUpdate]
  )

  const onKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        update(onUpdate)(event)
        // event.currentTarget.blur()
      }
    },
    [update, onUpdate]
  )

  return (
    <InputContainer>
      {innerLabel && typeof innerLabel === 'string' ? <InnerLabel>{innerLabel}</InnerLabel> : innerLabel}
      <StyledInput
        levaType={type}
        id={inputId}
        type="text"
        autoComplete="off"
        spellCheck="false"
        value={value}
        onChange={update(onChange)}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        {...props}
      />
    </InputContainer>
  )
}

export function NumberInput({ onUpdate, ...props }: ValueInputProps) {
  const _onUpdate = useCallback((v: any) => onUpdate(parseNumber(v)), [onUpdate])
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const dir = event.key === 'ArrowUp' ? 1 : event.key === 'ArrowDown' ? -1 : 0
      if (dir) {
        event.preventDefault()
        const step = event.altKey ? 0.1 : event.shiftKey ? 10 : 1
        onUpdate((v: any) => parseFloat(v) + dir * step)
      }
    },
    [onUpdate]
  )
  return <ValueInput {...props} onUpdate={_onUpdate} onKeyDown={onKeyDown} type="number" />
}
