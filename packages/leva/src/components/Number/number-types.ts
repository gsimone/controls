import type { InputWithSettings, LevaInputProps, NumberSettings } from '../../types'

export type InternalNumberSettings = {
  min: number
  max: number
  step: number
  pad: number
  initialValue: number
  suffix?: string
  disableInnerLabel?: boolean
  disableRangeSlider?: boolean
}
export type NumberInput = InputWithSettings<number | string, NumberSettings>

export type NumberProps = LevaInputProps<number, InternalNumberSettings>

export type RangeSliderProps = { value: number; onDrag: (v: number) => void } & InternalNumberSettings
