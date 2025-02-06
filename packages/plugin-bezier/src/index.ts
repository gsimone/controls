import { createPlugin, formatVector } from 'leva/plugin'
import { Bezier } from './Bezier'
import { normalize, sanitize } from './bezier-plugin'
import { InternalBezierSettings } from './bezier-types'
import { bezier as evaluateBezier } from './bezier-utils'

export const bezier = createPlugin({
  normalize,
  sanitize,
  format: (value: any, settings: InternalBezierSettings) => formatVector(value, settings),
  component: Bezier,
})

export { evaluateBezier }
