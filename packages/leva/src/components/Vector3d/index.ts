import { Vector3dComponent } from './Vector3d'
import { getVectorPlugin } from '../Vector'
import { createInternalPlugin } from '../../plugin'
import type { InternalVector2dSettings } from '../Vector2d/vector2d-types'

export * from './Vector3d'

const plugin = getVectorPlugin(['x', 'y', 'z'])
const normalize = ({ joystick = true, ...input }: any) => {
  const { value, settings } = plugin.normalize(input)
  return { value, settings: { ...settings, joystick } as InternalVector2dSettings }
}

export default createInternalPlugin({
  component: Vector3dComponent,
  ...plugin,
  normalize,
})
