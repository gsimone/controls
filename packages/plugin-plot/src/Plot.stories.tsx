import React from 'react'
import { Story, Meta } from '@storybook/react'

import Reset from '../../leva/stories/components/decorator-reset'
import { useControls } from '../../leva/src'

import { plot } from './index'

export default {
  title: 'Plugins/Plot',
  decorators: [Reset],
} as Meta

const Template: Story<any> = (args) => {
  const { y } = useControls({ y: plot(args) })
  return (
    <div>
      {[0, 0.5, -1].map((x) => (
        <pre key={x}>
          y({x}) = {y(x).toFixed(2)}
        </pre>
      ))}
    </div>
  )
}

export const DefaultBounds = Template.bind({})
DefaultBounds.args = { expression: 'x' }

export const HideGraph = Template.bind({})
HideGraph.args = { expression: 'x', graph: false }

export const BoundsX = Template.bind({})
BoundsX.args = { expression: 'cos(x)', boundsX: [-10, 10] }

export const BoundsY = Template.bind({})
BoundsY.args = { expression: 'sin(x) * tan(x)', boundsX: [-10, 10], boundsY: [-1, 1] }

export const ImportedFunc = Template.bind({})
ImportedFunc.args = {
  expression: 'mix(0, 1, x)',
  imported: {
    mix: (a: number, b: number, x: number) => {
      return a + (b - a) * x
    },
  },
}

export const InputAsVariable = () => {
  const { y } = useControls({ var: 10, y: plot({ expression: 'cos(x * var)' }) })
  return (
    <div>
      {[0, 0.5, -1].map((x) => (
        <pre key={x}>
          y({x}) = {y(x).toFixed(2)}
        </pre>
      ))}
    </div>
  )
}

export const CurveAsVariable = () => {
  const { y2 } = useControls({
    var: 10,
    y1: plot({ expression: 'cos(x * var)' }),
    y2: plot({ expression: 'x * y1' }),
  })
  return (
    <div>
      {[0, 0.5, -1].map((x) => (
        <pre key={x}>
          y2({x}) = {y2(x).toFixed(2)}
        </pre>
      ))}
    </div>
  )
}
