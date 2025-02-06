import React from 'react'
import { useControls, folder, button, monitor, Leva } from 'leva'
import { useFullscreen } from 'react-use'
// @ts-ignore
import { Noise } from 'noisejs'
import { DimensionsIcon } from '@radix-ui/react-icons'
import styles from './styles.module.css'

const noise = new Noise(Math.random())

function frame() {
  const t = Date.now()
  return noise.simplex2(t / 1000, t / 100)
}

const ExtraControls = () => {
  const data = useControls(
    'folder.subfolder',
    {
      // eslint-disable-next-line no-console
      'Hello Button': button((get) => console.log('hello', get('folder.subfolder.deep nested.pos2d'))),
      'deep nested': folder(
        {
          pos2d: { value: { x: 3, y: 4 }, lock: true },
          pos2dArr: [100, 200],
          pos3d: {
            value: {
              x: 0.3,
              y: 0.1,
              z: 0.5,
            },
            label: <DimensionsIcon />,
          },
          pos3dArr: [Math.PI / 2, 20, 4],
        },
        { color: 'red' }
      ),
    },
    { order: -1 }
  )
  return <pre>{JSON.stringify(data, null, '  ')}</pre>
}

function Controls() {
  const data = useControls({
    vector2D: [10, 10],
    vector3D: [10, 10, 10],
    dimension: '4px',
    string: { value: 'something', optional: true, order: -2 },
    range: { value: 0, min: -10, max: 10, order: -3 },
    image: { image: undefined },
    select: { options: ['x', 'y', ['x', 'y']] },
    interval: { min: -100, max: 100, value: [-10, 10] },
    color: '#ffffff',
    refMonitor: monitor(frame, { graph: true, interval: 30 }),
    number: { value: 1000, min: 3 },
    disabled: {
      value: 'A disabled input',
      disabled: true,
      hint: 'This input is disabled',
    },
    colorObj: { value: { r: 1, g: 2, b: 3 }, render: (get) => get('folder.boolean') },
    folder: folder(
      {
        noJoy: { value: [1, 2], joystick: false },
        boolean: true,
        spring: { tension: 100, friction: 30 },
      },
      { color: 'yellow', order: -1 }
    ),
  })
  return <pre>{JSON.stringify(data, null, '  ')}</pre>
}

export default function App() {
  const [count, setCount] = React.useState(0)
  const [show, setShow] = React.useState(true)

  const [{ showTitleBar, title, drag, filter, fullScreen, oneLineLabels }, set] = useControls(
    'Panel',
    () => ({
      showTitleBar: true,
      fullScreen: false,
      drag: { value: true, render: (get) => get('Panel.showTitleBar') },
      title: { value: 'Leva', render: (get) => get('Panel.showTitleBar') },
      filter: { value: true, render: (get) => get('Panel.showTitleBar') },
      oneLineLabels: false,
    }),
    { color: 'royalblue' }
  )

  useFullscreen({ current: document.documentElement }, fullScreen, {
    onClose: () => set({ fullScreen: false }),
  })

  return (
    <>
      <Leva titleBar={showTitleBar && { drag, title, filter }} oneLineLabels={oneLineLabels} />
      <div className={styles.buttons}>
        Reference count: {count}
        <button onClick={() => setCount((c) => Math.max(0, c - 1))}>-</button>
        <button onClick={() => setCount((c) => c + 1)}>+</button>
        <button onClick={() => setShow((s) => !s)}>Toggle Main Controls</button>
      </div>
      {show && <Controls />}
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <ExtraControls key={i} />
        ))}
    </>
  )
}
