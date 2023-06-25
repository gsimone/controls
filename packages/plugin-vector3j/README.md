## Leva Bezier

### Installation

```bash
npm i @leva-ui/plugin-vector3j
```

### Quick start

```jsx
import { useControls } from 'leva'
import { vector3j } from '@leva-ui/plugin-vector3j'

function MyComponent() {
  const { Vector3j } = useControls({ Vector3j: vector3j([10, 10, 10]) })
  // or
  const { Vector3j } = useControls({ Vector3j: vector3j({ x: 10, y: 10, z: 10 }) })
}
```
