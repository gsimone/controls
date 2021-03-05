import { InputWithSettings, NumberSettings } from 'leva/plugins'
import { normalizeVector, sanitizeVector, InternalVectorSettings } from 'leva/utilities'

export type Spring = { tension?: number; friction?: number; mass?: number }
export type InternalSpring = { tension: number; friction: number; mass: number }
export type SpringSettings = { [key in keyof Spring]?: NumberSettings }

type SpringInput = Spring | InputWithSettings<Spring, SpringSettings>

export type InternalSpringSettings = InternalVectorSettings<keyof InternalSpring, (keyof InternalSpring)[], 'object'>

const defaultTensionSettings = { min: 1, step: 1 }
const defaultFrictionSettings = { min: 1, step: 0.5 }
const defaultMassSettings = { min: 0.1, step: 0.1 }
const defaultValue = { tension: 100, friction: 30, mass: 1 }

export const normalize = (input: SpringInput) => {
  const { value: _value, ..._settings } = 'value' in input ? input : { value: input }
  const mergedSettings = {
    tension: { ...defaultTensionSettings, ..._settings.tension },
    friction: { ...defaultFrictionSettings, ..._settings.friction },
    mass: { ...defaultMassSettings, ..._settings.mass },
  }

  return normalizeVector({ ...defaultValue, ..._value }, mergedSettings)
}

export const sanitize = (value: InternalSpring, settings: InternalSpringSettings, prevValue?: any) =>
  sanitizeVector(value, settings, prevValue)
