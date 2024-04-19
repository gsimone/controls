# Input Types

`leva` will check the input settings and provide the best possible component.

### Number

A single numerical input.

```jsx
const { myNumber } = useControls({
  myNumber: 4,
})
```

- Increase / decrease numbers with arrow keys, with alt (±0.1) and shift (±10) modifiers support.
- Change the value by either dragging over the input label or the inner label.
- Automatically filters the input to be a numerical value
- Automatically calculates the number input step based on the initial value magnitude and significant digits.

### Range

A Number input with an additional range slider. It will be used when you provide a `min` and `max` value.

```jsx
const { myNumber } = useControls({
  myNumber: {
    value: 4,
    min: 0,
    max: 10,
    step: 1,
  },
})
```

All rules from Number type also apply.

### Color

A color picker. Color format is inferred by the object used:

```jsx
const colors = useControls({
  myFooColor: '#fff',
  myBarColor: { r: 200, b: 125, g: 106, a: 0.4 },
})
```

In the example, `myFooColor` will create an Hexadecimal field while `myBarColor` will expose return 4 values in separate r, g, b and a numerical fields.

### Boolean

A simple toggle.

```jsx
const { toggle } = useControls({ toggle: true })
```

### Interval

An array containing two numerical values.
Will be used when `value` is an array of 2 numbers and `min` and `max` are specified.

```jsx
const { myInterval } = useControls({
  myInterval: {
    min: 0,
    max: 10,
    // initial value of 4, 5
    value: [4, 5],
  },
})
```

All rules from Number type also apply.

### Select

A dropdown select input with a specified list of elements. An optional default value can be provided.

```jsx
const presetColor = useControls({
  options: ['red', 'green', 'blue', 'yellow'],
  value: 'red'
})
```

### Image

@todo

### Vector2

Compound input of two numerical values without `min` and `max` bounds.
Will be used when value is an object with `x` and `y` properties or an array of
two numbers.

```jsx
const { position } = useControls({
  position: { x: 0, y: 0 },
  boxSize: [10, 20],
})
```

The joystick can be hidden with `joystick: false` and inverted with `"invertY"`.

```jsx
const { position } = useControls({
  position: {
    value: { x: 0, y: 0 },
    joystick: 'invertY',
  },
  boxSize: {
    value: [10, 20],
    joystick: false,
  },
})
```

The `step` setting can be used to change joystick's resistance.

```jsx
const { position } = useControls({
  position: {
    value: { x: 0, y: 0 },
    step: 0.1,
  },
})
```

You can also use your keyboard to control the step.
Pressing the shift key while dragging increases the step. Pressing alt decreases the step.

You can set options separately for each coordinate by nesting them under coordinate's key.

```jsx
useControls({
  vec2: {
    value: {
      x: 0,
      y: 0,
    },
    x: {
      step: 0.1,
    },
    y: {
      step: 1,
    },
  },
})
```

### Vector3

Very similar to Vector2 but now with the z axis.

```jsx
useControls({
  vec3: {
    x: 0,
    y: 2,
    z: 1.5,
  },
  anotherVec3: [3, 1, 1],
})
```

One difference with Vector2 to keep in mind is that you don't have the `joystick` option.
