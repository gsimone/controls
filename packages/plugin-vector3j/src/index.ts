import { createPlugin } from 'leva/plugin'
// import { Vector3dSettings } from 'leva/plugin'
// import { getVectorPlugin } from 'leva/plugin'
import { getVectorSchema, normalizeVector, sanitizeVector, formatVector } from 'leva/plugin'

import { Vector3j } from './Vector3j'
import { sanitize, normalize, format } from './vector3j-plugin'

import type { InputWithSettings } from 'leva/src/types'
import type {
  VectorType,
  Format,
  InternalVectorSettings,
  VectorSettings,
  VectorTypeFromValueFormatAndKeys,
} from 'leva/src/components/Vector/vector-types'

// ???
// export * from './Vector3joy'

// export const vector3j = createPlugin({
//   sanitize,
//   format,
//   normalize,
//   component: Vector3j,
//   // ...getVectorPlugin(['x', 'y', 'z']),
// })

export function getVectorPlugin<K extends string>(defaultKeys: K[]) {
  return {
    schema: getVectorSchema(defaultKeys.length),
    normalize: <Value extends VectorType>({
      value,
      ...settings
    }: InputWithSettings<Value, VectorSettings<Value, K>>) => {
      // FIXME: value is undefined???
      console.log('normalize:', value, settings)
      return normalizeVector(value, settings, defaultKeys)
    },
    format: (value: any, settings: InternalVectorSettings) => {
      console.log('format:', value, settings)
      return formatVector(value, settings)
    },
    sanitize: (value: any, settings: InternalVectorSettings, prevValue: any) => {
      console.log('sanitize', value, settings)
      return sanitizeVector(value, settings, prevValue)
    },
  }
}

export const vector3j = createPlugin({
  component: Vector3j,
  ...getVectorPlugin(['x', 'y', 'z']),
})
