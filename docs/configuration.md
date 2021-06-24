## Configuration

You can configure Leva by using the `<Leva>` component anywhere in your App:

```jsx
import { Leva } from 'leva'

export default function MyApp() {
  return (
    <>
      <Leva
        theme={myTheme} // you can pass a custom theme (see the styling section)
        fill // default = false,  true makes the pane fill the parent dom node it's rendered in
        flat // default = false,  true removes border radius and shadow
        oneLineLabels // default = false, alternative layout for labels, with labels and fields on separate rows
        hideTitleBar // default = false, hides the GUI header
        collapsed // default = false, when true the GUI is collpased
        hidden // default = false, when true the GUI is hidden
      />
    </>
  )
}
```

- TODO // Add default config for LevaPanel as well
